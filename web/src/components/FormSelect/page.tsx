import { ChangeEventHandler, MouseEventHandler } from "react";

interface Option {
  sigla?: string
  nome: string
}

export default function FormSelect({ value, onChange, label, name, id, options, width }: { value: string; onChange: ChangeEventHandler; label: string; name: string; id: string, options: Array<Option>, width?: boolean }) {
  return (
    <div className={`flex flex-col mb-3 ${width ? 'w-full min-w-0':''}`}>
      <label className='text-xs text-zinc-500 pl-[2px] mb-[2px]' htmlFor={id}>{label}</label>
      <select value={value} onChange={onChange} className={`rounded-md outline-none text-black bg-zinc-100 py-2 px-3 ${width ? `min-w-full` : 'min-w-[260px]'}`} id={id} name={name}>
      <option value="0">Selecione...</option>
          {options.map((opt) => (
            <option value={opt.sigla?opt.sigla:opt.nome}>{opt.nome}</option>
          ))}
      </select>
    </div>
  )
}