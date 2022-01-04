import React, { useEffect, useState } from 'react'
import { InternalSymbolName } from 'typescript';
import './Banner.scss'

const Banner = (props) => {
  const [secondsLeft, setSecondsLeft] = useState(props.config.totalDuration)

  let intervalHandler;
  useEffect(() => {
    intervalHandler = setInterval(() => {
      console.log(`setInterval useeffect`)
      setSecondsLeft(secondsLeft - 1)
    }, 1000)

    return () => clearInterval(intervalHandler)
  })

  console.log(`1. bannerConfig props: ${JSON.stringify(props.config, null, 2)}`)

  const onKeyPress = ((e) => {
    if (e.target.value === 'Enter') {
      clearInterval(intervalHandler)
      setSecondsLeft(0)
    }
  })

  const handleClickOnCloseBanner = (e) => {
    clearInterval(intervalHandler)
    setSecondsLeft(0)
  }

  let bannerClass = 'banner-box__info';
  if (props.config.severity.toLowerCase().indexOf('error') >= 0) {
    bannerClass = 'banner-box__error'
  } else if (props.config.severity.toLowerCase().indexOf('warn') >= 0) {
    bannerClass = 'banner-box__warn'
  } else if (props.config.severity.toLowerCase().indexOf('info') >= 0) {
    bannerClass = 'banner-box__info'
  } else if (props.config.severity.toLowerCase().indexOf('success') >= 0) {
    bannerClass = 'banner-box__success'
  }

  // https://stackoverflow.com/questions/34521797/how-to-add-multiple-classes-to-a-reactjs-component
  const classes = `${bannerClass}`

  if (secondsLeft < 0) {
    return <></>
  }
  return (
    <div className={classes}>
      <span className="banner-box__title">{props.config.title}</span>
      <hr />
      <span className="banner-box__subtitle">{props.config.subTitle}</span>
      <span className="banner-box__description">{props.config.message}</span>

      <div
        className="banner-box__x"
        role="button"
        onClick={handleClickOnCloseBanner}
        onKeyPress={(e) => { e.key === 'Enter' ? setSecondsLeft(0) : undefined }}
        tabIndex={0}
      >
        {'\u2715'}
      </div>
    </div>
  )
}

export default Banner
