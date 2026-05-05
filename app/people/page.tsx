import Image from 'next/image'

const students = [
  { name: "Vikrant Sahu", role: "Phd Scholar", image: "https://ui-avatars.com/api/?name=Vikrant+Sahu&background=32a852&color=fff" },
  { name: "Raghav Borikar", role: "M.Tech", image: "https://ui-avatars.com/api/?name=Raghav+Borikar&background=32a852&color=fff" },
  { name: "Sandeep", role: "M.Tech", image: "/images/sandeep.png" },
  { name: "Nitin Mane", role: "M.Tech", image: "https://ui-avatars.com/api/?name=Nitin+Mane&background=32a852&color=fff" },
]

const projectStaffs = [
  { name: "Niket Jaiswal", role: "Project Manager", image: "https://ui-avatars.com/api/?name=Niket+Jaiswal&background=32a852&color=fff" },
  { name: "Rateesh Venugopal", role: "Project Staff", image: "https://ui-avatars.com/api/?name=Rateesh+Venugopal&background=32a852&color=fff" },
  { name: "Anshul Kumar", role: "Project Staff", image: "https://ui-avatars.com/api/?name=Anshul+Kumar&background=32a852&color=fff" },
  { name: "Mukul", role: "Project Staff", image: "/images/Mukul.jpeg" },
  { name: "Sai Teja", role: "Project Engineer", image: "/images/saiteja.jpg" },
  { name: "Chetan", role: "Project Staff", image: "https://ui-avatars.com/api/?name=Chetan&background=32a852&color=fff" },
  { name: "Aniket", role: "Project Staff", image: "https://ui-avatars.com/api/?name=Aniket&background=32a852&color=fff" },
  { name: "Irfan", role: "Project Staff", image: "https://ui-avatars.com/api/?name=Irfan&background=32a852&color=fff" },
]


export default function PeoplePage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Header */}
      <div className="bg-[#32a852]/10 py-16 mb-16 border-b border-[#32a852]/20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Our <span className="text-[#32a852]">People</span>
          </h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-lg">
            Meet the researchers, students, and alumni driving sustainable innovations at the S3 Lab.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6">
        
        {/* Section 1: Dr Gagan Raj Gupta */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-slate-800 mb-10 flex items-center gap-3">
            <span className="w-8 h-1 bg-[#32a852] rounded-full"></span>
            Lab Head
          </h2>
          
          <div className="glass p-8 md:p-10 rounded-[2rem] border border-slate-200/60 shadow-xl shadow-slate-200/50 flex flex-col lg:flex-row gap-10 items-start">
            <div className="w-full lg:w-1/3 shrink-0 relative h-[400px] md:h-[500px] lg:h-[450px] rounded-2xl overflow-hidden shadow-lg border border-slate-200">
              <Image 
                src="/images/dr_gagan_raj_gupta.jpg" 
                alt="Dr. Gagan Raj Gupta" 
                fill 
                className="object-cover object-top"
              />
            </div>
            
            <div className="w-full lg:w-2/3 flex flex-col justify-center">
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">Dr. Gagan Raj Gupta</h3>
              <p className="text-lg text-[#32a852] font-semibold mb-6">Associate Professor, CSE, IIT Bhilai</p>
              
              <div className="space-y-4 text-slate-700 leading-relaxed text-[15px] md:text-base">
                <p>
                  Dr. Gagan Raj Gupta is an Associate Professor of Computer Science and Engineering at IIT Bhilai with research interests in sustainable systems design, machine learning, and distributed systems. He obtained a IIT JEE Rank 17 and a gold medal at Indian National Physics Olympiad in 2001. He was the topper of the BTech computer science batch of students from IIT Delhi in 2005 and was awarded the institute silver medal.
                </p>
                <p>
                  He was awarded PhD degree from Purdue University in 2009. He worked as the Lead Member of Technical Staff at the prestigious AT&T Labs, USA for 10 years designing large-scale network intelligence solutions.
                </p>
                <p>
                  His current work focuses on areas such as NEP aligned school education, multimodal learning, industrial safety using EdgeML. He leads the Simple Sustainable Systems (S³) research lab and actively works on developing technology-driven solutions for healthcare and sustainability. His textbook on Data Analytics and Visualization has been published recently.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Students */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-10 flex items-center gap-3">
            <span className="w-8 h-1 bg-[#32a852] rounded-full"></span>
            Students
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {students.map((member, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center group">
                <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-4 border-slate-50 group-hover:border-green-50 transition-colors duration-300 shadow-sm">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <h4 className="text-xl font-bold text-slate-800">{member.name}</h4>
                <p className="text-sm text-[#32a852] font-medium mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2.5: Project Staff */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-slate-800 mb-10 flex items-center gap-3">
            <span className="w-8 h-1 bg-[#32a852] rounded-full"></span>
            Project Staff
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectStaffs.map((member, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center group">
                <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-4 border-slate-50 group-hover:border-green-50 transition-colors duration-300 shadow-sm">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <h4 className="text-xl font-bold text-slate-800">{member.name}</h4>
                <p className="text-sm text-[#32a852] font-medium mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </section>


      </div>
    </div>
  )
}
