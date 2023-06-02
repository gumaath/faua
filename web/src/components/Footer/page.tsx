'use client'

import { Icon } from '@iconify/react';
import Link from 'next/link';


export default function Footer() {
  return (
   <footer className='bg-neutral-900 w-full flex items-center justify-between min-h-[170px] px-3 text-zinc-700 select-none'>
    <div>
      <p>Faça Uma Boa Ação &copy; {new Date().getFullYear()}</p>
    </div>
    <div className='flex gap-6 items-center underline'>
      <Link href="/termos" className='hover:text-zinc-500'>Termos de Uso</Link>
      <Link href="/politica" className='hover:text-zinc-500'>Política de Privacidade</Link>
      <Link href="/contato" className='hover:text-zinc-500'>Contate-nos</Link>
    </div>
    <div className='flex gap-6 items-center'>
      <a href="https://www.twitter.com"><Icon className='hover:text-zinc-500' icon="fa:twitter-square" width={32} /></a>
      <a href="https://www.facebook.com"><Icon className='hover:text-zinc-500' icon="fa:facebook-square" width={32}/></a>
      <a href="https://www.instagram.com"><Icon className='hover:text-zinc-500' icon="fa:instagram" width={34}/></a>
    </div>
   </footer>
  )
}
