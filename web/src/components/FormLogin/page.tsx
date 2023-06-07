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

export default function FormLogin() {

  const router = useRouter()

  const [valueEmail, setValueEmail] = useState("");
  const [valuePass, setValuePass] = useState("");

  function handleEmail(event: ChangeEvent<HTMLSelectElement>) {
    const email = event.target.value;
    setValueEmail(email);
  }

  function handlePassword(event: ChangeEvent<HTMLSelectElement>) {
    const pass = event.target.value;
    setValuePass(pass);
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

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
      }      
    })
  };

  return (
    <div className='flex justify-center items-center mt-[15%]'>
      <div className='bg-white rounded p-6 m-6 text-black'>
        <h2 className='text-center mb-2'>Faça login</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className='mb-10'>
            <FormInput value={valueEmail} onChange={handleEmail} type="text" label="E-mail" name="email" id="email" />
            <FormInput value={valuePass} onChange={handlePassword} type="password" label="Senha" name="senha" id="senha" />
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
