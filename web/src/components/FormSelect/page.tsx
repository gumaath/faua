import { ChangeEventHandler, MouseEventHandler } from "react";

interface Option {
  sigla?: string
  nome: string
}

export default function FormSelect({ value, onChange, label, id, options, width, error }: { value: string; onChange: ChangeEventHandler; label: string; id: string, options: Array<Option>, width?: boolean, error: any }) {
  return (
    <div className={`flex flex-col mb-3 ${width ? 'w-full min-w-0':''}`}>
      <label className='text-xs text-zinc-500 pl-[2px] mb-[2px]' htmlFor={id}>{label}</label>
      <select value={value} onChange={onChange} className={`rounded-md outline-none text-black bg-zinc-100 py-2 px-3 ${width ? `min-w-full` : 'min-w-[260px]'}`} id={id}>
      <option value="0">Selecione...</option>
          {options.map((opt) => (
            <option key={opt.nome} value={opt.sigla?opt.sigla:opt.nome}>{opt.nome}</option>
          ))}
      </select>
      {error && <span className='text-xs text-red-700'>✗ {error}</span>}
    </div>
  )
}