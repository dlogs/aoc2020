import part from '../util/part'
import { asIntArray } from '../util/input'
import { sortBy } from 'lodash'

asIntArray(nums => {
  const sorted = sortBy(nums)
  if (part === 1) {
    let prev = 0
    let ones = 0, threes = 0
    for (const num of sorted) {
      const diff = num - prev
      console.log(diff)
      if (diff === 1) {
        ones++
      } else if (diff === 3) {
        threes++
      } else if (diff > 3) {
        console.error("broke early")
        break
      }
      prev = num
    }
    threes++
    console.warn(`${ones} * ${threes} = ${ones * threes}`)
  } else {
    let prev = 0
    let onesRun = 0
    let total = 1
    for (const num of sorted) {
      const diff = num - prev
      console.log(diff)
      if (diff === 1) {
        onesRun++
      } else {
        total *= ways(onesRun)
        onesRun = 0
      }
      prev = num
    }
    console.warn(total)
  }
  
})

function ways(total: number) {
  const waysMap = {
    4: 7,
    3: 4,
    2: 2,
    1: 1,
    0: 1 
  }
  if (totalIsInRange(total)) {
    return waysMap[total]
  } else {
    console.error("total too high")
    return 1
  }
}

function totalIsInRange(total: number): total is 4 | 3 | 2 | 1 | 0 {
  return true
}
