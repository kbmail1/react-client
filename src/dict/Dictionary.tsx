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
  const [history, setHistory] = useState<string[]>([])

  const handleInputChange = (e) => {
    // user is typing. no search or no history-change.
    setWord(e.target.value)
  }

  const callbackLookup = (word: string) => {
    console.log('parent callbackLookup - received workd: ', word)
    setWord(word)

    // remove redundant strings.

    if (history[history.length - 1] !== word) {
      // update history
      if (history.length > 12) {
        setHistory(history.splice(0, history.length - 12))
      }
      // add the new one at the end, if its not the same at the immediate previous one.
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

  const historyString = history.map((w, ind) => {
    return (
      <li key={ind} className="history-list__item">
        <button className='history-list__item__link'
          style={{ backgroundColor: 'white', border: '0', borderBottom: '1px solid lightgray', color: '#367588', cursor: 'pointer' }}
          onClick={() => callbackLookup(w)}
        >
        { }{w}{ }
        </button>
      </li>
    )
  })

  return (
    <div className='dict-container'>
      <h1>Dictionary</h1>
      <ul className={`${history.length > 0 ? "history-list" : "display-none"}`}>{historyString}</ul>
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
    </div>
  )
}

export default Dictionary