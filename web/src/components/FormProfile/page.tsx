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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonMUI from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { setCookie } from 'cookies-next';



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

export default function FormProfile({ data }: { data: any }) {
  const router = useRouter()

  const [valueName, setValueName] = useState(data.user_name);
  const [valueEmail, setValueEmail] = useState(data.user_email);
  const [valueCpf, setValueCpf] = useState(data.user_cpf);
  const [valuePass, setValuePass] = useState("");
  const [valueAddress, setValueAddress] = useState(data.user_address);
  const [valueBirth, setValueBirth] = useState(new Date(data.user_birth).toISOString().split("T")[0]);
  const [ufs, setUfs] = useState<IBGEUFResponse[]>([]);
  const [cities, setCities] = useState<IBGECITYResponse[]>([]);
  const [typebloods, setTypeBloods] = useState<TypeBlood[]>([]);;
  const [selectedTypeblood, setSelectedTypeBlood] = useState(data.user_typeblood);
  const [biogenders, setBioGenders] = useState<TypeBlood[]>([]);
  const [selectedBioGender, setSelectedBioGender] = useState(data.user_biogender);
  const [genders, setGenders] = useState<TypeBlood[]>([]);
  const [selectedGender, setSelectedGender] = useState(data.user_gender);
  const [selectedUf, setSelectedUf] = useState(data.user_uf);
  const [selectedCity, setSelectedCity] = useState(data.user_city);
  const [isChanged, setChanged] = useState(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#333',
    border: '2px solid #777',
    boxShadow: 24,
    p: 4,
  };

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

    setValue('name', data.user_name);
    setValue('email', data.user_email);
    setValue('cpf', data.user_cpf);
    setValue('address', data.user_address);
    setValue('birthdate', data.user_birth);
    setValue('uf', data.user_uf);
    setValue('typeblood', data.user_typeblood);
    setValue('biogender', data.user_biogender);
    setValue('city', data.user_city);
    setValue('gender', data.user_gender);
    setValue('attributes', data.user_attributes);

  }, [])

  const checkEmailExists = async (email: string) => {
    try {
      if (email != data.user_email) {
        const response = await axios.post('http://localhost:3333/checkemail/', { email });
        return response.data;
      }
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
      .notRequired()
      .test('password', 'Sua senha deve ter 8 caracteres', (value) => {
        if (!value || value.length === 0) {
          return true; // Pass the validation if the field is empty
        }
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(value) && value.length >= 8;
      }),
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

  const { reset, handleSubmit, control, formState, setValue } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { errors } = formState;

  const onSubmit: SubmitHandler<any> = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {

    axios({
      method: 'post',
      url: 'http://localhost:3333/sendformuser/edit/',
      data: {
        id: data.user_id,
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
      if (response.data.passChanged) {
        const parameterValue = 'changed';
        router.push(`/login?status=${parameterValue}`);
      } else {
        toast("✅ Sua alterações foram salvas!", {
          theme: "colored",
        });
        setChanged(false);
      }
    })
  };

  function handleName(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.value;
    setValueName(name);
    setValue('name', name);

    if (name !== data.user_name) {
      setChanged(true);
    }
  }

  function handleEmail(event: ChangeEvent<HTMLInputElement>) {
    const email = event.target.value;
    setValueEmail(email);
    setValue('email', email);

    if (email !== data.user_email) {
      setChanged(true);
    }
  }

  function handlePassword(event: ChangeEvent<HTMLInputElement>) {
    const pass = event.target.value;
    setValuePass(pass);
    setValue('password', pass);
    setChanged(true);
  }

  function handleCpf(event: ChangeEvent<HTMLInputElement>) {
    const cpf = event.target.value;
    setValueCpf(cpf);
    setValue('cpf', cpf);

    if (cpf !== data.user_cpf) {
      setChanged(true);
    }
  }

  function handleAddress(event: ChangeEvent<HTMLInputElement>) {
    const address = event.target.value;
    setValueAddress(address);
    setValue('address', address);

    if (address !== data.user_address) {
      setChanged(true);
    }
  }

  function handleBirth(event: ChangeEvent<HTMLInputElement>) {
    const birth = event.target.value;
    setValueBirth(birth);
    setValue('birthdate', birth);

    if (birth !== data.user_birth) {
      setChanged(true);
    }
  }

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;
    setSelectedUf(uf);
    setValue('uf', uf);

    if (uf !== data.user_uf) {
      setChanged(true);
    }
  }

  function handleSelectTypeBlood(event: ChangeEvent<HTMLSelectElement>) {
    const typeblood = event.target.value;
    setSelectedTypeBlood(typeblood);
    setValue('typeblood', typeblood);

    if (typeblood !== data.user_typeblood) {
      setChanged(true);
    }
  }

  function handleSelectBioGender(event: ChangeEvent<HTMLSelectElement>) {
    const biogender = event.target.value;
    setSelectedBioGender(biogender);
    setValue('biogender', biogender);

    if (biogender !== data.user_biogender) {
      setChanged(true);
    }
  }

  function handleSelectGender(event: ChangeEvent<HTMLSelectElement>) {
    const gender = event.target.value;
    setSelectedGender(gender);
    setValue('gender', gender);

    if (gender !== data.user_gender) {
      setChanged(true);
    }
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setSelectedCity(city);
    setValue('city', city);

    if (city !== data.user_city) {
      setChanged(true);
    }
  }

  function handleDelete() {
    axios({
      method: 'post',
      url: 'http://localhost:3333/sendformuser/delete/',
      data: {
        id: data.user_id,
      }
    }).then((response) => {
      if (response.data.success) {
        setCookie('authorization', '');
        const parameterValue = 'deleted';
        router.push(`/login?status=${parameterValue}`);
      }
    })
  }

  const [inputValues, setInputValues] = useState<{ [key: string]: string }>(JSON.parse(data.user_attributes));

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
      setChanged(true);
    } else {
      setInputValues((prevState) => {
        const updatedState = { ...prevState };
        delete updatedState[id];
        return updatedState;
      });
      setChanged(true);
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='bg-white rounded p-6 m-6 text-black'>
      <ToastContainer />
      <h1 className='text-center mb-4'>Seu perfil</h1>
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
        <div className='flex justify-end gap-3'>
          <ButtonMUI onClick={handleOpen} variant="outlined" color="error">
            Deletar minha conta
          </ButtonMUI>
          <Button title={'Salvar alterações'} disabled={!isChanged && true} />
        </div>
      </form>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Deseja mesmo deletar sua conta?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Essa ação não pode ser desfeita
          </Typography>
          <ButtonMUI onClick={handleDelete} color="error">
            Deletar minha conta
          </ButtonMUI>
          <ButtonMUI onClick={handleClose}>
            Cancelar
          </ButtonMUI>
        </Box>
      </Modal>
    </div>
  )
}
