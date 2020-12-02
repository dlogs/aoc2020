import { readFile } from 'fs';
export function readLinesAsIntArray(file: string, callback: (nums: number[]) => any) {
  readFile(file, 'utf8', (err, data) => {
    if (err) throw err;
    callback(data.split('\n').map(s => parseInt(s, 10)))
  });
}