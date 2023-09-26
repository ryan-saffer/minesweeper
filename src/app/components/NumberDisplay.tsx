import Digit from "./icons/Digit"

export default function NumberDisplay({ value }: { value: number }) {
  const numberAsString =
    value > 999 ? "999" : value < -99 ? "-99" : value.toString()
  return (
    <div className="flex bg-black">
      <Digit
        value={
          value >= 0
            ? numberAsString.length > 2
              ? numberAsString[0]
              : "0"
            : numberAsString.length > 2
            ? "-"
            : "off"
        }
      />
      <Digit
        value={
          numberAsString.length > 2
            ? numberAsString[1]
            : value >= 0
            ? numberAsString.length > 1
              ? numberAsString[0]
              : "0"
            : "-"
        }
      />
      <Digit
        value={
          numberAsString.length > 2
            ? numberAsString[2]
            : numberAsString.length > 1
            ? numberAsString[1]
            : numberAsString[0]
        }
      />
    </div>
  )
}
