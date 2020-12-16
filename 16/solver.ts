import { sortBy, sum } from "lodash";
import { asArray } from "../util/input";
import part from "../util/part";

interface Range {
  min: number,
  max: number
}

class Rule {
  constructor(public name: string, public ranges: Range[]) {
  }

  matches(num: number) {
    return this.ranges.some(r => num >= r.min && num <= r.max)
  }
}

asArray(lines => {
  const nearbyTickets = lines.splice(lines.indexOf("nearby tickets:") + 1).map(t => t.split(",").map(s => parseInt(s, 10)))
  const myTicket = lines.splice(lines.indexOf("your ticket:"))[1].split(",").map(s => parseInt(s, 10))
  const rules = lines.map(parseRule)
  if (part == 1) {
    console.warn(sum(nearbyTickets.flatMap(t => t).filter(n => !rules.some(r => r.matches(n)))))
  } else {
    const validTickets = nearbyTickets.filter(t => t.every(n => rules.some(r => r.matches(n))))
    let possibleRules = myTicket.map(n => rules.filter(r => r.matches(n)))
    for (const ticket of validTickets) {
      for (let i = 0; i < possibleRules.length; i++) {
        possibleRules[i] = possibleRules[i].filter(r => r.matches(ticket[i]))
      }
    }
    const sortedRules = sortBy(possibleRules, rs => rs.length)
    for (let i = 0; i < sortedRules.length; i++) {
      const onlyRule = sortedRules[i][0];
      for (let j = i + 1; j < sortedRules.length; j++) {
        const rules = sortedRules[j]
        rules.splice(rules.indexOf(onlyRule), 1)
      }
    }
    console.log(possibleRules)

    let product = 1
    for (let i = 0; i < possibleRules.length; i++) {
      if (possibleRules[i][0].name.startsWith("departure")) {
        console.log(`including ${possibleRules[i][0].name}: ${myTicket[i]}`)
        product *= myTicket[i]
      }
    }
    console.warn(product)
  }
})

function parseRule(rule: string): Rule {
  const [name, ranges] = rule.split(": ")
  return new Rule(name,
    ranges.split(" or ").map(r => {
      const [min, max] = r.split("-").map(s => parseInt(s, 10))
      return { min, max }
    })
  )
}