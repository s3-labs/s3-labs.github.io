// 'use client'

// import Hero from '../components/Hero'
// import AreasOfWork from '../components/AreasOfWork'
// import Contact from '../components/Contact'
// import Footer from '../components/Footer'

// export default function Home(){
//   return (
//     <div>
//       <section className="container mx-auto px-6 min-h-[calc(100vh-80px)] flex items-center justify-center">
//         <Hero />
//       </section>
      
//       <section className="container mx-auto px-6 pb-20">
//         <AreasOfWork />
//       </section>
      
//       <Contact />
//       <Footer />
//     </div>
//   )
// }


'use client'

import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('../components/Hero'), { ssr: false });
const AreasOfWork = dynamic(() => import('../components/AreasOfWork'), { ssr: false });
const Contact = dynamic(() => import('../components/Contact'), { ssr: false });
const Footer = dynamic(() => import('../components/Footer'), { ssr: false });

export default function Home() {
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
  );
}