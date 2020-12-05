import part from '../util/part'
import { asArray } from '../util/input'

const tree = '#';
const snow = '.';
asArray(lines => {
  if (part == 1) {
    let position = new Position()
    const hill = new Hill(lines)
    console.warn(countTrees(position, hill))
  } else {
    let result = 1
    const hill = new Hill(lines)
    const slopes = [
      [1, 1],
      [3, 1],
      [5, 1],
      [7, 1],
      [1, 2]
    ]
    for (const slope of slopes) {
      let position = new Position(slope[0], slope[1])
      result *= countTrees(position, hill)
    }
    console.warn(result)
  }
})

function countTrees(position: Position, hill: Hill) {
  let treeCount = 0
  position.move()
  let thing = hill.getAtPosition(position)
  while(thing != null ){
    // console.info(`${position.x}, ${position.y}: ${thing}`)
    if (thing === tree) {
      ++treeCount
    }
    position.move()
    thing = hill.getAtPosition(position)
  }
  return treeCount
}

class Position {
  public x: number
  public y: number

  constructor(private readonly xSlope = 3, private readonly ySlope = 1) {
    this.x = 1
    this.y = 1
  }

  move() {
    this.x += this.xSlope
    this.y += this.ySlope
  }
}

class Hill {
  constructor(private readonly rows: string[]) {
  }

  getAtPosition({x, y}: Position) {
    const row = this.rows[y - 1]
    if (!row) {
      return null
    }
    return row[(x - 1) % row.length]
  }
}