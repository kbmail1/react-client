import { getUniqueKey } from "../common/utils";
import React from 'react'

import './DictResult.scss'

const DictResultRelatedWords = (props) => {

  // if one synonym has two words, each must be separately
  // .. linked and searchable in dict, in turn.
  return (
    <li key={getUniqueKey()}>
      {
        props.phrase.split(' ').map((oneWordInS) => {
          <>
            <span>
              <button
                style={{ background: 'none', border: '0', borderBottom: '1px solid lightgray', color: '#367588', cursor: 'pointer' }}
                onClick={() => props.callback(oneWordInS)}
              >
                {oneWordInS}
              </button>
            </span>
            &nbsp;
          </>
        })
      }
    </li>


  )
}

export default DictResultRelatedWords