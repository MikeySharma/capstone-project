import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center  gap-4 text-blue-600">
        <Image src="/logo.png" alt='logo' width={40} height={40} />
        SilentWord</Link>
        <div className="space-x-4">
          <Link href="#tutorials" className="text-gray-600 hover:text-blue-600">Tutorials</Link>
          <Link href="#practice" className="text-gray-600 hover:text-blue-600">Practice</Link>
          <Link href="#about" className="text-gray-600 hover:text-blue-600">About</Link>
          <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Login</Link>
        </div>
      </nav>
    </header>
  )
}

