import { intersection, sum, uniq } from "lodash";
import { asArrayByBlanks } from "../util/input";
import part from "../util/part";

asArrayByBlanks(lines => {
  if (part === 1) {
    console.warn(sum(lines.map(parseLine)))
  } else {
    console.warn(sum(lines.map(parseLine2)))
  }
})

function parseLine(line: string): number {
  return uniq(Array.from(line.replace(/\s/g, ""))).length
}

function parseLine2(line: string): number {
  const people = line.split(" ")
  const count = intersection(...people.map(s => Array.from(s))).length
  console.log(`line: ${line}, people: ${people.length}, count: ${count}`)
  return count
}
