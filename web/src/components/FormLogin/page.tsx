import Link from 'next/link';
import FormInput from '../FormInput/page';
import Button from '../Button/page';
import Image from 'next/image';
import GoogleIcon from '../../../public/icon_google.svg';

export default function FormLogin() {
  return (
    <div className='flex justify-center items-center mt-[15%]'>
      <div className='bg-white rounded p-6 m-6 text-black'>
        <h2 className='text-center mb-2'>Faça login</h2>
        <form action="">
          <div className='mb-10'>
            <FormInput type="text" label="E-mail" name="email" id="email" />
            <FormInput type="password" label="Senha" name="senha" id="senha" />
          </div>
          <div className='flex justify-center mb-4'>
            <Button title="Entrar" onClick={'teste'} />
          </div>
          <div className='flex justify-center flex-col items-center mb-4'>
            <p className='text-sm text-zinc-400'>Ou, entrar com:</p>
            <Image src={GoogleIcon} width={40} alt='Imagem do Google' />
          </div>
          <div className='flex justify-center flex-col items-center'>
            <p className='text-sm text-zinc-400'>Ainda não possui conta?</p>
            <Link className='text-sm text-yellow-500 underline' href="/register">Clique aqui para se cadastrar</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
