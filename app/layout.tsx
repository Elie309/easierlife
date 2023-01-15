
import './globals.css'
import Nav from '@/components/Nav'
import { cookies } from 'next/headers'


export default function RootLayout({children, }: { children: React.ReactNode }) {

  const cookiesList = cookies()
  const hasCookie = cookiesList.has('theme')

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className='theme-dark bg-skin-fill'>
        <Nav />

        {children}
      </body>
    </html>
  )
}
