import Link from 'next/link';

export default function FormInput({ type, label, name, id, width, placeholder }: { type: string; label: string; name: string; id: string, width?: boolean, placeholder?: string }) {
  return (
    <div className={`flex flex-col mb-3 ${width ? 'w-full':''}`}>
      <label className='text-xs text-zinc-500 pl-[2px] mb-[2px]' htmlFor={id}>{label}</label>
      <input className={`rounded-md outline-none text-black bg-zinc-100 py-2 px-3 ${width ? `min-w-full` : 'min-w-[260px]'}`} placeholder={placeholder} id={id} name={name} type={type} />
    </div>
  )
}
