import React from 'react'
import * as math from './crosswordMath'

export const grid = {
  // Only Squares.
  rows: Number(process.env.Crossword_ROWS) || 10,
  cols: Number(process.env.Crossword_COLS) || 10,
}

// cantor pairs of (x,y) => unique integers.
// but not a sparse array. indices are integers starting 0.
// cantor values are values.
export let filledCells: number[] = [

]

export const fillCell = (x, y): void => {
  // Always Keep array unique.
  // easier than to make it unique with to 'set' and back, every time.
  const val: number = math.cantorPair(x, y)
  if (filledCells.indexOf(val) < 0) {
    filledCells.push(val)
    filledCells.sort((a, b) => a - b)
  }
}

export const isCellFilled = (x, y): boolean => {
  const cantor = math.cantorPair(x, y)
  return filledCells.indexOf(cantor) >= 0
}

// dont care with letter... just the position
export const letterHasNeighbors = (x: number, y: number, exceptions: []) => {
  // some coordinates below may be outside the matrix.
  // .. in which case cantor will not xist. so it is OK.

  let a = math.cantorPair(x - 1, y)
  let b = math.cantorPair(x + 1, y)
  let c = math.cantorPair(x, y + 1)
  let d = math.cantorPair(x, y - 1)
  )
}

export const wordHasNehighbors = (word: string, startX: number, startY: number, axis: string) => {
  // need 3 empty spaces for first and last letters.
  // need 2 empty spaes for letters in between

  for (let i = 0, x = startX, y = startY; i < word.length; i++) {
    if (x === startX) {

    }
    if (letterHasNeighbors(x, y)) {
      return true
    }
    if (axis === 'x') {
      x += 1
    } else {
      y += 1
    }
  }
  return false
}