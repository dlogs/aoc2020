import { readLinesAsArrayByBlanks } from "../util/input";
import part from "../util/part";

readLinesAsArrayByBlanks("4/input.txt", lines => {
  if (part === 1) {
    console.warn(lines.filter(isValidPassport1).length);
  } else {
    console.warn(lines.filter(isValidPassport2).length);
  }
})

function isValidPassport1(line: string) {
  const requiredFields = [
    'byr', // (Birth Year)
    'iyr', // (Issue Year)
    'eyr', // (Expiration Year)
    'hgt', // (Height)
    'hcl', // (Hair Color)
    'ecl', // (Eye Color)
    'pid', // (Passport ID)
    //'cid', // (Country ID)
  ]

  return requiredFields.every(f => line.includes(f))
}

function isValidPassport2(line: string) {
  const validations: [string, (x: string) => boolean][] = [
    ['byr', (x: string) => stringBetween(x, 1920, 2002)],
    ['iyr', (x: string) => stringBetween(x, 2010, 2020)],
    ['eyr', (x: string) => stringBetween(x, 2020, 2030)],
    ['hgt', (x: string) => x.endsWith("cm") ? stringBetween(x, 150, 193) : x.endsWith("in") ? stringBetween(x, 59, 76) : false],
    ['hcl', (x: string) => !!x.match(/^#[0-9a-f]{6}$/)],
    ['ecl', (x: string) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth',].includes(x)],
    ['pid', (x: string) => !!x.match(/^[0-9]{9}$/)]
  ]

  const parts = line.split(' ').map(field => field.split(':')).reduce((hash, value) => hash.set(value[0], value[1]), new Map<string, string>())
  const result =  validations.every(v => parts.get(v[0]) && v[1](parts.get(v[0])!))
  // if (isValidPassport1(line)) {
  //   console.info(`${result}: ${line}`)
  // }
  return result
}

function stringBetween(value: string, min: number, max: number) {
  const intValue = parseInt(value, 10)
  return intValue >= min && intValue <= max
}