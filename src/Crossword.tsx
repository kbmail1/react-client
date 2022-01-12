'use strict'

import process from 'process'
import React, { useState } from 'react'
import { getUniqueKey } from './common/utils'
import { grid } from './crosswordState'
import './Crossword.scss'
import Banner from './common/Banner'
import { last } from 'lodash'

const Crossword = () => {
  const arr = Array(grid.rows * grid.cols).fill(<div>&nbsp;</div>)
  const [lastError, setLastError] = useState({
    isError: false,
    config: {
      title: '',
      subTitle: '',
      message: '',
      severity: '',
      totalDuration: 0,
    }
  })

  const xy2Id = (x: number, y: number): number => {
    const id = (grid.cols * y) + x
    console.log(id)
    return id
  }

  const id2XY = ((id: number): [number, number] => {
    const x = id % grid.rows
    const y = Math.floor(id / grid.cols)
    return [x, y]
  })

  const placeWord = ((word: string, x: number, y: number, axis: string) => {
    for (let wordInd = 0; wordInd < word.length; wordInd++) {
      const id = xy2Id(x, y)

      const elem = document.getElementById('' + id)
      if (elem) {
        elem.innerHTML = '<span class="red">' + word[wordInd] + '</span>'
      } else {
        setLastError({
          isError: true,
          config: {
            title: `placeWord: HTML ID Not found`,
            subTitle: `id: (${id}) innerHTML: (${word[wordInd]})`,
            message: `in placeWord: word/x/y/axis: ${word}/${x}/${y}/${axis}`,
            severity: `error`,
            totalDuration: 20,
          }
        })
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
    const [x, y] = id2XY(id)
    console.log(`handleClick: x/y: ${x}/${y}}`)
    // placeWord('Hello', x, y, 'x')

    placeWord('elephant', 0, 0, 'x')
    placeWord('ear', 4, 1, 'y')
    placeWord('rotate', 4, 3, 'x')
    placeWord('turbine', 6, 3, 'y')
    placeWord('fiance', 1, 0, 'y')
    placeWord('him', 5, 7, 'x')
    placeWord('scary', 3, 5, 'x')

    placeWord('lotion', 1, 0, 'y')
    placeWord('so', 2, 6, 'x')
    placeWord('lob', 0, 4, 'x')
    placeWord('engine', 9, 3, 'y')
    //
  })

  return (
    <>
      <div> This is &quot;Crossword&quot; page - ({arr.length})</div>
      {
        lastError.isError &&
        < Banner config={lastError.config} />
      }
      <div className="grid-container">
        {arr.map((x, ind) => {
          let [x_coord, y_coord] = id2XY(ind)
          let txt = <span style={{ fontSize: 'x-small' }}>
            {String(x_coord) + ',' + String(y_coord)}
          </span>

          return (
            <div key={getUniqueKey()}><span onClick={handleClick} id={'' + ind} className="cell-content'">{txt}</span></div>
          )
        })}
      </div>
    </>
  )
}

export default Crossword
