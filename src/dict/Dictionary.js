import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import './Dictionary.scss'
import { Button } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'
import DictReactResultContainer from './DictReactResultContainer'
const Dictionary = (props) => {
  const [word, setWord] = useState('')
  const [choices, setChoices] = useState([])
  const [wordInfo, setWordInfo] = useState({})
  console.log(`Dictionary, props: ${[...Object.keys(props)]}`)
  const handleChoiceClicked = (event) => {
    const name = event.target.name
    const isChecked = event.target.checked
    if (isChecked) {
      choices?.push(name)
      const set = new Set(choices)
      setChoices([...set])
    } else {
      const index = choices.indexOf(name)
      if (index !== -1) {
        choices.splice(name, 1)
        setChoices(choices)
      }
    }
    console.log('updated-choices: ', choices)
  }
  const restHandleSubmit = (e) => {
    // TODO: confirm if necessary...
    e.stopPropagation() // and preventDefault()?
    console.log('*****', word)
    if (!word || word.trim().length === 0) {
      // TODO show warning.
      console.log('Enter a word to look up ...')
    } else {
      console.log('----- word is', word)
      axios.get(`http://localhost:8081/rest/word/${word}`).then((result) => {
        console.log(result.data)
        setWordInfo(result.data)
        console.log('------end-----')
      })
    }
  }
  return _jsxs(
    'div',
    {
      className: 'dict-query',
      children: [
        _jsxs(
          'div',
          {
            className: 'dict-choices',
            children: [
              _jsx(
                'div',
                {
                  children: _jsx(
                    'input',
                    {
                      type: 'text',
                      placeholder: 'Word',
                      value: word,
                      onChange: (e) => setWord(e.target.value),
                    },
                    void 0
                  ),
                },
                void 0
              ),
              _jsxs(
                'div',
                {
                  children: [
                    _jsxs(
                      'div',
                      {
                        className: 'dict-choice',
                        children: [
                          _jsx(
                            'input',
                            {
                              name: 'sentence',
                              type: 'checkbox',
                              onChange: handleChoiceClicked,
                            },
                            void 0
                          ),
                          _jsx(
                            'label',
                            {
                              htmlFor: 'props.choice',
                              children: 'Example usage',
                            },
                            void 0
                          ),
                        ],
                      },
                      void 0
                    ),
                    _jsxs(
                      'div',
                      {
                        className: 'dict-choice',
                        children: [
                          _jsx(
                            'input',
                            {
                              name: 'synonyms',
                              type: 'checkbox',
                              onChange: handleChoiceClicked,
                            },
                            void 0
                          ),
                          _jsx(
                            'label',
                            { htmlFor: 'props.choice', children: 'synonyms' },
                            void 0
                          ),
                        ],
                      },
                      void 0
                    ),
                    _jsxs(
                      'div',
                      {
                        className: 'dict-choice',
                        children: [
                          _jsx(
                            'input',
                            {
                              name: 'antonyms',
                              type: 'checkbox',
                              onChange: handleChoiceClicked,
                            },
                            void 0
                          ),
                          _jsx(
                            'label',
                            { htmlFor: 'props.choice', children: 'antonyms' },
                            void 0
                          ),
                        ],
                      },
                      void 0
                    ),
                    _jsx(
                      Button,
                      {
                        name: 'submit',
                        className: `dict-choice dict-choice__submit`,
                        onClick: restHandleSubmit,
                        children: 'Submit REST Query',
                      },
                      void 0
                    ),
                  ],
                },
                void 0
              ),
            ],
          },
          void 0
        ),
        _jsx(
          'div',
          {
            className: 'dict-results__container',
            children: _jsx(
              DictReactResultContainer,
              { word: word, wordInfo: wordInfo },
              void 0
            ),
          },
          void 0
        ),
      ],
    },
    void 0
  )
}
export default Dictionary
//# sourceMappingURL=Dictionary.js.map
