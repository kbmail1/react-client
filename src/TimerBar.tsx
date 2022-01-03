import { useState } from 'react'

const TimerBar = (props) => {
  const [state, setState] = useState({
    seconds: props.seconds,
  })

  return <div className="bar"></div>
}

export default TimerBar
