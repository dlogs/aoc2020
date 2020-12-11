import _ from "lodash";
import { as2dArray } from "../util/input";
import part from "../util/part";

as2dArray(lines => {
  let changed = true
  let next = lines
  let round = 0
  while (changed && round < 500) {
    round++
    console.log(round)
    changed = false
    next = next.map((row, y) => row.map((seat, x)=> {
      if (seat === '.') {
        return seat
      } else {
        const surrounding = [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, -1],
          [0, 1],
          [1, -1],
          [1, 0],
          [1, 1]
        ].map(([mvY, mvX]) => {
          if (part === 1) {
            return next[y + mvY] && next[y + mvY][x + mvX]
          } else {
            return _(_.range(1, 100)).map((i: number) => next[y + mvY * i] && next[y + mvY * i][x + mvX * i]).
              find(s => ['L', '#'].includes(s))
          }
        })
        let newValue = seat
        let occupied = surrounding.filter(s => s === '#').length
        if (occupied >= 4 && part === 1) {
          newValue = 'L'
        } else if (occupied >= 5 && part === 2) {
          newValue = 'L'
        } else if (occupied === 0) {
          newValue = '#'
        }
        changed ||= newValue !== seat
        // if (newValue !== seat) {
        //   console.error(`${x}${y} ${seat} => ${newValue}`)
        // }
        return newValue
      }
    }))
    // console.log(next.map(row => row.join('')).join('\n'))
  }
  console.warn(_.sum(next.map(row => row.filter(seat => seat === "#").length)))
})