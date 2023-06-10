import Link from "next/link";
import { MouseEventHandler } from "react";

export default function Button({ title, onClick, disabled }: { title: string; onClick?: MouseEventHandler, disabled?: boolean }) {
  return (
      <button className='primaryButton disabled:bg-yellow-200 disabled:opacity-80 disabled:text-white' onClick={onClick} disabled={disabled}>
        {title}
      </button>
  )
}
