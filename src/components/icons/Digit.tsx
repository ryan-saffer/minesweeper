const LIGHT = "#FF0000"
const DARK = "#6A0203"

export default function Digit({ value }: { value: string }) {
  return (
    <svg height="50" viewBox="-1 -1 12 20" stroke="#000" strokeWidth="0.25">
      <polygon
        fill={
          value === "-" || value === "off" || value === "1" || value === "4"
            ? DARK
            : LIGHT
        }
        points="1, 1  2, 0  8, 0  9, 1  8, 2  2, 2"
      />
      <polygon
        fill={
          value === "-" || value === "off" || value === "5" || value === "6"
            ? DARK
            : LIGHT
        }
        points="9, 1 10, 2 10, 8  9, 9  8, 8  8, 2"
      />
      <polygon
        fill={value === "-" || value === "off" || value === "2" ? DARK : LIGHT}
        points="9, 9 10,10 10,16  9,17  8,16  8,10"
      />
      <polygon
        fill={
          value === "0" ||
          value === "2" ||
          value === "3" ||
          value === "5" ||
          value === "6" ||
          value === "8"
            ? LIGHT
            : DARK
        }
        points="9,17  8,18  2,18  1,17  2,16  8,16"
      />
      <polygon
        fill={
          value === "0" || value === "2" || value === "6" || value === "8"
            ? LIGHT
            : DARK
        }
        points="1,17  0,16  0,10  1, 9  2,10  2,16"
      />
      <polygon
        fill={
          value === "0" ||
          value === "4" ||
          value === "5" ||
          value === "6" ||
          value === "8" ||
          value === "9"
            ? LIGHT
            : DARK
        }
        points="1, 9  0, 8  0, 2  1, 1  2, 2  2, 8"
      />
      <polygon
        fill={
          value === "-" ||
          value === "2" ||
          value === "3" ||
          value === "4" ||
          value === "5" ||
          value === "6" ||
          value === "8" ||
          value === "9"
            ? LIGHT
            : DARK
        }
        points="1, 9  2, 8  8, 8  9, 9  8,10  2,10"
      />
    </svg>
  )
}
