import React, { useState } from 'react'
import Swal from 'sweetalert2'
import './style.scss'

export const PausedHTML = ({ action }) => {
  return (
    <div className="paused-area">
      <div className="title">Paused!</div>
      <div className="action-area">
        <button autoFocus className='continue' onClick={() => action('continue')}>Continue</button>
        <button className='restart' onClick={() => action('restart')}>Restart</button>
        <button className='quit' onClick={() => action('quit')}>Quit</button>
      </div>
    </div>
  )
}

export const GameOverHTML = ({ score, time, action }) => {
  const [nickname, setnickname] = useState()
  const [error, seterror] = useState()

  const handleAction = (type) => {
    if (type === "sendlink") {
      seterror();
      if (nickname) {
        action("sendlink", nickname)
      } else {
        seterror("nickname required!")
      }
    } else {
      action(type)
    }
  }

  return (
    <div className="gameover-area">
      <div className="title">Game Over!</div>
      <div className="content">
        <div className="text">your achievement</div>
        <div className="boxstatus">
          <div className="box score">
            <div className="label">score</div>
            <div className="value">{score}</div>
          </div>
          <div className="box time">
            <div className="label">survive time</div>
            <div className="value">{time}</div>
          </div>
        </div>
        <div className="sendbox">
          <input type="text" name="nickname" placeholder="input your nickname" onChange={(e) => setnickname(e.target.value)} />
          {error && <div className="error-message">{error}</div>}
          <div className="sendlink" onClick={() => handleAction('sendlink')}>see your ranks!</div>
        </div>
      </div>
      <div className="action-area">
        <button className='restart' onClick={() => handleAction('restart')}>Restart</button>
        <button className='quit' onClick={() => handleAction('quit')}>Quit</button>
      </div>
    </div>
  )
}