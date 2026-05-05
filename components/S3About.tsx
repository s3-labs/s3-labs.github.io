import S3Tree from '../components/S3Tree'

export default function S3About(){
  return (
    <section className="py-20 bg-gradient-to-b from-white/50 to-white">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-6">
          What is S3
        </h2>

        {/* Description */}
        <p className="text-center text-slate-700 max-w-2xl mx-auto mb-16 text-lg leading-relaxed">
          S3 stands for Simple Sustainable Solutions. Our vision is to develop machine learning systems that are technically rigorous, socially responsible, scalable, and accessible.
        </p>

        {/* Tree Structure */}
        <S3Tree />
      </div>
    </section>
  )
}
