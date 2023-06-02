"use client";

import Image from "next/image"
import logoFull from '../../../public/logo-full-white.svg'
import Link from "next/link"
import Button from "../Button/page"
import axios from "axios"
import { useEffect, useState } from "react"
import CountUp from "react-countup";
import { motion } from "framer-motion";

export default function MainContent() {
  const [usersCount, setUsersCount] = useState(0);
  const [institutesCount, setinstitutesCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3333/users/count")
      .then((response) => {
        setUsersCount(parseInt(response.data));
      });
  
      axios
      .get("http://localhost:3333/institutes/count")
      .then((response) => {
        setinstitutesCount(parseInt(response.data));
      });
  });
  
  return (
    <div className="flex flex-col justify-center leading-relaxed items-center text-center gap-20">
      <div>
        <Image src={logoFull} alt="Logo FAUA" width={192}/>
      </div>
      <motion.div initial={{ y: 100, opacity: 0 }} animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", duration: 0.8 }} className="font-bold">
        <h2>
          Surgimos como uma solução para quem quer ajudar alguma causa <br/>
          porém não sabe onde procurar. <br/>
          Junte-se agora há mais de <span className="text-purple-400"><CountUp end={usersCount}/> </span>
          <span className="text-purple-500">voluntários</span> das mais de <span className="text-purple-400"><CountUp end={institutesCount}/> </span>
          <span className="text-purple-500">instituições</span> cadastradas!
        </h2>
      </motion.div>
      <motion.div initial={{ y: 100, opacity: 0 }} animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", duration: 0.8, delay: 0.4 }} className="font-bold text-yellow-500">
       <h3>
          E aí? <br/>
        </h3>
        <h1>
          Você está pronto para fazer do mundo <br/>
          um lugar melhor?
        </h1>
      </motion.div>
      <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ opacity: 1, scale: 1 }}
    transition={{ type: "spring", duration: 0.8, delay: 0.8 }} className="flex flex-col mb-20 gap-2">
        <Link href="/register"><Button title="Estou pronto!"/></Link>
        <Link href="/teste" className="underline text-zinc-600 hover:text-zinc-500">Quero ter minha instituição aqui</Link>
      </motion.div>
    </div>
  )
}
