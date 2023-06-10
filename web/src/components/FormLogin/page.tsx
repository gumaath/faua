'use client'

import Link from 'next/link';
import FormInput from '../FormInput/page';
import Button from '../Button/page';
import Image from 'next/image';
import GoogleIcon from '../../../public/icon_google.svg';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation'
import { setCookie } from 'cookies-next';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export default function FormLogin() {

  const router = useRouter()

  const [valueEmail, setValueEmail] = useState("");
  const [valuePass, setValuePass] = useState("");

  function handleEmail(event: ChangeEvent<HTMLSelectElement>) {
    const email = event.target.value;
    setValueEmail(email);
    setValue('email', email)
  }

  function handlePassword(event: ChangeEvent<HTMLSelectElement>) {
    const pass = event.target.value;
    setValuePass(pass);
    setValue('password', pass)
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('E-mail inválido')
      .required('E-mail obrigatório'),
    password: Yup.string()
      .required('Senha é obrigatória')
      .min(8, 'Sua senha deve ter pelo menos 8 caracteres'),
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
      url: 'http://localhost:3333/login/',
      data: {
        email: valueEmail,
        password: valuePass,
      }
    }).then((response) => {
      if (response.data.status == "success") {
        setCookie('authorization', response.data.token)
        router.push('/main')
      } else {
        toast("❌ E-mail e/ou senha incorreto(s)!", {
          theme: "colored",
        });
      }
    })
  };

  return (
    <div className='flex justify-center items-center'>
      <ToastContainer />
      <div className='bg-white rounded p-6 m-6 text-black'>
        <h2 className='text-center mb-2'>Faça login</h2>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-10'>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={() => (
                <FormInput
                  value={valueEmail}
                  onChange={handleEmail}
                  error={errors.email?.message}
                  type="text"
                  label="E-mail"
                  id="email" />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={() => (
                <FormInput
                  value={valuePass}
                  onChange={handlePassword}
                  error={errors.password?.message}
                  type="password"
                  label="Senha"
                  id="senha" />
              )}
            />
          </div>
          <div className='flex justify-center mb-4'>
            <Button title="Entrar" />
          </div>
          <div className='flex justify-center flex-col items-center mb-4'>
            <p className='text-sm text-zinc-400'>Ou, entrar com:</p>
            <Image src={GoogleIcon} width={40} alt='Imagem do Google' />
          </div>
          <div className='flex justify-center flex-col items-center'>
            <p className='text-sm text-zinc-400'>Ainda não possui conta?</p>
            <Link className='text-sm text-yellow-500 underline' href="/register/user">Clique aqui para se cadastrar</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
