import Image from "next/image"
import logoFull from '../../../public/logo-full-white.svg'
import Link from "next/link"
import Button from "../Button/page"

export default function MainContent() {
  return (
    <div className="flex flex-col justify-center leading-relaxed items-center text-center gap-20">
      <div>
        <Image src={logoFull} alt="Logo FAUA" width={192}/>
      </div>
      <div className="font-bold">
        <h2>
          Surgimos como uma solução para quem quer ajudar alguma causa <br/>
          porém não sabe onde procurar. <br/>
          Junte-se agora há mais de <span className="text-purple-400">1.200 </span>
          <span className="text-purple-500">voluntários</span> das mais de <span className="text-purple-400">150 </span>
          <span className="text-purple-500">instituições</span> cadastradas!
        </h2>
      </div>
      <div className="font-bold text-yellow-500">
       <h3>
          E aí? <br/>
        </h3>
        <h1>
          Você está pronto para fazer do mundo <br/>
          um lugar melhor?
        </h1>
      </div>
      <div className="flex flex-col mb-20 gap-2">
        <Link href="/register"><Button title="Estou pronto!"/></Link>
        <Link href="/teste" className="underline text-zinc-600 hover:text-zinc-500">Quero ter minha instituição aqui</Link>
      </div>
    </div>
  )
}
