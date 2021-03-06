import { asArray } from "../util/input";
import part from "../util/part";

asArray(lines => {
  if (part === 1) {
    let max = 0
    for (const line of lines) {
      const seatId = getSeatId(line)
      if (seatId > max) {
        max = seatId
      }
    }
    console.warn(max)
  } else {
    const seatIds = new Set<number>()
    for (const line of lines) {
      const seatId = getSeatId(line)
      seatIds.add(seatId)
    }
    for (const seatId of seatIds) {
      if (!seatIds.has(seatId + 1) || !seatIds.has(seatId - 1)) {
        console.warn(seatId)
      }
    }
  }
})

function getSeatId(seat: string) {
  const row = binarySpacePartition(Array.from(seat.slice(0, 7)), 0, 127)
  const col = binarySpacePartition(Array.from(seat.slice(7, 10)), 0, 7)
  return row * 8 + col;
}

function binarySpacePartition(values: string[], min: number, max: number): number {
  const value = values.shift()
  if (values.length === 0) {
    if (value === "F" || value === "L") {
      return min
    } else {
      return max
    }
  } else if (value === "F" || value === "L") {
    return binarySpacePartition(values, min, (min + max - 1) / 2)
  } else {
    return binarySpacePartition(values, ((min + max - 1) / 2) + 1, max)
  }
}
