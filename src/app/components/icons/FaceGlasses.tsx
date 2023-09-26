export default function FaceGlasses() {
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

      <ellipse cx="35" cy="35" rx="13" ry="10" fill="black" />

      <ellipse cx="65" cy="35" rx="13" ry="10" fill="black" />

      <rect x="45" y="30" width="10" height="5" fill="black" />

      <rect x="20" y="25" width="5" height="15" fill="black" />

      <rect x="75" y="25" width="5" height="15" fill="black" />

      <path
        d="M 30 60 Q 50 75 70 60"
        fill="none"
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  )
}
