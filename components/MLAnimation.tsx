export default function MLAnimation(){
  return (
    <div className="w-full h-64 md:h-80 flex items-center justify-center">
      <svg viewBox="0 0 200 120" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0%" stopColor="#1e40af" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        <g fill="none" stroke="url(#g)" strokeWidth="2" strokeLinecap="round">
          <path d="M10 80 C40 10, 80 10, 110 80" strokeOpacity="0.12" />
          <path d="M40 80 C70 20, 110 20, 140 80" strokeOpacity="0.18" />
        </g>

        <g fill="url(#g)" stroke="none">
          <circle cx="20" cy="80" r="4">
            <animate attributeName="r" values="3;6;3" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;1;0.8" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="60" cy="40" r="4">
            <animate attributeName="r" values="3;7;3" dur="1.6s" begin="0.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;1;0.8" dur="1.6s" begin="0.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="100" cy="60" r="4">
            <animate attributeName="r" values="3;8;3" dur="1.9s" begin="0.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;1;0.8" dur="1.9s" begin="0.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="140" cy="40" r="4">
            <animate attributeName="r" values="3;6;3" dur="1.7s" begin="0.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;1;0.8" dur="1.7s" begin="0.6s" repeatCount="indefinite" />
          </circle>
          <circle cx="180" cy="80" r="4">
            <animate attributeName="r" values="3;6;3" dur="1.5s" begin="0.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;1;0.8" dur="1.5s" begin="0.8s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  )
}
