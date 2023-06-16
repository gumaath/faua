'use client'

import React, { useEffect, useState } from "react";
import Header from "@/components/Header/page";
import Footer from "@/components/Footer/page";
import axios from "axios";
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'
import CardLister from "@/components/CardLister/page";
import CardListerVolunteer from "@/components/CardListerVolunteer/page";

export default function Main() {
  const router = useRouter()

  const [userData, setUserData] = useState<{ email: string } | null>(null);
  const [isFetched, setIsFetched] = useState(false); 
  const token = getCookie('authorization');

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:3333/verify/',
      headers: {'authorization': token},
    })
      .then((response) => {              
        if (response.data.status == '1') {
          setIsFetched(true);
          setUserData(response.data);
        } else {
          router.push('/login')
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div className="min-h-screen select-text">
        <Header />
        <div>{userData !== null && isFetched ? <CardListerVolunteer/> : "Loading..."}</div>
      </div>
      <Footer />
    </div>
  );
}




