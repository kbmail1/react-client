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
    const id = (grid.cols * col) + row
    console.log(id)
    return id
  }

  const id2Rowcol = ((id: number): [number, number] => {
    const row = id % grid.rows
    const col = Math.floor(id / grid.cols)
    return [row, col]
  })

  const placeLetterOnRowcol = ((row: number, col: number, letter: string) => {
    console.log(letter)
    const id = Number(rowcol2Id(row, col))
  })

  const placeWord = ((word: string, row: number, col: number, axis: string) => {
    let [x, y] = [row, col]

    for (let wordInd = 0; wordInd < word.length; wordInd++) {
      const id = rowcol2Id(x, y)

      const elem = document.getElementById('' + id)
      if (elem) {
        elem.innerHTML = '<span class="green">' + word[wordInd] + '</span>'
      } else {
        console.log(`Error: placeWordByRowcol: else (): no place with id: ${id}`)
        return
      }

      if (axis === 'x') {
        x++
      } else {
        y++
      }
    }
  })

  const handleClick = ((e) => {
    e.preventDefault()
    const id = Number(e.target.id)
    console.log('handleClick: id: ', id)
    const [row, col] = id2Rowcol(id)
    console.log(`handleClick: row/col: ${row}/${col}}`)
    placeWord('Hello', row, col, 'x')
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
