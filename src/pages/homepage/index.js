import React from 'react'
import logo from 'assets/images/logo.png'
import { useNavigate } from 'react-router-dom'
import './style.scss'

const HomePage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    localStorage.setItem("start", true);
    navigate("/ranks")
  }

  return (
    <div className="container">
      <div className="homepage">
        <div className="bg"></div>
        <div className="content-area">
          <div className="title-area">
            <img src={logo} alt="title-logo" />
            <div className="title-text">Sky Angel</div>
          </div>
          <div className="action-area">
            <button className="start" onClick={handleStart}>Start Game</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage