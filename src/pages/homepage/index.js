import React from 'react'
import logo from 'assets/images/logo.png'
import { useNavigate } from 'react-router-dom'
import './style.scss'

const HomePage = () => {
  const navigate = useNavigate();

  const handleAction = (act) => {
    if (act === 'start') {
      localStorage.setItem("start", true);
      navigate("/ranks")
    } else {
      navigate("/tutorial")
    }
  }

  return (
    <div className="container">
      <div className="homepage" style={{ height: window.innerHeight < 768 ? "100%" : 768 }}>
        <div className="bg"></div>
        <div className="content-area">
          <div className="title-area">
            <img src={logo} alt="title-logo" />
            <div className="title-text">Sky Angel</div>
          </div>
          <div className="action-area">
            <button className="start" onClick={() => handleAction('start')}>Start Game</button>
            <button className="how" onClick={() => handleAction('how')}>How To</button>
          </div>
        </div>
        <div className="copyright">
          made with
          <span> &#10084; </span> by
          ardanclassic
        </div>
      </div>
    </div>
  )
}

export default HomePage