import React, { useState, useEffect } from 'react'
import './Hangman.scss'

const Hangman = () => {
  const [avail, setAvail] = useState([
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't u', 'v', 'w. x', 'y', 'z'
  ])
  const [invalids, setInvalids] = useState([])
  const [valids, setValids] = useState([])
  const [attempts, ssetAttempts] = useState([])
  const MaxAttempts = 12

  return (
    <div className="hangman">
      <table>
        <caption><h3>Pick</h3></caption>
        <tbody>
          <tr>
            <td className='hangman__alpha'>a</td>
            <td className='hangman__alpha'>b</td>
            <td className='hangman__alpha'>c</td>
            <td className='hangman__alpha'>d</td>
            <td className='hangman__alpha'>e</td>
            <td className='hangman__alpha'>f</td>
            <td className='hangman__alpha'>g</td>
            <td className='hangman__alpha'>h</td>
          </tr>
          <tr>
            <td className='hangman__alpha'>i</td>
            <td className='hangman__alpha'>j</td>
            <td className='hangman__alpha'>k</td>
            <td className='hangman__alpha'>l</td>
            <td className='hangman__alpha'>m</td>
            <td className='hangman__alpha'>n</td>
            <td className='hangman__alpha'>o</td>
            <td className='hangman__alpha'>p</td>
          </tr>
          <tr>
            <td className='hangman__alpha'>q</td>
            <td className='hangman__alpha'>r</td>
            <td className='hangman__alpha'>s</td>
            <td className='hangman__alpha'>t</td>
            <td className='hangman__alpha'>u</td>
            <td className='hangman__alpha'>v</td>
            <td className='hangman__alpha'>w</td>
            <td className='hangman__alpha'>x</td>
          </tr>
          <tr>
            <td className='hangman__alpha'>y</td>
            <td className='hangman__alpha'>z</td>
          </tr>
        </tbody>
      </table>

      <table>
        <caption><h1 style={{fontSize:'40px'}}>&#x2639;</h1></caption>
        <tbody>
          <tr>
            <td className='hangman__alpha__invalid'>_</td>
            <td className='hangman__alpha__invalid'>_</td>
            <td className='hangman__alpha__invalid'>_</td>
            <td className='hangman__alpha__invalid'>_</td>
            <td className='hangman__alpha__invalid'>_</td>
            <td className='hangman__alpha__invalid'>_</td>
            <td className='hangman__alpha__invalid'>_</td>
            <td className='hangman__alpha__invalid'>_</td>
          </tr>
        </tbody>
      </table>
      <table>
        <caption><h1 style={{fontSize:'40px'}}>&#x263A;</h1></caption>
        <tbody>
          <tr>
            <td className='hangman__alpha'>_</td>
            <td className='hangman__alpha'>_</td>
            <td className='hangman__alpha'>_</td>
            <td className='hangman__alpha'>_</td>
            <td className='hangman__alpha'>_</td>
            <td className='hangman__alpha'>_</td>
            <td className='hangman__alpha'>_</td>
            <td className='hangman__alpha'>_</td>
          </tr>
        </tbody>
      </table>

      <div>
        This is &quot;Hangman&quot; page
      </div>
    </div>
  )
}

export default Hangman