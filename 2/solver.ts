import part from '../util/part'
import { readLinesAsArray } from '../util/input'

readLinesAsArray("2/input.txt", lines => {
  if (part == 1) {
    console.warn(lines.map(getParts).filter(passwordMatches1).length)
  } else {
    console.warn(lines.map(getParts).filter(passwordMatches2).length)
  }
})

interface PasswordParts {
  min: number
  max: number
  char: string,
  password: string
}

function passwordMatches1({min, max, char, password} : PasswordParts) {
  const charCount = password.match(new RegExp(`${char}`, 'g'))?.length
  return charCount && charCount >= min && charCount <= max
}
function passwordMatches2({min, max, char, password} : PasswordParts) {
  return max <= password.length && (password[min - 1] == char) != (password[max - 1] == char)
}

function getParts(line: string): PasswordParts {
  const regex = /(?<min>\d+)-(?<max>\d+) (?<char>\w): (?<password>\w+)/
  const found = line.match(regex)
  if (found) {
    const values = found.groups!
    return {
      min: parseInt(values.min, 10),
      max: parseInt(values.max, 10),
      char: values.char,
      password: values.password
    }
  } else {
    throw "not found"
  }
}