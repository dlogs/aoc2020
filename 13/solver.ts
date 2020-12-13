import { max } from "lodash";
import { asArray } from "../util/input";
import part from "../util/part";

asArray(lines => {
  if (part === 1) {
    const earliest = parseInt(lines[0], 10)
    const busses = lines[1].split(',').filter(s =>  s != 'x').map(s => parseInt(s, 10))
    let min = 1000
    let minBus = 1000
    for (const bus of busses) {
      const closest = Math.ceil(earliest / bus) * bus
      const diff = closest - earliest
      if (diff < min) {
        min = diff
        minBus = bus
      }
    }
    console.warn(min * minBus)
  } else {
    const busses = lines[1].split(',').map(s => s === 'x' ? null : parseInt(s, 10))
    const longestBusses = busses.filter(b => b !== null).sort().reverse()
    const longest = longestBusses[0]!
    const longestIndex = busses.indexOf(longest)
    const secondLongest = longestBusses[1]!
    const secondLongestIndex = busses.indexOf(secondLongest)
    let gap = secondLongest * secondLongestIndex || secondLongest
    let t = gap - secondLongestIndex
    let allMatch = false

    let lastMatched = null
    let setNewGap = false
    while (t < Number.MAX_SAFE_INTEGER && t > 0 && !allMatch) {      
      if ((t + longestIndex) % longest === 0) {
        if (!setNewGap) {
          if (lastMatched == null) {
            lastMatched = t
          } else {
            gap = t - lastMatched
            console.info(`${gap}`)
            setNewGap = true
          }
        }
        
        allMatch = busses.every((b, i) => b === null || ((t + i) % b === 0))
      }

      if (!allMatch) {
        t += gap
      }
    }
    
    console.warn(t)
  }
})
