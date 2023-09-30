export default function FaceSurprised() {
  return (
    <svg
      className=" w-full h-full"
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

      <circle cx="35" cy="35" r="5" fill="black" />
      <circle cx="65" cy="35" r="5" fill="black" />

      <ellipse
        cx="50"
        cy="60"
        rx="10"
        ry="10"
        fill="white"
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  )
}
