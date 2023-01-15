import Notes from '@/components/Notes'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <Notes />
    </main>
  )
}
