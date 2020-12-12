import { asArray } from "../util/input";
import part from "../util/part";

asArray(lines => {
  if (part === 1) {
    let ns = 0
    let ew = 0
    let rotation = 0
    const cmds: {[key: string]: (i: number) => void} = {
      "N": i => ns += i,
      "S": i => ns -= i,
      "E": i => ew += i,
      "W": i => ew -= i,
      "L": i => rotation -= i,
      "R": i => rotation += i,
      "F": i => {
        switch (rotation % 360) {
          case 0:
            ew += i
            break;
          case 90:
            ns -= i
            break;
          case 180:
            ew -= i
            break;
          case 270:
            ns += i
            break;
        }
      }
    }
    for (const cmd of lines) {
      cmds[cmd[0]](parseInt(cmd.substr(1), 10))
    }
    console.warn(Math.abs(ns) + Math.abs(ew))
  } else {
    let wpns = 1
    let wpew = 10
    let ns = 0
    let ew = 0

    const rotate = (deg: number) => {
      if (deg === 90) {
        [wpns, wpew] = [-wpew, wpns]
      } else if (deg === 180) {
        wpns *= -1
        wpew *= -1
      } else {
        [wpns, wpew] = [wpew, -wpns]
      }
    }

    const cmds: {[key: string]: (i: number) => void} = {
      "N": i => wpns += i,
      "S": i => wpns -= i,
      "E": i => wpew += i,
      "W": i => wpew -= i,
      "L": i => rotate(360 - i),
      "R": i => rotate(i),
      "F": i => {
        ns += wpns * i
        ew += wpew * i
      }
    }
    for (const cmd of lines) {
      cmds[cmd[0]](parseInt(cmd.substr(1), 10))
    }
    console.warn(Math.abs(ns) + Math.abs(ew))
  }
})

