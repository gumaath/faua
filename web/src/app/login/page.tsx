'use client'

import Header from "@/components/Header/page";
import Footer from "@/components/Footer/page";
import FormLogin from "@/components/FormLogin/page";
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';

import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [searchParams] = useSearchParams();
  if (typeof searchParams !== 'undefined' && searchParams[1] === 'success') {
    toast("Sua conta foi criada!", {
      theme: "colored",
    });
  }
  

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
