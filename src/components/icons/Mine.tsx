export default function Mine() {
  return (
    <svg
      className="w-full h-full"
      x="0px"
      y="0px"
      width="100px"
      height="100px"
      viewBox="0 0 100 100"
    >
      <circle cx="50" cy="50" r="30" fill="black" />

      <line x1="50" y1="10" x2="50" y2="20" stroke="black" strokeWidth="2" />
      <line x1="50" y1="90" x2="50" y2="80" stroke="black" strokeWidth="2" />
      <line x1="10" y1="50" x2="20" y2="50" stroke="black" strokeWidth="2" />
      <line x1="90" y1="50" x2="80" y2="50" stroke="black" strokeWidth="2" />
      <line x1="15" y1="15" x2="25" y2="25" stroke="black" strokeWidth="2" />
      <line x1="85" y1="15" x2="75" y2="25" stroke="black" strokeWidth="2" />
      <line x1="15" y1="85" x2="25" y2="75" stroke="black" strokeWidth="2" />
      <line x1="85" y1="85" x2="75" y2="75" stroke="black" strokeWidth="2" />
      <circle cx="40" cy="40" r="8" fill="white" />
    </svg>
  )
}
