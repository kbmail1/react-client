import { getUniqueKey } from '../common/utils'
import './DictResult.scss'

const DictResultGeneral = (props) => {
  const genData = props.genData
  return (
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
  )
}

export default DictResultGeneral