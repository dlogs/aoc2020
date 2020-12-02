import part from '../util/part'
import { readLinesAsIntArray } from '../util/input'

readLinesAsIntArray("1/input.txt", nums => {
  if (part == 1) {
    nums.some(n1 =>
      nums.some(n2 => {
        if (n1 + n2 == 2020) {
          console.warn(n1 * n2)
          return true
        }
      })
    )
  } else {
    nums.some(n1 =>
      nums.some(n2 =>
        nums.some(n3 => {
          if (n1 + n2 + n3 == 2020) {
            console.warn(n1 * n2 * n3)
            return true
          }
        })
      )
    )
  }
})
