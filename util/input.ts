import { readFile } from 'fs';

export function readLinesAsArray(file: string, callback: (lines: string[]) => any) {
  readFile(file, 'utf8', (err, data) => {
    if (err) throw err;
    callback(data.split('\n').filter(s => s.length > 0))
  });
}

export function readLinesAsIntArray(file: string, callback: (nums: number[]) => any) {
  readLinesAsArray(file, lines => {
    callback(lines.map(s => parseInt(s, 10)))
  })
}