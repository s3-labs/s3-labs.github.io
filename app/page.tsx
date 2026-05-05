'use client'

import Hero from '../components/Hero'
import AreasOfWork from '../components/AreasOfWork'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home(){
  return (
    <div>
      <section className="container mx-auto px-6 min-h-[calc(100vh-80px)] flex items-center justify-center">
        <Hero />
      </section>
      
      <section className="container mx-auto px-6 pb-20">
        <AreasOfWork />
      </section>
      
      <Contact />
      <Footer />
    </div>
  )
}
