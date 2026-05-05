import Image from 'next/image'

const quadrants = [
  {
    title: "NATURAL FARMING",
    icon: "🌱",
    bullets: [
      "Kitchen Garden, Natural & Multilayer Farming",
      "Sustainability, Permaculture",
      "Native seeds, Soil, Crop, Cow protection",
      "Water Harvesting, Waste Water Treatment",
      "Food Processing & Good Eating habits"
    ],
    shloka: "अन्नाद्भवन्ति भूतानि पर्जन्यादन्नसम्भवः ।\nयज्ञाद्भवति पर्जन्यो यज्ञः कर्मसमुद्भवः ॥",
    people: ["Shashiraj Kumar", "Upendra Sri Sainath", "Manoj Kumar", "Mayank Sahu"],
    image: "/images/Nature Lab"
  },
  {
    title: "Health Care",
    icon: "🏥",
    bullets: [
      "Awareness and Thoughtfulness",
      "Hb meter, NMFC",
      "Devices for Oral care",
      "Federated continual Learning",
      "Virtual Surgical Planning"
    ],
    shloka: "अहं क्रतुरहं यज्ञः स्वधाहमहमौषधम् ।\nमन्त्रोऽहमहमेवाज्यमहमग्निरहं हुतम् ॥",
    people: ["Sandeep", "Manisha"],
    image: "/images/healthcare_new.png"
  },
  {
    title: "Industrial Safety, User Experience",
    icon: "🏭",
    bullets: [
      "Industrial SafetyNet",
      "Anomaly Detection and Mitigation",
      "Co-Pilot for user experience",
      "Steel Quality Prediction",
      "DevOps & RCA tools"
    ],
    shloka: "सर्वस्य चाहं हृदि सन्निविष्टो मत्तः स्मृतिर्ज्ञानमपोहनं च ।\nवेदैश्च सर्वैरहमेव वेद्यो वेदान्तकृद्वेदविदेव चाहम् ॥",
    people: ["Nitin Mane", "Raghav", "Surya", "Kalyan"],
    image: "/images/industrial_safety_new.png"
  },
  {
    title: "Education, Research, Training",
    icon: "🎓",
    bullets: [
      "Promote honesty, integrity, and holistic growth",
      "Use activity-based and adaptive learning methods",
      "Conduct teacher training programs",
      "Encourage handicrafts and eco-projects",
      "Focus on continuous assessment and skill development"
    ],
    shloka: "शुश्रूषा-श्रवण-ग्रहण-धारण-विज्ञानोहापोह-\nतत्त्वाभिनिवेशः प्रज्ञागुणाः।",
    people: ["Niket Jaiswal", "Vikrant Sahu"],
    image: "/images/education_training.png"
  }
];

export default function AreasOfWork() {
  return (
    <section className="w-full py-12" id="areas-of-work">
      <div className="text-center mb-20 relative">
        {/* Subtle decorative background for title */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-[0.03]">
          <span className="text-[10rem] font-bold">S3</span>
        </div>
        <h2 className="text-xl md:text-2xl text-slate-600 font-medium font-serif mb-6 leading-relaxed">
          ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते ।<br/>
          पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते ॥
        </h2>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight uppercase">
          Simple <span className="text-[#32a852]">Sustainable</span> Systems
        </h1>
        <div className="w-32 h-1.5 bg-gradient-to-r from-[#32a852] to-[#288a42] mx-auto mt-8 rounded-full shadow-sm"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {quadrants.map((quad, idx) => (
          <div key={idx} className="bg-white/80 backdrop-blur-md rounded-[2rem] p-8 shadow-xl shadow-slate-200/40 border border-slate-200/60 flex flex-col h-full hover:-translate-y-1.5 transition-all duration-300 group hover:shadow-2xl hover:shadow-green-900/5">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center text-3xl shadow-inner border border-green-100">
                {quad.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-800">{quad.title}</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-grow mb-8">
              <div className="flex flex-col justify-center">
                <ul className="space-y-4">
                  {quad.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 font-medium">
                      <span className="text-[#32a852] mt-0.5 text-lg">•</span>
                      <span className="leading-snug">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative h-64 lg:h-auto rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-500">
                <Image 
                  src={quad.image} 
                  alt={quad.title} 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
            </div>

            <div className="mt-auto">

              <div className="flex flex-wrap gap-2.5">
                {quad.people.map((person, i) => (
                  <div key={i} className="bg-slate-800 hover:bg-[#32a852] text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2 shadow-md transition-colors duration-300 cursor-default">
                    <svg className="w-3.5 h-3.5 opacity-80" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                    {person}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
