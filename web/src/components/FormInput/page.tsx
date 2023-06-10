import Link from 'next/link';
import { ChangeEventHandler } from 'react';
import InputMask from 'react-input-mask';

interface FormInputProps {
  value: string;
  onChange: ChangeEventHandler;
  type: string;
  label: string;
  id: string;
  width?: boolean;
  placeholder?: string;
  error: any;
  mask?: string | (string | RegExp)[];
  formatChars?: any;
  maskChar?: any;
}

export default function FormInput({
  value,
  onChange,
  type,
  label,
  id,
  width,
  placeholder,
  error,
  mask,
  formatChars,
  maskChar,
}: FormInputProps) {
  return (
    <div className={`flex flex-col mb-3 ${width ? 'w-full' : ''}`}>
      <label className='text-xs text-zinc-500 pl-[2px] mb-[2px]' htmlFor={id}>
        {label}
      </label>
      <InputMask
        mask={mask || ''}
        formatChars={formatChars || ''}
        maskChar={maskChar || ''}
        className={`rounded-md outline-none text-black bg-zinc-100 py-2 px-3 ${
          width ? 'min-w-full' : 'min-w-[260px]'
        }`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id={id}
        type={type}
      />
      {error && <span className='text-xs text-red-700'>✗ {error}</span>}
    </div>
  );
}
