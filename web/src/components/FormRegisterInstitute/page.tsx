'use client'

import FormInput from "../FormInput/page";
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

export default function FormRegisterInstitute() {
  const router = useRouter()
  
  const [valueName, setValueName] = useState("");
  const [valueDesc, setValueDesc] = useState("");
  const [valueEmail, setValueEmail] = useState("");
  const [valueCpf, setValueCpf] = useState("");
  const [valuePass, setValuePass] = useState("");
  const [valueAddress, setValueAddress] = useState("");
  const [ufs, setUfs] = useState<IBGEUFResponse[]>([]);
  const [cities, setCities] = useState<IBGECITYResponse[]>([]);
  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");
  const [isCnpj, setIsCnpj] = useState(false);
  const [segments, setSegments] = useState([]);
  const [valueSegment, setSegment] = useState("");

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
    axios
      .get("http://localhost:3333/institutes/segments")
      .then((response) => {
        const data = response.data;
        const segments = data.map(({ segment_id, segment_name }: { segment_id: number; segment_name: string }) => ({
          sigla: segment_id,
          nome: segment_name,
        }));
        setSegments(segments);
      });
  }, []);


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
    desc: Yup.string()
      .required('Descrição obrigatória')
      .min(8, 'Sua descrição deve ser maior'),
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
    attributes: Yup.object().test('at-least-one', 'Selecione pelo menos um atributo', (obj) => {
      return Object.values(obj).some((value) => Boolean(value));
    }),
    segment: Yup.string().required('Segmento obrigatório').notOneOf(['0'], 'Segmento obrigatório'),
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
      url: 'http://localhost:3333/sendforminstitute/',
      data: {
        name: valueName,
        email: valueEmail,
        cpf: valueCpf,
        password: valuePass,
        desc: valueDesc,
        segment: parseInt(valueSegment),
        uf: selectedUf,
        city: selectedCity,
        address: valueAddress,
        attributes: inputValues,
      }
    }).then((response) => {
      const parameterValue = 'success';
      router.push(`/login?status=${parameterValue}`);
    })
  };

  function handleName(event: ChangeEvent<HTMLSelectElement>) {
    const name = event.target.value;
    setValueName(name);
    setValue('name', name);
  }

  function handleDesc(event: ChangeEvent<HTMLSelectElement>) {
    const desc = event.target.value;
    setValueDesc(desc);
    setValue('desc', desc);
  }

  function handleEmail(event: ChangeEvent<HTMLSelectElement>) {
    const email = event.target.value;
    setValueEmail(email);
    setValue('email', email);
  }

  function handlePassword(event: ChangeEvent<HTMLSelectElement>) {
    const pass = event.target.value;
    setValuePass(pass);
    setValue('password', pass);
  }

  function handleCpf(event: ChangeEvent<HTMLSelectElement>) {
    const cpf = event.target.value;
    setValueCpf(cpf);
    setValue('cpf', cpf);

    const cpfNumbers = cpf.replace(/\D/g, "");

    if (cpfNumbers.length > 11) {
      setIsCnpj(true);
    } else {
      setIsCnpj(false);
    }
  }

  function handleAddress(event: ChangeEvent<HTMLSelectElement>) {
    const address = event.target.value;
    setValueAddress(address);
    setValue('address', address);
  }

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;
    setSelectedUf(uf);
    setValue('uf', uf);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setSelectedCity(city);
    setValue('city', city);
  }

  function handleSegment(event: ChangeEvent<HTMLSelectElement>) {
    const segment = event.target.value;
    setSegment(segment);
    setValue('segment', segment);
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
    <div className='justify-center items-center mt-[15%] bg-white rounded p-6 m-6 text-black'>
      <h1 className='text-center mb-4'>Crie sua conta</h1>
      <form method='post' noValidate onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-4'>
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
                label={'Nome da instituição'}
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
                mask={isCnpj ? "99.999.999/9999-99" : "999.999.999-99?"}
                formatChars={{ "9": "[0-9]", "t": "[0-9\-]", "?": "[0-9 ]" }}
                maskChar={null}
                onChange={handleCpf}
                error={errors.cpf?.message}
                label={'CPF/CNPJ'}
                id={'cpf'}
                placeholder='Ex: 123.456.789-10' />
            )}
          />
          <Controller
            name="desc"
            control={control}
            defaultValue=""
            render={() => (
              <FormInput
                type={'text'}
                value={valueDesc}
                onChange={handleDesc}
                error={errors.desc?.message}
                label={'Descrição da instituição'}
                id={'desc'}
                placeholder='Descreva a instituição'
              />
            )}
          />
          <Controller
            name="segment"
            control={control}
            defaultValue=""
            render={() => (
              <FormSelect
                value={valueSegment}
                onChange={handleSegment}
                error={errors.segment?.message}
                label={'Segmento'}
                id={'segment'}
                options={segments} />
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
                label={'Endereço da instituição'}
                value={valueAddress}
                onChange={handleAddress}
                error={errors.address?.message}
                id={'address'}
                placeholder='R. Flor das Rosas, 123' />
            )}
          />

        </div>
        <div>
          <Controller
            name="attributes"
            control={control}
            defaultValue=""
            render={() => (
              <AttributesLister error={errors.attributes?.message} onChange={handleChangeAttributes} checkeds={inputValues} type='institutes' />
            )}
          />
        </div>
        <div></div>
        <div className='flex justify-end'><Button title={'Cadastrar'} /></div>
      </form>
    </div>
  )
}