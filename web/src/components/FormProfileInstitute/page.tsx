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

export default function FormProfileInstitute({ data }: { data: any }) {
  const router = useRouter()

  const [valueName, setValueName] = useState(data.institute_name);
  const [valueEmail, setValueEmail] = useState(data.institute_email);
  const [valueCpf, setValueCpf] = useState(data.institute_doc);
  const [valuePass, setValuePass] = useState("");
  const [valueAddress, setValueAddress] = useState(data.institute_address);
  const [ufs, setUfs] = useState<IBGEUFResponse[]>([]);
  const [cities, setCities] = useState<IBGECITYResponse[]>([]);
  const [selectedUf, setSelectedUf] = useState(data.institute_uf);
  const [selectedCity, setSelectedCity] = useState(data.institute_city);
  const [isChanged, setChanged] = useState(false);
  const [isCnpj, setIsCnpj] = useState(false);

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
    setValue('name', data.institute_name);
    setValue('email', data.institute_email);
    setValue('cpf', data.institute_doc);
    setValue('address', data.institute_address);
    setValue('uf', data.institute_uf);
    setValue('city', data.institute_city);
    setValue('attributes', data.institute_attributes);

    const cpfNumbers = data.institute_doc.replace(/\D/g, "");

    if (cpfNumbers.length > 11) {
      setIsCnpj(true);
    } else {
      setIsCnpj(false);
    }
  }, [])

  const checkEmailExists = async (email: string) => {
    try {
      if (email != data.institute_email) {
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
      url: 'http://localhost:3333/sendforminstitute/edit/',
      data: {
        id: data.institute_id,
        name: valueName,
        email: valueEmail,
        doc: valueCpf,
        password: valuePass,
        uf: selectedUf,
        city: selectedCity,
        address: valueAddress,
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

    const cpfNumbers = cpf.replace(/\D/g, "");

    if (cpfNumbers.length > 11) {
      setIsCnpj(true);
    } else {
      setIsCnpj(false);
    }

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

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;
    setSelectedUf(uf);
    setValue('uf', uf);

    if (uf !== data.user_uf) {
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
      url: 'http://localhost:3333/sendforminstitute/delete/',
      data: {
        id: data.institute_id,
      }
    }).then((response) => {
      if (response.data.success) {
        setCookie('authorization', '');
        const parameterValue = 'deleted';
        router.push(`/login?status=${parameterValue}`);
      }
    })
  }

  const [inputValues, setInputValues] = useState<{ [key: string]: string }>(JSON.parse(data.institute_attributes));

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
      <h1 className='text-center mb-4'>Seu perfil de instituição</h1>
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
