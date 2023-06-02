import Link from "next/link";
import { MouseEventHandler } from "react";

export default function Button({ title, onClick }: { title: string; onClick?: MouseEventHandler }) {
  return (
      <button className='primaryButton' onClick={onClick}>
        {title}
      </button>
  )
}
