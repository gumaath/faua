'use client'

import React, { useEffect, useState } from "react";
import Header from "@/components/Header/page";
import Footer from "@/components/Footer/page";
import axios from "axios";
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'
import FormProfile from "@/components/FormProfile/page";
import FormProfileInstitute from "@/components/FormProfileInstitute/page";

export default function Main() {
  const router = useRouter()

  const [userData, setUserData] = useState<{ email: string, role: string } | null>(null);
  const [userFetch, setUserFetch] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [role, setRole] = useState('');
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
          setRole(response.data.role)
        } else {
          router.push('/login')
        }
      })
      .catch((error) => {
        console.error(error);
      });      
  }, [token]);

  useEffect(() => {
    if (userData?.email && role == 'USER') {
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
  }, [userData, role]);

  useEffect(() => {
    if (userData?.email && role == 'INSTITUTE') {
      axios.post(
        'http://localhost:3333/institutes/getinstitute/', userData?.email, {
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
  }, [userData, role]);

  return (
    <div>
      <div className="min-h-screen select-text">
        <Header />
        {(isFetched && userData?.role == 'USER' ) && <FormProfile data={userFetch} />}
        {(isFetched && userData?.role == 'INSTITUTE' ) && <FormProfileInstitute data={userFetch} />}
      </div>
      <Footer />
    </div>
  );
}




