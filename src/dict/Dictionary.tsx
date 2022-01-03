import './Dictionary.scss'
import { Button } from 'react-bootstrap'
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import DictResult from './DictResult'

const Dictionary = () => {
  const placeholder = ''
  const [word, setWord] = useState('')
  const [wordToLookup, setWordToLookup] = useState('')
  // only wordToLookup changes history.
  const [history, setHistory] = useState([])

  const handleInputChange = (e) => {
    // user is typing. no search or no history-change.
    setWord(e.target.value)
  }

  const callbackLookup = (word: string)  => {
    console.log('parent callbackLookup - received workd: ', word)
    setWord(word)
    if (history[history.length - 1] !== word) {
      if (history.length > 12) {
        setHistory(history.splice(0, history.length - 12))
      }
      setHistory(history.concat([word]))
    }
    setWordToLookup(word)

    console.log('history: ', JSON.stringify(history, null, 2))
  }

  const handleLookup = (e) => {
    e.stopPropagation()
    if (!word || word.length === 0) {
      return
    }
    if (history[history.length - 1] !== word) {
      if (history.length > 12) {
        setHistory(history.splice(0, history.length - 12))
      }
      setHistory(history.concat([word]))
    }
    setWordToLookup(word)
    console.log('history', JSON.stringify(history, null, 2))
  }

  const historyString = history.map((w,ind) => {
    return <li key={ind} className="history-list__item">{ }{w}{ } &rarr; </li>
  })

  return (
    <>
        <ul className="history-list">{historyString}</ul>
        <div className="dict-query">
          <input
            type="text"
            placeholder={placeholder}
            onChange={handleInputChange}
            value={word}
          />
          <button
            type="button"
            className="search-button"
            onClick={handleLookup}
          />
        </div>
        <p className="p-gap"></p>
      {wordToLookup && <DictResult word={wordToLookup} callbackLookup={callbackLookup} />}
    </>
  )
}

export default Dictionary