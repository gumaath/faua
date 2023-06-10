'use client'

import Header from "@/components/Header/page";
import Footer from "@/components/Footer/page";
import FormLogin from "@/components/FormLogin/page";
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';

import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";

export default function Login() {
  const [searchParams] = useSearchParams();
  useEffect(() => {
  if (typeof searchParams !== 'undefined' && searchParams[1] === 'success') {
    toast("✅ Sua conta foi criada com sucesso!", {
      theme: "colored",
    });
  }
  else if (typeof searchParams !== 'undefined' && searchParams[1] === 'changed') {
    toast("✅ Sua senha foi alterada com sucesso, você deve fazer login novamente!", {
      theme: "colored",
    });
  }
  else if (typeof searchParams !== 'undefined' && searchParams[1] === 'deleted') {
    toast("✅ Sua conta foi deletada com sucesso!", {
      theme: "colored",
    });
  }
}, [searchParams])
  

  return (
    <div>
      <ToastContainer />
      <div className="min-h-screen select-text">
        <Header/>
        <FormLogin/>
      </div>
      <Footer/>
    </div>
  );
}
