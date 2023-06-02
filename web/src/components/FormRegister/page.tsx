'use client'

import FormInput from '../FormInput/page';
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import FormSelect from '../FormSelect/page';

type IBGEUFResponse = {
  sigla: string;
  nome: string;
};
type IBGECITYResponse = {
  id: number;
  nome: string;
};

export default function FormRegister() {
  const [ufs, setUfs] = useState<IBGEUFResponse[]>([]);
  const [cities, setCities] = useState<IBGECITYResponse[]>([]);
  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");
  useEffect(() => {
    if (selectedUf === "0") {
      return;
    }
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        setCities(response.data);
      });
  });

  useEffect(() => {
    axios
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/")
      .then((response) => {
        setUfs(response.data);
      });
  }, [selectedUf]);

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;
    setSelectedUf(uf);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setSelectedCity(city);
  }

  return (
    <div className='justify-center items-center mt-[15%] bg-white rounded p-6 m-6 text-black'>
      <form action="" className='grid grid-cols-3 gap-4'>
        <div>
          <FormInput type={'text'} label={'Nome completo'} name={'name'} id={'name'} placeholder='Ex: João da Silva'/>
          <FormInput type={'email'} label={'Endereço de e-mail'} name={'email'} id={'email'} placeholder='Ex: seufulano@email.com' />
          <FormInput type={'cpf'} label={'CPF'} name={'cpf'} id={'cpf'} placeholder='Ex: 123.456.789-10' />
          <div className='flex w-full gap-2'>
            <FormSelect value={selectedUf} onChange={handleSelectUf} label={'Estado'} name={'uf'} id={'uf'} width={true} options={ufs} />
            <FormSelect value={selectedCity} onChange={handleSelectCity} label={'Cidade'} name={'city'} id={'city'} width={true} options={cities} />
          </div>
          <FormInput type={'text'} label={'Endereço residencial'} name={'name'} id={'name'} placeholder='R. Flor das Rosas, 123' />
        </div>
        <div>
          <FormInput type={'text'} label={'Seu nome completo'} name={'name'} id={'name'} />
          <FormInput type={'text'} label={'Seu nome completo'} name={'name'} id={'name'} />
          <FormInput type={'text'} label={'Seu nome completo'} name={'name'} id={'name'} />
          <FormInput type={'text'} label={'Seu nome completo'} name={'name'} id={'name'} />
          <FormInput type={'text'} label={'Seu nome completo'} name={'name'} id={'name'} />
        </div>
      </form>
    </div>
  )
}
