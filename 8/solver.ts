import { asArray } from "../util/input";
import part from "../util/part";

asArray(lines => {
  if (part === 1) {
    let location = 0
    let acc = 0
    let alreadyRan = new Set<number>()
    while(!alreadyRan.has(location)) {
      let [instruction, stringValue] = lines[location].split(' ')
      alreadyRan.add(location)
      let value = parseInt(stringValue, 10)
      switch (instruction) {
        case "acc":
          acc += value
          location++
          break
        case "jmp":
          location += value
          break
        case "nop":
          location++
          break
      }
    }
    console.warn(acc)
  } else {
    let toReplace = 0
    let found = false
    
    while(!found && toReplace < lines.length) {
      let location = 0
      let acc = 0
      let jmpOrNopCount = 0
      let alreadyRan = new Set<number>()
      while(!found && !alreadyRan.has(location)) {
        let [instruction, stringValue] = lines[location].split(' ')
        alreadyRan.add(location)
        let value = parseInt(stringValue, 10)
        if (instruction === "jmp" || instruction === "nop") {
          if (jmpOrNopCount === toReplace) {
            instruction = instruction === "jmp" ? "nop" : "jmp"
          }
          jmpOrNopCount++
        }

        switch (instruction) {
          case "acc":
            acc += value
            location++
            break
          case "jmp":
            location += value
            break
          case "nop":
            location++
            break
        }
        if (location === lines.length) {
          found = true
        }
      }
      
      if (found) {
        console.warn(acc)
      } else {
        toReplace++
      }
    }
  }
})