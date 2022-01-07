import React, { useState, useEffect } from 'react'
import './Hangman.scss'
import fallbackList, { wordApiUrl } from './FallbackList'
import axios from 'axios'
import { getUniqueKey } from '../common/utils'
// <caption>&#x2639;</caption>

const Hangman = () => {

  const [status, setStatus] = useState({
    word: '',
    invalidWordToDisplay: '',
    validWordToDisplay: '',
    wastedAttempts: 0,
    gameDone: false,
    gameWon: false
  })
  const MaxAttempts = 8

  const letterClicked = ((e) => {
    const letter = e.target.value;

    // if letter not in word, update invalid string and attempts.
    if (status.word.indexOf(letter) < 0) {
      let ind = status.invalidWordToDisplay.indexOf('_');
      let invWord = status.invalidWordToDisplay
      invWord = invWord.replace('_', letter)
      setStatus({
        ...status,
        invalidWordToDisplay: invWord,
        wastedAttempts: status.wastedAttempts + 1,
      })
      return;
    }

    // letter already exists (bug. log. noop return.)
    if (status.validWordToDisplay.indexOf(letter) > 0) {
      console.log(`onClick: letter: ${letter} clicked; but Is previously selected: ${status.validWordToDisplay}`)
      return;
    }

    // yay - Omedetou. change validWordTodisplay
    let wordArray = status.word.split('')
    let displayWordArray = status.validWordToDisplay.split('')
    for (let i = 0; i < wordArray.length; i++) {
      if (wordArray[i] != letter) {
        continue
      }
      displayWordArray[i] = letter
    }
    setStatus({
      ...status,
      validWordToDisplay: displayWordArray.join('')
    })
  })

  const getNewWord = () => {
    axios.get(wordApiUrl)
      .then((result) => {
        // just get the first word from the array returned, in case requested more than 1
        let word = result.data[0]
        setStatus({
          ...status,
          word,
          invalidWordToDisplay: '_'.repeat(MaxAttempts),
          validWordToDisplay: '_'.repeat(word.length),
          wastedAttempts: 0,
        })
      })
      .catch((err) => {
        console.log(`Get word API failed: ${err}. Pull in from fallback list`)
        const ind = Math.floor(Math.random() * (fallbackList.length - 1))
        let word = fallbackList[ind]
        setStatus({
          ...status,
          word,
          invalidWordToDisplay: '_'.repeat(word.length),
          validWordToDisplay: '_'.repeat(word.length),
          wastedAttempts: 0,
        })
      })
  }

  // show entire alphabet

  const alphasArray = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm']
  const alphasElems: JSX.Element[] = []
  for (let rowInd = 0; rowInd < alphasArray.length; rowInd++) {
    const rowElems: JSX.Element[] = []
    alphasArray[rowInd].split('').map((letter) => {
      rowElems.push(
        <td key={getUniqueKey()} className='hangman__alpha'>
          <input type="button" onClick={letterClicked} value={letter} />
        </td>)
    })
    alphasElems.push(<tr>{rowElems}</tr>)
  }


  // invalid attempted letters

  // https://www.carlrippon.com/repeat-element-n-times-in-jsx/ (no below in JSX directly)
  const invalidElems: JSX.Element[] = []
  for (let i = 0; i < status.invalidWordToDisplay.length; i++) {
    invalidElems.push(<td className='hangman__alpha__invalid'>{status.invalidWordToDisplay.charAt(i)}</td>)
  }

  const validElems: JSX.Element[] = []
  for (let i = 0; i < status.validWordToDisplay.length; i++) {
    validElems.push(<td className='hangman__alpha__valid'>{status.validWordToDisplay.charAt(i)}</td>)
  }

  return (
    <div className="hangman">
      <button
        style={{ backgroundColor: 'white', border: '0', borderBottom: '1px solid lightgray', color: '#367588', cursor: 'pointer' }}
        onClick={getNewWord}>
        Next word
      </button>
      <table>
        <caption>Pick one (hide later: {status.word}</caption>
        <tbody>
          {alphasElems}
        </tbody>
      </table>
      <hr style={{ width: "100%" }} />
      <table>
        <caption>&#x2639;</caption>
        <tbody>
          <tr>
            {invalidElems}
          </tr>
        </tbody>
      </table>
      <hr style={{ width: "100%" }} />
      <table>
        <caption>&#x263A;</caption>
        <tbody>
          <tr>
            {validElems}
          </tr>
        </tbody>
      </table>
      <hr style={{ width: "100%" }} />

      <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" />
  -->
        <line x1="270" y1="270" x2="25" y2="270" strokeWidth="5" stroke="blue" />
        <line x1="25" y1="26" x2="25" y2="275" strokeWidth="5" stroke="red" />
        <line x1="25" y1="24" x2="270" y2="24" strokeWidth="5" stroke="yellow" />
        <line x1="175" y1="30" x2="175" y2="75" strokeWidth="5" stroke="green" />
        <circle cx="175" cy="75" r="20" fill="white" />
        <line x1="175" y1="95" x2="175" y2="175" strokeWidth="5" stroke="white" />

        <line x1="175" y1="100" x2="150" y2="125" strokeWidth="5" stroke="white" />
        <line x1="175" y1="100" x2="200" y2="125" strokeWidth="5" stroke="white" />

        <line x1="175" y1="150" x2="150" y2="175" strokeWidth="5" stroke="white" />
        <line x1="175" y1="150" x2="200" y2="175" strokeWidth="5" stroke="white" />

        <ellipse cx="167" cy="70" rx="4" ry="4" style={{fill:"red",stroke:"black",strokeWidth:"1"}} />
        <ellipse cx="183" cy="70" rx="4" ry="4" style={{fill:"red",stroke:"black",strokeWidth:"1"}} />

        <path d="M165,85,
          C175,75  200,75  185,85" fill="none" stroke="red" strokeWidth="1" />
      </svg>
    </div>
  )
}

export default Hangman