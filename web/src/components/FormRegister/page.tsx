'use client'

import FormInput from '../FormInput/page';
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import FormSelect from '../FormSelect/page';
import AttributesLister from '../AttributesLister/page';
import Button from '../Button/page';
import * as Yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation'

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
  const router = useRouter()

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

  const checkEmailExists = async (email: string) => {
    try {
      const response = await axios.post('http://localhost:3333/users/checkemail/', { email });
      return response.data;
    } catch (error) {
      throw new Error('Failed to check email existence');
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nome obrigatório'),
    email: Yup.string()
      .email('E-mail inválido')
      .required('E-mail obrigatório')
      .test('email-async-validation', 'O email já está cadastrado', async function (value) {
        try {
          const isEmailExists = await checkEmailExists(value);
          if (isEmailExists) {
            return false; // Email already exists, validation fails
          }
          return true; // Email doesn't exist, validation passes
        } catch (error) {
          return true; // Proceed with validation if there's an error in checking email existence
        }
      }),
    cpf: Yup.string().required('CPF obrigatório'),
    password: Yup.string()
      .required('Senha é obrigatória')
      .min(8, 'Sua senha deve ter pelo menos 8 caracteres')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Sua senha deve conter uma letra maiuscula, uma letra minuscula, um número, and e um caracter especial'
      ),
    uf: Yup.string().required('Estado obrigatório').notOneOf(['0'], 'Estado obrigatório'),
    city: Yup.string().required('Cidade obrigatório').notOneOf(['0'], 'Cidade obrigatório'),
    address: Yup.string()
      .required('Endereço obrigatório')
      .min(8, 'Seu endereço deve ser maior'),
    birthdate: Yup.string().required('Data de nascimento obrigatório'),
    typeblood: Yup.string().required('Tipo sanguíneo obrigatório').notOneOf(['0'], 'Tipo sanguíneo obrigatório'),
    biogender: Yup.string().required('Sexo biológico obrigatório').notOneOf(['0'], 'Sexo biológico obrigatório'),
    gender: Yup.string().required('Sexo obrigatório').notOneOf(['0'], 'Sexo obrigatório'),
    attributes: Yup.object().test('at-least-one', 'Selecione pelo menos um atributo', (obj) => {      
      return Object.values(obj).some((value) => Boolean(value));
    }),
  });

  const { register, handleSubmit, control, formState, setValue } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { errors } = formState;

  const onSubmit: SubmitHandler<any> = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {

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
      const parameterValue = 'success';
      router.push(`/login?status=${parameterValue}`);
    })
  };

  function handleName(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.value;
    setValueName(name);
    setValue('name', name);
  }

  function handleEmail(event: ChangeEvent<HTMLInputElement>) {
    const email = event.target.value;
    setValueEmail(email);
    setValue('email', email);
  }

  function handlePassword(event: ChangeEvent<HTMLInputElement>) {
    const pass = event.target.value;
    setValuePass(pass);
    setValue('password', pass);
  }

  function handleCpf(event: ChangeEvent<HTMLInputElement>) {
    const cpf = event.target.value;
    setValueCpf(cpf);
    setValue('cpf', cpf);
  }

  function handleAddress(event: ChangeEvent<HTMLInputElement>) {
    const address = event.target.value;
    setValueAddress(address);
    setValue('address', address);
  }

  function handleBirth(event: ChangeEvent<HTMLInputElement>) {
    const birth = event.target.value;
    setValueBirth(birth);
    setValue('birthdate', birth);
  }

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;
    setSelectedUf(uf);
    setValue('uf', uf);
  }

  function handleSelectTypeBlood(event: ChangeEvent<HTMLSelectElement>) {
    const typeblood = event.target.value;
    setSelectedTypeBlood(typeblood);
    setValue('typeblood', typeblood);
  }

  function handleSelectBioGender(event: ChangeEvent<HTMLSelectElement>) {
    const biogender = event.target.value;
    setSelectedBioGender(biogender);
    setValue('biogender', biogender);
  }

  function handleSelectGender(event: ChangeEvent<HTMLSelectElement>) {
    const gender = event.target.value;
    setSelectedGender(gender);
    setValue('gender', gender);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setSelectedCity(city);
    setValue('city', city);
  }

  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setValue('attributes', inputValues);
  }, [inputValues]);

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

  return (
    <div className='justify-center items-center bg-white rounded p-6 m-6 text-black'>
      <h1 className='text-center mb-4'>Crie sua conta</h1>
      <form method='post' noValidate onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-3 gap-4'>
        <div>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={() => (
              <FormInput
                type={'text'}
                value={valueName}
                onChange={handleName}
                error={errors.name?.message}
                label={'Nome completo'}
                id={'name'}
                placeholder='Ex: João da Silva'
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={() => (
              <FormInput
                type={'email'}
                value={valueEmail}
                onChange={handleEmail}
                error={errors.email?.message}
                label={'Endereço de e-mail'}
                id={'email'}
                placeholder='Ex: seufulano@email.com' />
            )}
          />
          <Controller
            name="cpf"
            control={control}
            defaultValue=""
            render={() => (
              <FormInput
                type={'text'}
                value={valueCpf}
                mask={'999.999.999-99'}
                onChange={handleCpf}
                error={errors.cpf?.message}
                label={'CPF'}
                id={'cpf'}
                placeholder='Ex: 123.456.789-10' />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={() => (
              <FormInput type={'password'}
                value={valuePass}
                onChange={handlePassword}
                error={errors.password?.message}
                label={'Senha'}
                id={'password'}
                placeholder='Senha' />
            )}
          />
          <div className='flex w-full gap-2'>
            <Controller
              name="uf"
              control={control}
              defaultValue=""
              render={() => (
                <FormSelect
                  value={selectedUf}
                  onChange={handleSelectUf}
                  error={errors.uf?.message}
                  label={'Estado'}
                  id={'uf'}
                  width={true}
                  options={ufs} />
              )}
            />
            <Controller
              name="city"
              control={control}
              defaultValue=""
              render={() => (
                <FormSelect
                  value={selectedCity}
                  onChange={handleSelectCity}
                  error={errors.city?.message}
                  label={'Cidade'}
                  id={'city'}
                  width={true}
                  options={cities} />
              )}
            />
          </div>
          <Controller
            name="address"
            control={control}
            defaultValue=""
            render={() => (
              <FormInput type={'text'}
                label={'Endereço residencial'}
                value={valueAddress}
                onChange={handleAddress}
                error={errors.address?.message}
                id={'address'}
                placeholder='R. Flor das Rosas, 123' />
            )}
          />

        </div>
        <div>
          <div className='flex w-full gap-2'>
            <Controller
              name="birthdate"
              control={control}
              defaultValue=""
              render={() => (
                <FormInput
                  type={'date'}
                  value={valueBirth}
                  onChange={handleBirth}
                  error={errors.birthdate?.message}
                  label={'Data de Nascimento'}
                  id={'datebirth'}
                  width={true} />
              )}
            />
            <Controller
              name="typeblood"
              control={control}
              defaultValue=""
              render={() => (
                <FormSelect
                  value={selectedTypeblood}
                  onChange={handleSelectTypeBlood}
                  label={'Tipo sanguíneo'}
                  error={errors.typeblood?.message}
                  id={'typeblood'}
                  width={true}
                  options={typebloods} />
              )}
            />
          </div>
          <div className='flex w-full gap-2'>
            <Controller
              name="biogender"
              control={control}
              defaultValue=""
              render={() => (
                <FormSelect
                  value={selectedBioGender}
                  onChange={handleSelectBioGender}
                  error={errors.biogender?.message}
                  label={'Gênero biológico'}
                  id={'biogender'}
                  width={true}
                  options={biogenders} />
              )}
            />
            <Controller
              name="gender"
              control={control}
              defaultValue=""
              render={() => (
                <FormSelect
                  value={selectedGender}
                  onChange={handleSelectGender}
                  error={errors.gender?.message}
                  label={'Gênero'}
                  id={'gender'}
                  width={true}
                  options={genders} />
              )}
            />
          </div>
        </div>
        <div>
        <Controller
              name="attributes"
              control={control}
              defaultValue=""
              render={() => (
                <AttributesLister error={errors.attributes?.message} onChange={handleChangeAttributes} checkeds={inputValues} type='users' />
              )}
            />
        </div>
        <div></div>
        <div></div>
        <div className='flex justify-end'><Button title={'Cadastrar'} /></div>
      </form>
    </div>
  )
}
