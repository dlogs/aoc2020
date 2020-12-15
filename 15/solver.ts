import { asArray } from "../util/input";
import part from "../util/part";

asArray(lines => {
  const lastSpoken = new Map<number, number>()
  let spokenNumbers = lines[0].split(",").map(n => parseInt(n, 10))
  let last = spokenNumbers.pop()!
  let next = 0
  spokenNumbers.forEach((n, i) => lastSpoken.set(n, i))
  const limit = part === 1 ? 2020 : 30000000
  let spokenCount = spokenNumbers.length
  while (spokenCount < limit - 1) {
    const lastSpokenAt = lastSpoken.get(last)
    next = lastSpokenAt != null ? spokenCount - lastSpokenAt : 0
    lastSpoken.set(last, spokenCount)
    spokenCount++
    last = next
  }
  console.warn(last)
})
