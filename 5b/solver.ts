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
  return parseInt(seat.replace(/[FL]/g, '0').replace(/[BR]/g, '1'), 2)
}
