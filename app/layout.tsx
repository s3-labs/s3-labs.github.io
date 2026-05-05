import '../styles/globals.css'
import { ReactNode } from 'react'
import { Poppins } from 'next/font/google'
import Navbar from '../components/Navbar'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export const metadata = {
  title: 'S3 Lab - IIT Bhilai',
  description: 'Simple Sustainable Solutions (S3) Lab at IIT Bhilai - Machine Learning research.'
}

export default function RootLayout({ children }: { children: ReactNode }){
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <Navbar />
        <main className="min-h-[calc(100vh-72px)]">{children}</main>
      </body>
    </html>
  )
}
