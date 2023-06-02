'use client'

import Image from 'next/image';
import logoMinimalWhite from '../../../public/logo-minimal-white.svg';
import { Icon } from '@iconify/react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-yellow-500 w-full flex items-center justify-between min-h-[64px] px-3">
      <div>
        <Link href='/'><Image src={logoMinimalWhite} width={100} height={40} alt='Logo FAUA'/></Link>
      </div>
      <div className='flex items-center gap-4'>
        <Icon icon="eva:question-mark-circle-outline" width={28}/>
        <Link href='/login'><Icon icon="gg:profile" width={32}/></Link>
      </div>
    </header>
  )
}
