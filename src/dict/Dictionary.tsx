import './Dictionary.scss'
import { Button } from 'react-bootstrap'
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import DictReactResult from './DictReactResult'

const Dictionary = () => {
  const placeholder = ''
  const [word, setWord] = useState('')
  const [wordToLookup, setWordToLookup] = useState('')

  const handleInputChange = (e) => {
    setWord(e.target.value)
  }
  const handleLookup = (e) => {
    e.stopPropagation()
    if (!word || word.length === 0) {
      return
    }
    setWordToLookup(word)
  }

  return (
    <>
        <h1>Dictionary</h1>
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
        {wordToLookup && <DictReactResult word={wordToLookup} />}
    </>
  )
}

export default Dictionary