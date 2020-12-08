import { sum } from "lodash";
import { asArray } from "../util/input";
import part from "../util/part";

interface Contained {
  color: string
  count: number
}

asArray(lines => {
  const colorContains = new Map<string, Contained[]>()
  lines.forEach(line => {
    const parts = line.split(/ bags contain /)
    colorContains.set(parts[0], parts[1] == 'no other bags.' ? [] : parts[1].split(/, /g).map(bag => {
      const match = bag.match(/(?<count>\d+) (?<color>\w+ \w+) bags?\.?/)!
      return {
        color: match.groups!.color,
        count: parseInt(match.groups!.count, 10)
      }
    }))
  })
  
  if (part === 1) {
    const flattenBags = (color: string): string[] => {
      const contents = colorContains.get(color)!
      return contents.flatMap(({color}) => [color, ...flattenBags(color)])
    }

    let count = 0
    
    for (const color of colorContains.keys()) {
      if (flattenBags(color).some(x => x == "shiny gold") ) {
        count++
      }
    }
    console.warn(count)
  } else {
    const flattenBagCount = (color: string): number => {
      const contents = colorContains.get(color)!
      return sum(contents.map(({color, count}) => count + (count * flattenBagCount(color))))
    }
    console.warn(flattenBagCount("shiny gold"))
  }
})

