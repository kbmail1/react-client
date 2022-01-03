/*
  const [pgbarUpdates, setPgbarUpdates] = useState(
    ... const widthPc = (100 * pgbarUpdates) / myProps.totalDuration
  )
*/

import React, { useEffect, useState } from 'react'
import './Banner.scss'

export const enum BannerSeverity {
  Error = 1,
  Warn,
  Info,
  Success,
}
const images = {
  [BannerSeverity.Error]: './resources/images/banner_error',
  [BannerSeverity.Warn]: './resources/images/banner_warn',
  [BannerSeverity.Info]: './resources/images/banner_info',
  [BannerSeverity.Success]: './resources/images/banner_success',
}

export interface IBannerConfig {
  title: string
  subTitle: string
  message: string
  severity: BannerSeverity
  totalDuration: number
  updateFrequency: number
}

// =======================
// === React Component ===
// =======================

/*  props:config, callback, width */
const Banner = (props) => {
  const totalUpdates = props.config.totalDuration / props.config.updateFrequency
  const [updatesLeft, setUpdatesLeft] = useState(totalUpdates)

  useEffect(() => {
    const handle = setInterval(() => {
      console.log(`setInterval useeffect`)

      setUpdatesLeft(updatesLeft - 1)
      console.log(`setInterval updatesLeft: ${updatesLeft}`)
      console.log(`setInterval totalUpdates: ${totalUpdates}`)

      const widthPercent = (100 * updatesLeft) / totalUpdates
      console.log(`setInterval widthPercent: ${widthPercent}`)
      if (widthPercent > 0) {
        console.log('true')
        props.callback(true, widthPercent)
      } else {
        console.log('false')
        props.callback(false, 0)
      }
    }, props.config.updateFrequency * 1000)
    return () => clearInterval(handle)
  }) // no dependancies. run at mount time to set the setInterval method.

  console.log(`1. bannerConfig props: ${JSON.stringify(props.config, null, 2)}`)

  const handleClickOnCloseBanner = (e) => {
    console.log(`close click`)
    props.callback(false, 0)
  }
  const handleKeyPressOnCloseBanner = (e) => {
    if (e.key === 'Enter') {
      console.log(`key press handler: ${e.key}`)
      props.callback(false, 0)
    } else {
      console.log(`[not enter key.  no action] key press handler: ${e.key}`)
    }
  }

  const imageSrc = images[props.config.severity]
  console.log(`imgsrc:${imageSrc}`)

  // dynamic width style
  const barWidth = {
    width: 100 - +props.width + '%',
  }

  let bgImage = './resources/images/banner-info.svg'
  if (props.config.severity === BannerSeverity.Error) {
    bgImage = './resources/images/banner-error.svg'
  } else if (props.config.severity === BannerSeverity.Warn) {
    bgImage = './resources/images/banner-error.svg'
  } else if (props.config.severity === BannerSeverity.Success) {
    bgImage = './resources/images/banner-success.svg'
  } else {
    bgImage = './resources/images/banner-info.svg'
  }

  const bgImageProp = {
    backgroundImage: 'url(' + bgImage + ');',
  }

  // <!<div className="banner-box" style={bgImageProp}>
  return (
    <div className="banner-box">
      <span className="banner-box__title">{props.config.title}</span>
      <hr />
      <span className="banner-box__subtitle">{props.config.subTitle}</span>
      <span className="banner-box__description">{props.config.message}</span>

      <div className="banner-box__timerbar-container">
        <div className="banner-box__timer-text">{props.width}</div>
        <div id="timerbar" className="banner-box__timer-bar" style={barWidth} />
      </div>
      <div
        className="banner-box__x"
        role="button"
        onClick={handleClickOnCloseBanner}
        onKeyPress={handleKeyPressOnCloseBanner}
        tabIndex={0}
      >
        {'\u2715'}
      </div>
    </div>
  )
}

export default Banner
