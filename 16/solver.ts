import { sum } from "lodash";
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
    const validTickets = nearbyTickets.filter(t => t.some(n => rules.some(r => r.matches(n))))
    const possibleRules = myTicket.map(n => rules.filter(r => r.matches(n)))
    console.info(possibleRules)
    for (const ticket of validTickets) {
      for (let i = 0; i < possibleRules.length; i++) {
        possibleRules[i] = possibleRules[i].filter(r => r.matches(ticket[i]))
      }
    }
    console.info(possibleRules)
    let product = 1
    for (let i = 0; i < possibleRules.length; i++) {
      if (possibleRules[i][0].name.startsWith("departure")) {
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