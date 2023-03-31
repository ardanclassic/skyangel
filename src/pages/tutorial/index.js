import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import wasd from 'assets/images/wasd.png'
import arrowkeys from 'assets/images/arrowKeys.png'
import spacebar from 'assets/images/spacebar.png'
import './style.scss'

const Tutorial = () => {
  const navigate = useNavigate();

  useEffect(() => {

  }, [])

  const ShowContent = () => {
    return (
      <div className="content-area">
        <div className="title">Keyboard Control</div>
        <div className="subtitle">take control of the plane and avoid the damn red birds!</div>
        <div className="tutorial-box movement">
          <div className="desc">Player Movement</div>
          <img src={wasd} alt="wasd" />
          <img src={arrowkeys} alt="arrowkeys" />
        </div>
        <div className="tutorial-box pause">
          <div className="desc">Pause Game</div>
          <img src={spacebar} alt="spacebar" />
        </div>
      </div>
    )
  }

  const ShowActionButton = () => {
    return (
      <div className="action-area">
        <button className="action back" onClick={() => navigate("/")}>Back to Home</button>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="tutorial">
        <div className="bg"></div>
        <ShowContent />
        <ShowActionButton />
      </div>
    </div>
  )
}

export default Tutorial