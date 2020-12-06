import { readFile } from 'fs'
import day from './day'

const dailyFileName = `${day}/input.txt`

export function asArray(callback: (lines: string[]) => any) {
  readFile(dailyFileName, 'utf8', (err, data) => {
    if (err) throw err;
    callback(data.split('\r\n').filter(s => s.length > 0))
  });
}

export function asArrayByBlanks(callback: (lines: string[]) => any) {
  readFile(dailyFileName, 'utf8', (err, data) => {
    if (err) throw err;
    callback(data.split('\r\n\r\n').map(s => s.replace(/\r\n/g, ' ').trim()).filter(s => s.length > 0))
  });
}

export function asIntArray(callback: (nums: number[]) => any) {
  asArray(lines => {
    callback(lines.map(s => parseInt(s, 10)))
  })
}
