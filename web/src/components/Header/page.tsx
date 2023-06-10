'use client'

import Image from 'next/image';
import logoMinimalWhite from '../../../public/logo-minimal-white.svg';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'
import DropDownMenuUser from '../DropDownMenuUser/page';



export default function Header() {
  const router = useRouter()

  const [userData, setUserData] = useState<{ email: string } | null>(null);
  const token = getCookie('authorization');

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:3333/verify/',
      headers: { 'authorization': token },
    })
      .then((response) => {
        if (response.data.status == '1') {
          setUserData(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <header className="bg-yellow-500 w-full flex items-center justify-between min-h-[64px] px-3">
      <div>
        <Link href={userData !== null ? '/main' : "/"}><Image src={logoMinimalWhite} width={100} height={40} alt='Logo FAUA' /></Link>
      </div>
      <div className='flex items-center gap-4'>
        <Icon icon="eva:question-mark-circle-outline" width={28} />
        {userData !== null ?
        <div>
          <DropDownMenuUser/>
          </div>
          :
          <Link href="/login"><Icon icon="gg:profile" width={32} /></Link>}
      </div>
    </header>
  )
}
