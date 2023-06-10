import './globals.css'
import { Roboto_Flex } from 'next/font/google'

const robotoFlex = Roboto_Flex({ subsets: ['latin'] })

export const metadata = {
  title: 'FAUA - Mude o mundo!',
  description: 'FAUA - Mude o mundo!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={robotoFlex.className}>{children}</body>
    </html>
  )
}
