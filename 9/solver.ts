import part from '../util/part'
import { asIntArray } from '../util/input'
import { max, min } from 'lodash'

asIntArray(nums => {
  if (part === 1) {
    const numberManager = new NumberManager()
    for (let index = 0; index < nums.length; index++) {
      const num = nums[index]
      if (index >= 25) {
        if (!numberManager.isValid(num)) {
          console.warn(num)
          break;
        }
      }
      numberManager.next(num)
    }
  } else {
    const toFind = 70639851
    let sum = 0
    let firstIndex = 0
    for (let index = 0; index < nums.length; index++) {
      const num = nums[index]
      sum += num
      
      while (sum > toFind) {
        sum -= nums[firstIndex]
        ++firstIndex
      }

      if (sum === toFind) {
        const range = nums.slice(firstIndex, index + 1)
        console.log(range)
        console.warn(min(range)! + max(range)!)
        break;
      }
    }
  }
})

class NumberManager {
  nums: number[]
  sums: number[][]

  constructor() {
    this.nums = []
    this.sums = []
  }

  next(num: number) {
    if (this.nums.length === 25) {
      this.nums.shift()
      this.sums.shift()
    }
    
    for (let index = 0; index < this.sums.length; index++) {
      const sums = this.sums[index]
      sums.push(num + this.nums[index])
    }
    this.nums.push(num)
    this.sums.push([])
  }

  isValid(num: number) {
    return this.sums.some(sums => sums.includes(num))
  }
}