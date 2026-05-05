"use client"
import Link from 'next/link'
import Image from 'next/image'

function Dropdown({title, items}:{title:string, items:string[]}){
  return (
    <div className="relative group">
      <button className="px-3 py-2 rounded-md text-slate-900 hover:text-primary transition-colors duration-200">
        {title}
      </button>
      <div className="absolute left-0 mt-2 w-48 bg-white/80 glass shadow-lg rounded-md p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        {items.map((it)=> (
          <a key={it} className="block px-3 py-2 rounded text-slate-900 hover:text-primary hover:bg-slate-100" href="#">{it}</a>
        ))}
      </div>
    </div>
  )
}

export default function Navbar(){
  return (
    <header className="sticky top-0 z-50">
      <nav className="glass backdrop-blur-xs border-b border-white/30">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="S3 Lab Logo"
              width={50}
              height={50}
              className="w-12 h-12 object-contain"
            />
            <div>
              <div className="font-semibold">S3 Lab</div>
              <div className="text-xs text-slate-600">Simple sustainable solutions — IIT Bhilai</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-1 text-slate-900">
              <Link href="/#areas-of-work" className="px-3 py-2 rounded-md text-slate-900 hover:text-[#32a852] transition-colors duration-200">Research Areas</Link>

              <Link href="/people" className="px-3 py-2 rounded-md text-slate-900 hover:text-[#32a852] transition-colors duration-200">People</Link>
              <Link href="/events" className="px-3 py-2 rounded-md text-slate-900 hover:text-[#32a852] transition-colors duration-200">Events</Link>


              <a className="px-3 py-2 rounded-md text-slate-900 hover:text-primary transition-colors duration-200" href="#">Contact</a>
            </div>
          </div>

          <div className="md:hidden">
            <button className="p-2 rounded-md bg-transparent text-slate-900">Menu</button>
          </div>
        </div>
      </nav>
    </header>
  )
}
