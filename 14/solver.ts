import { sum, range } from "lodash";
import { asArray } from "../util/input";
import part from "../util/part";

interface Mask {
  and: bigint,
  or: bigint
}

asArray(lines => {
  if (part === 1) {
    let andMask = BigInt(parseInt("1".repeat(36), 2))
    let orMask = 0n
    let memory = [0n]
    
    for (const line of lines) {
      const [left, right] = line.split(' = ')
      if (left === "mask") {
        // console.info(line)
        andMask = BigInt(parseInt(right.replace(/X/g, "1"), 2))
        orMask = BigInt(parseInt(right.replace(/X/g, "0"), 2))
        // console.info(`setting andMask to ${andMask} and orMask to ${orMask}`)
      } else {
        let address = parseInt(left.match(/\[(\d+)\]/)![1]!, 10)
        let value = BigInt(parseInt(right, 10)) & andMask | orMask
        // console.info(`writing ${value} to ${address}`)
        memory[address] = value
      }
    }
    console.warn(sum(memory))
  } else {
    let memory = new Map<bigint, bigint>()
    let orMask = 0n
    let andMasks = [BigInt(parseInt("1".repeat(36), 2))]
    for (const line of lines) {
      const [left, right] = line.split(' = ')
      if (left === "mask") {
        orMask = BigInt(parseInt(right.replace(/X/g, "1"), 2))
        andMasks = Array.from(right.matchAll(/X/g)).map(match => {
          return BigInt(parseInt(Array.from(right).map((s, i) => i === match.index ? "0" : "1").join(""), 2))
        })
        // console.info(`masks: orMask, ${andMasks}`)
      } else {
        let address = BigInt(parseInt(left.match(/\[(\d+)\]/)![1]!, 10)) | orMask
        let value = BigInt(parseInt(right, 10))

        const setAllVariations = (nextAddress: bigint, index = 0) => {
          // console.info(`setting ${nextAddress} = ${value}`)
          memory.set(nextAddress, value)
          if (index < andMasks.length) {
            let andMask = andMasks[index]
            setAllVariations(nextAddress & andMask, index + 1)
            setAllVariations(nextAddress, index + 1)
          }
        }

        setAllVariations(address)
      }
    }
    console.warn(sum(Array.from(memory.values())))
  }
})
