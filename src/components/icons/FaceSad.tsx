export default function FaceSad() {
  return (
    <svg
      className="w-full h-full"
      x="0px"
      y="0px"
      width="120px"
      height="120px"
      viewBox="-10 -10 120 120"
    >
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="yellow"
        stroke="black"
        strokeWidth="2"
      />

      <line x1="30" y1="30" x2="40" y2="40" stroke="black" strokeWidth="2" />
      <line x1="40" y1="30" x2="30" y2="40" stroke="black" strokeWidth="2" />

      <line x1="60" y1="30" x2="70" y2="40" stroke="black" strokeWidth="2" />
      <line x1="70" y1="30" x2="60" y2="40" stroke="black" strokeWidth="2" />

      <path
        d="M 30 65 Q 50 55 70 65"
        fill="none"
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  )
}
