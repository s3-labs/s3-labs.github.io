import Image from 'next/image'

export default function EventsPage() {
  const events = [
    {
      title: "PM Shri Teacher Capacity Building Program",
      date: "29 March 2026 - 3 April 2026",
      description: "The workshop focuses on integrating science, sustainability, and innovative teaching methods to help educators turn scientific concepts into real-world action. Aligned with NEP 2020, it emphasizes experiential and socially relevant learning. The 5-day intensive program at IIT Bhilai offers hands-on training through lectures, lab exposure, and practical activities. Teachers gain access to advanced labs and build digital and data skills using tools like Scratch and data science platforms to create future-ready classrooms.",
      image: "/images/PmShree.JPG",
      location: "IIT Bhilai"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Header */}
      <div className="bg-[#32a852]/10 py-16 mb-16 border-b border-[#32a852]/20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Our <span className="text-[#32a852]">Events</span>
          </h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-lg">
            Stay updated with the latest workshops, seminars, and programs organized by the S3 Lab.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="space-y-12">
          {events.map((event, idx) => (
            <div key={idx} className="glass p-8 md:p-10 rounded-[2rem] border border-slate-200/60 shadow-xl shadow-slate-200/50 flex flex-col lg:flex-row gap-10 items-start hover:shadow-2xl hover:shadow-green-900/5 transition-all duration-300">
              <div className="w-full lg:w-1/2 shrink-0 relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-md border border-slate-200 group">
                <Image 
                  src={event.image} 
                  alt={event.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              <div className="w-full lg:w-1/2 flex flex-col justify-center h-full py-4">
                <div className="flex flex-wrap gap-4 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-[#32a852] text-sm font-semibold border border-green-100">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    {event.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold border border-slate-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {event.location}
                  </span>
                </div>
                
                <h2 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">{event.title}</h2>
                
                <p className="text-slate-600 text-[15px] md:text-base leading-relaxed mb-8">
                  {event.description}
                </p>


              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
