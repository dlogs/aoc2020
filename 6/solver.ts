import { intersection, sum, union, uniq } from "lodash";
import { asArrayByBlanks } from "../util/input";
import part from "../util/part";

asArrayByBlanks(lines => {
  console.warn(lines.length)
  if (part === 1) {
    console.warn(sum(lines.map(parseLine)))
  } else {
    console.warn(sum(lines.map(parseLine2)))
  }
})

function parseLine(line: string): number {
  const people = line.split(" ")
  const count = union(...people.map(s => Array.from(s))).length
  return count
}

function parseLine2(line: string): number {
  const people = line.split(" ")
  const count = intersection(...people.map(s => Array.from(s))).length
  return count
}
