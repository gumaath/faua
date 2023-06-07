'use client'

import FormInput from '../FormInput/page';
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import FormSelect from '../FormSelect/page';
import AttributesLister from '../AttributesLister/page';
import Button from '../Button/page';

type IBGEUFResponse = {
  sigla: string;
  nome: string;
};
type IBGECITYResponse = {
  id: number;
  nome: string;
};
type TypeBlood = {
  sigla: string;
  nome: string;
};

export default function FormRegister() {
  const [valueName, setValueName] = useState("");
  const [valueEmail, setValueEmail] = useState("");
  const [valueCpf, setValueCpf] = useState("");
  const [valuePass, setValuePass] = useState("");
  const [valueAddress, setValueAddress] = useState("");
  const [valueBirth, setValueBirth] = useState("");
  const [ufs, setUfs] = useState<IBGEUFResponse[]>([]);
  const [cities, setCities] = useState<IBGECITYResponse[]>([]);
  const [typebloods, setTypeBloods] = useState<TypeBlood[]>([]);;
  const [selectedTypeblood, setSelectedTypeBlood] = useState("0");
  const [biogenders, setBioGenders] = useState<TypeBlood[]>([]);
  const [selectedBioGender, setSelectedBioGender] = useState("0");
  const [genders, setGenders] = useState<TypeBlood[]>([]);
  const [selectedGender, setSelectedGender] = useState("0");
  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");
  useEffect(() => {
    if (selectedUf === "0") {
      return;
    }
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        setCities(response.data);
      });
  }, [selectedUf]);

  useEffect(() => {
    axios
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/")
      .then((response) => {
        setUfs(response.data);
      });
  }, []);

  useEffect(() => {
    const typeBloods = [
      { sigla: 'O-', nome: 'O-' },
      { sigla: 'O+', nome: 'O+' },
      { sigla: 'A-', nome: 'A-' },
      { sigla: 'A+', nome: 'A+' },
      { sigla: 'B-', nome: 'B-' },
      { sigla: 'B+', nome: 'B+' },
      { sigla: 'AB+', nome: 'AB+' },
      { sigla: 'AB-', nome: 'AB-' },
    ]

    setTypeBloods(typeBloods);

    const genders = [
      { sigla: 'FEMALE', nome: 'Feminino' },
      { sigla: 'MALE', nome: 'Masculino' },
      { sigla: 'UNDEFINED', nome: 'Prefiro não dizer' },
    ]

    setGenders(genders);

    const biogenders = [
      { sigla: 'FEMALE', nome: 'Feminino' },
      { sigla: 'MALE', nome: 'Masculino' },
    ]

    setBioGenders(biogenders);
  }, [])

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    
    axios({
      method: 'post',
      url: 'http://localhost:3333/sendformuser/',
      data: {
        name: valueName,
        email: valueEmail,
        cpf: valueCpf,
        password: valuePass,
        uf: selectedUf,
        city: selectedCity,
        address: valueAddress,
        birth: valueBirth,
        typeblood: selectedTypeblood,
        biogender: selectedBioGender,
        gender: selectedGender,
        attributes: inputValues,
      }
    }).then((response) => {
     
    })
  };

  function handleName(event: ChangeEvent<HTMLSelectElement>) {
    const name = event.target.value;
    setValueName(name);
  }

  function handleEmail(event: ChangeEvent<HTMLSelectElement>) {
    const email = event.target.value;
    setValueEmail(email);
  }

  function handlePassword(event: ChangeEvent<HTMLSelectElement>) {
    const pass = event.target.value;
    setValuePass(pass);
  }

  function handleCpf(event: ChangeEvent<HTMLSelectElement>) {
    const cpf = event.target.value;
    setValueCpf(cpf);
  }

  function handleAddress(event: ChangeEvent<HTMLSelectElement>) {
    const address = event.target.value;
    setValueAddress(address);
  }

  function handleBirth(event: ChangeEvent<HTMLSelectElement>) {
    const birth = event.target.value;
    setValueBirth(birth);
  }

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;
    setSelectedUf(uf);
  }

  function handleSelectTypeBlood(event: ChangeEvent<HTMLSelectElement>) {
    const typeblood = event.target.value;
    setSelectedTypeBlood(typeblood);
  }

  function handleSelectBioGender(event: ChangeEvent<HTMLSelectElement>) {
    const biogender = event.target.value;
    setSelectedBioGender(biogender);
  }

  function handleSelectGender(event: ChangeEvent<HTMLSelectElement>) {
    const gender = event.target.value;
    setSelectedGender(gender);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setSelectedCity(city);
  }

  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

  const handleChangeAttributes = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value, checked } = event.target;
  
    if (checked) {
      setInputValues((prevState) => ({
        ...prevState,
        [id]: value
      }));
    } else {
      setInputValues((prevState) => {
        const updatedState = { ...prevState };
        delete updatedState[id];
        return updatedState;
      });
    }
  };

  // TODO: Criar validação
  return (
    <div className='justify-center items-center mt-[15%] bg-white rounded p-6 m-6 text-black'>
      <h1 className='text-center mb-4'>Crie sua conta</h1>
      <form method='post' onSubmit={handleSubmit} className='grid grid-cols-3 gap-4'>
        <div>
          <FormInput type={'text'} value={valueName} onChange={handleName} label={'Nome completo'} name={'name'} id={'name'} placeholder='Ex: João da Silva' />
          <FormInput type={'email'} value={valueEmail} onChange={handleEmail} label={'Endereço de e-mail'} name={'email'} id={'email'} placeholder='Ex: seufulano@email.com' />
          <FormInput type={'cpf'} value={valueCpf} onChange={handleCpf} label={'CPF'} name={'cpf'} id={'cpf'} placeholder='Ex: 123.456.789-10' />
          <FormInput type={'password'} value={valuePass} onChange={handlePassword} label={'Senha'} name={'password'} id={'password'} placeholder='Senha' />
          <div className='flex w-full gap-2'>
            <FormSelect value={selectedUf} onChange={handleSelectUf} label={'Estado'} name={'uf'} id={'uf'} width={true} options={ufs} />
            <FormSelect value={selectedCity} onChange={handleSelectCity} label={'Cidade'} name={'city'} id={'city'} width={true} options={cities} />
          </div>
          <FormInput type={'text'} label={'Endereço residencial'} value={valueAddress} onChange={handleAddress} name={'name'} id={'name'} placeholder='R. Flor das Rosas, 123' />
        </div>
        <div>
          <div className='flex w-full gap-2'>
            <FormInput type={'date'} value={valueBirth} onChange={handleBirth} label={'Data de Nascimento'} name={'birthdate'} id={'datebirth'} width={true} />
            <FormSelect value={selectedTypeblood} onChange={handleSelectTypeBlood} label={'Tipo sanguíneo'} name={'typeblood'} id={'typeblood'} width={true} options={typebloods} />
          </div>
          <div className='flex w-full gap-2'>
            <FormSelect value={selectedBioGender} onChange={handleSelectBioGender} label={'Gênero biológico'} name={'biogender'} id={'biogender'} width={true} options={biogenders} />
            <FormSelect value={selectedGender} onChange={handleSelectGender} label={'Gênero'} name={'gender'} id={'gender'} width={true} options={genders} />
          </div>
        </div>
        <div>
          <AttributesLister onChange={handleChangeAttributes} checkeds={inputValues} type='users' />
        </div>
        <div></div>
        <div></div>
        <div className='flex justify-end'><Button title={'Cadastrar'} /></div>
      </form>
    </div>
  )
}
