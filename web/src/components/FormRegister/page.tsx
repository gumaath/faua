'use client'

import FormInput from '../FormInput/page';
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import FormSelect from '../FormSelect/page';
import AttributesLister from '../AttributesLister/page';

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
  });

  useEffect(() => {
    axios
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/")
      .then((response) => {
        setUfs(response.data);
      });
  }, [selectedUf]);

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

 

  return (
    <div className='justify-center items-center mt-[15%] bg-white rounded p-6 m-6 text-black'>
      <h1 className='text-center mb-4'>Crie sua conta</h1>
      <form action="" className='grid grid-cols-3 gap-4'>
        <div>
          <FormInput type={'text'} label={'Nome completo'} name={'name'} id={'name'} placeholder='Ex: João da Silva' />
          <FormInput type={'email'} label={'Endereço de e-mail'} name={'email'} id={'email'} placeholder='Ex: seufulano@email.com' />
          <FormInput type={'cpf'} label={'CPF'} name={'cpf'} id={'cpf'} placeholder='Ex: 123.456.789-10' />
          <div className='flex w-full gap-2'>
            <FormSelect value={selectedUf} onChange={handleSelectUf} label={'Estado'} name={'uf'} id={'uf'} width={true} options={ufs} />
            <FormSelect value={selectedCity} onChange={handleSelectCity} label={'Cidade'} name={'city'} id={'city'} width={true} options={cities} />
          </div>
          <FormInput type={'text'} label={'Endereço residencial'} name={'name'} id={'name'} placeholder='R. Flor das Rosas, 123' />
        </div>
        <div>
          <div className='flex w-full gap-2'>
            <FormInput type={'date'} label={'Data de Nascimento'} name={'birthdate'} id={'datebirth'} width={true} />
            <FormSelect value={selectedTypeblood} onChange={handleSelectTypeBlood} label={'Tipo sanguíneo'} name={'typeblood'} id={'typeblood'} width={true} options={typebloods} />
          </div>
          <div className='flex w-full gap-2'>
          <FormSelect value={selectedBioGender} onChange={handleSelectBioGender} label={'Gênero biológico'} name={'biogender'} id={'biogender'} width={true} options={biogenders} />
            <FormSelect value={selectedGender} onChange={handleSelectGender} label={'Gênero'} name={'gender'} id={'gender'} width={true} options={genders} />
          </div>
        </div>
        <div>
          <AttributesLister type='users' />
        </div>
      </form>
    </div>
  )
}
