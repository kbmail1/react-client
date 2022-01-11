'use strict'

import process from 'process'
import React from 'react'
import { getUniqueKey } from './common/utils'
import './PWA.scss'

const grid = {
  // Only Squares.
  rows: Number(process.env.PWA_ROWS) || 10,
  cols: Number(process.env.PWA_COLS) || 10,
}

export const GridContext = React.createContext({
  grid,
})

const PWA = () => {
  const arr = Array(grid.rows * grid.cols).fill(<div>&nbsp;</div>)

  const rowcol2Id = (row: number, col: number): number => {
    const id = (grid.rows * row) + col
    console.log(id)
    return id
  }

  const id2Rowcol = ((id: number): [number, number] => {
    const row = Math.floor(id / grid.rows)
    const col = id % grid.cols
    return [row, col]
  })

  const placeLetterOnRowcol = ((row: number, col: number, letter: string) => {
    console.log(letter)
    const id = Number(rowcol2Id(row, col))
  })

  const placeWordByRowcol = ((row: number, col: number, word: string, dimension: string) => {
    if (dimension !== 'x' && dimension !== 'y') {
      dimension = 'x'
    }
    const startId = rowcol2Id(row, col)
    console.log(`placeWordByRowcol: startId: ${startId}`)

    // ASSUME word fits

    // for 'x' - increment ids by 1.
    if (dimension === 'x') {
      for (let letterIndex = 0, id = startId; id < startId + word.length; id++, letterIndex++) {
        console.log(`placeWordByRowcol: in for(): id${id}`)
        const elem = document.getElementById('' + id)
        if (elem) {
          console.log(`placeWordByRowcol: in if(): placing letter ${word[id - startId]} at id: ${id}`)
          elem.innerHTML = '<span class="green">' + word[letterIndex] + '</span>'
          elem.classList.add('red')
        } else {
          console.log(`placeWordByRowcol: else (): no place with id: ${id}`)
        }
      }
    } else {
      // for 'y' - increment by 'grids.col that is 10.'
      const inc = grid.rows; // TODO: This works only for SQUARE GRIDS.
      for (let letterIndex = 0, id = startId; id < startId + (word.length * inc); id += inc, letterIndex++) {
        console.log(`placeWordByRowcol: in for(): id: ${id}`)
        const elem = document.getElementById('' + id)
        if (elem) {
          console.log(`placeWordByRowcol: in if(): placing letter ${word[id - startId]} at id: ${id}`)
          elem.innerHTML = '<span class="navy">' + word[letterIndex] + '</span>'
        } else {
          console.log(`placeWordByRowcol: else (): no place with id: ${id}`)
        }
      }


    }
  })

  const handleClick = ((e) => {
    e.preventDefault()
    const id = Number(e.target.id)
    console.log('handleClick: id: ', id)
    const [row, col] = id2Rowcol(id)
    console.log(`row/col: ${row}, ${col}}`)
    placeWordByRowcol(row, col, 'Hello', 'x')
  })

  return (
    <GridContext.Provider value={{ grid }} >
      {arr.length}
      <div> This is &quot;PWA&quot; page </div>
      <div className="grid-container">
        {arr.map((x, ind) => {
          return (
            <div key={getUniqueKey()}><span onClick={handleClick} id={'' + ind} className="cell-content'">{ind}</span></div>
          )
        })}
      </div>
    </GridContext.Provider>
  )
}

export default PWA
