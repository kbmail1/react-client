import './DictResult.scss'
import { useQuery, gql } from '@apollo/client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { getUniqueKey } from '../common/utils'

const DictResult = ({ word, callbackLookup }) => {
  const [genData, setGenData] = useState({
    error: '',
    word: '',
    phonetic: '',
    text: '',
    audio: '',
    origin: '',
  })

  const [details, setDetails] = useState<any[]>([])

  if (!word || !(typeof word === 'string') || word.trim().length === 0) {
    console.log('invalid request.  skipping the loopup')
  }

  const restUrl = `https://localhost:8888/dict/${word}`
  useEffect(() => {
    axios
      .get(restUrl)
      .then((res) => {
        if (res.data.error !== '') {
          console.log(`Error: get from ${restUrl} failed. Error: ${res.data.error}`)
          return
        }
        // console.log('two', JSON.stringify(res.data, null, 2))
        setGenData({
          error: '',
          word: res.data.word,
          phonetic: res.data.word,
          origin: res.data.origin,
          text: res.data.phonetics[0].text,
          audio: res.data.phonetics[0].audio,
        })
        const detailInfo = res.data.meanings.map((meaning) => {
          const partOfSpeech = meaning?.partOfSpeech
          const definitions = meaning?.definitions.map((def) => {
            return {
              definition: def.definition || '',
              example: def.example || '',
              synonyms: def.synonyms || [],
              antonyms: def.antonyms || [],
            }
          })
          return { partOfSpeech, definitions }
        })
        console.log('three.1', JSON.stringify(details, null, 2))
        setDetails(detailInfo)

        /*
        // flatten - No. then we get each of the N nouns as a seprate 'thing'.
        // ... all nounns should be 'clustered under 'noun' same with other parts of Speech.
        // const details = ([] as string[]).concat(...nestedDetails)
        // console.log(details)
        */
      })
      .catch((err) => {
        console.log(`Error: get from ${restUrl} failed. Error: ${err}`)
      })
  }, [restUrl, word])

  // console.log(`three.2: ${JSON.stringify(details, null, 2)}`)

  const generalInfo =
    <>
      <h2>General Information</h2>
      <div className="dict-table">
        <div className="dict-table-body">

          <div key={getUniqueKey()} className="dict-table-row">
            <div className="dict-table-cell">word</div>
            <div className="dict-table-cell">{genData.word}</div>
          </div>
          <div key={getUniqueKey()} className="dict-table-row">
            <div className="dict-table-cell">phonetic</div>
            <div className="dict-table-cell">{genData.phonetic}</div>
          </div>
          <div key={getUniqueKey()} className="dict-table-row">
            <div className="dict-table-cell">origin</div>
            <div className="dict-table-cell">{genData.origin}</div>
          </div>
          <div key={getUniqueKey()} className="dict-table-row">
            <div className="dict-table-cell">text</div>
            <div className="dict-table-cell">{genData.text}</div>
          </div>
          <div key={getUniqueKey()} className="dict-table-row">
            <div className="dict-table-cell">audio</div>
            <div className="dict-table-cell">{genData.audio}</div>
          </div>
        </div>
      </div>
    </>

  let reactElements = [generalInfo]
  // TODO: line 131 - needs KEY prop for li.
  details.map((meanings, ind1) => {
    reactElements.push(<h2>{meanings.partOfSpeech}(s)</h2>)
    meanings.definitions.map((def, ind2) => {
      console.log('keyx: ' + meanings.partOfSpeech + ind1 + ind2)

      reactElements.push(
        <div key={getUniqueKey()} className="dict-table" style={{ marginBottom: '20px' }}>
          <div className="dict-table-body">
            <div className="dict-table-row">
              <div className="dict-table-cell"><b>definition {ind2 + 1}</b></div>
              <div className="dict-table-cell">{def.definition}</div>
            </div>
            <div className="dict-table-row">
              <div className="dict-table-cell">example</div>
              <div className="dict-table-cell">{def.example}</div>
            </div>
            <div className="dict-table-row">
              <div className="dict-table-cell">synonyms</div>
              <div className="dict-table-cell">
                <ul style={{ listStyle: 'none' }}>
                  {
                    def.synonyms.map((s) => {
                      console.log('s is: ', s);
                      console.log('s when split is: ', s.split(' '));
                      return (
                        <li key={getUniqueKey()}>
                          {
                            s.split(' ').map((oneWordInS) => {
                              return (
                                <span>
                                  <button
                                    style={{ backgroundColor: 'white', border: '0', borderBottom: '1px solid lightgray', color: '#367588', cursor: 'pointer' }}
                                    onClick={() => callbackLookup(oneWordInS)}
                                  >
                                    {oneWordInS}
                                  </button>
                                </span>
                              )
                            })
                          }
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
            <div className="dict-table-row">
              <div className="dict-table-cell">antonyms</div>
              <div className="dict-table-cell">
                <ul style={{ listStyle: 'none' }}>

                {
                    def.antonyms.map((a) => {
                      console.log('a is: ', a);
                      console.log('a when split is: ', a.split(' '));
                      return (
                        <li key={getUniqueKey()}>
                          {
                            a.split(' ').map((oneWordInA) => {
                              return (
                                <span>
                                  <button
                                    style={{ backgroundColor: 'white', border: '0', borderBottom: '1px solid lightgray', color: '#367588', cursor: 'pointer' }}
                                    onClick={() => callbackLookup(oneWordInA)}
                                  >
                                    {oneWordInA}
                                  </button>
                                </span>
                              )
                            })
                          }
                        </li>
                      )
                    })
                  }

                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    })
  })

  return (
    <div className='dict-table-container'>
      {[...reactElements]}
    </div>
  )
}

export default DictResult
        // <!-- <div className="accordion">{accordBars}</div> -->