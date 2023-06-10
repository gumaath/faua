'use client'

import React, { useEffect, useState } from "react";
import Header from "@/components/Header/page";
import Footer from "@/components/Footer/page";
import axios from "axios";
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'
import FormProfile from "@/components/FormProfile/page";

export default function Main() {
  const router = useRouter()

  const [userData, setUserData] = useState<{ email: string } | null>(null);
  const [userFetch, setUserFetch] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
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
        } else {
          router.push('/login')
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (userData?.email) {
      axios.post(
        'http://localhost:3333/users/getuser/', userData?.email, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response) {
            setUserFetch(response.data);
            setIsFetched(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userData]);

  return (
    <div>
      <div className="min-h-screen select-text">
        <Header />
        {isFetched && <FormProfile data={userFetch} />}
      </div>
      <Footer />
    </div>
  );
}




