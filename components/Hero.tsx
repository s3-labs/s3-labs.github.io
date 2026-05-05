import MLAnimation from './MLAnimation'

export default function Hero(){
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-900">Engineering Sustainable Systems for Real-World Impact
        </h1>
        <p className="mt-6 text-slate-700 max-w-xl">
         An interdisciplinary research lab focused on solving real-world problems 
through sustainability, technology, and innovation.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <button className="px-8 py-3 bg-[#32a852] hover:bg-[#288a42] text-white font-medium rounded-full shadow-lg shadow-[#32a852]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#32a852]/40">
            Explore Our Work
          </button>
          <button className="px-8 py-3 bg-white hover:bg-slate-50 text-slate-800 font-medium rounded-full shadow-sm border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            Collaborate With Us
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-md glass-dark flex items-center justify-center">
          <MLAnimation />
        </div>
      </div>
    </div>
  )
}
