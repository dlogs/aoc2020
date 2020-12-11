import { readFile } from 'fs'
import day from './day'

const dailyFileName = `${day}/input.txt`

export function asArray(callback: (lines: string[]) => any) {
  readFile(dailyFileName, 'utf8', (err, data) => {
    if (err) throw err;
    callback(data.split(/\r?\n/g).filter(s => s.length > 0))
  });
}
export function as2dArray(callback: (lines: string[][]) => any) {
  readFile(dailyFileName, 'utf8', (err, data) => {
    if (err) throw err;
    callback(data.split(/\r?\n/g).filter(s => s.length > 0).map(s => Array.from(s)))
  });
}

export function asArrayByBlanks(callback: (lines: string[]) => any) {
  readFile(dailyFileName, 'utf8', (err, data) => {
    if (err) throw err;
    callback(data.split(/\r?\n\r?\n/g).map(s => s.replace(/\r?\n/g, ' ').trim()).filter(s => s.length > 0))
  });
}

export function asIntArray(callback: (nums: number[]) => any) {
  asArray(lines => {
    callback(lines.map(s => parseInt(s, 10)))
  })
}
