import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllPlayers } from 'services/players';
import { usePlayerStore, useStatusStore } from 'zuu'
import { ResetGame } from 'utils/helper';
import birds from 'assets/images/3birds.gif'
import './style.scss'

const Rankings = () => {
  const navigate = useNavigate();
  const [players, setplayers] = useState([])
  const [status, setstatus] = useState(true)
  const { resetLife, resetTime, resetScore } = useStatusStore();
  const { resetPlayer } = usePlayerStore();
  const statedata = { resetPlayer, resetLife, resetTime, resetScore };

  useEffect(() => {
    ResetGame(statedata)
    const checkstatus = localStorage.getItem("start")
    if (checkstatus) {
      setstatus(true);
      setTimeout(() => {
        localStorage.clear();
        navigate("/game")
      }, 4000);
    } else {
      setstatus(false)
    }

    getAllPlayers().then(res => setplayers(res))
  }, [])

  const ShowContent = () => {
    if (players?.length > 0) {
      return (
        <div className="content-area">
          <div className="title">Top 10 Pilot Rankings</div>
          <table className="table-rank">
            <thead>
              <tr className="head">
                <th>Rank</th>
                <th>Name</th>
                <th>Stars</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, i) => {
                return (
                  <tr key={i} className="data">
                    <td className="rank">{i + 1}</td>
                    <td className="name">{player.name}</td>
                    <td className="stars">{player.stars}</td>
                    <td className="time">{player.time}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )
    } else {
      return (
        <div className="loading-content">
          <img src={birds} alt="load" />
        </div>
      )
    }
  }

  const ShowActionButton = () => {
    if (status) {
      return (
        <div className="action-area">
          <div className="loading-text">initializing game . . .</div>
        </div>
      )
    } else {
      return (
        <div className="action-area">
          <button className="action back" onClick={() => navigate("/")}>Back to Home</button>
          <button className="action start" onClick={() => navigate("/game")}>Restart Game</button>
        </div>
      )
    }
  }

  return (
    <div className="container">
      <div className="rankings" style={{ height: window.innerHeight < 768 ? "100%" : 768 }}>
        <div className="bg"></div>
        <ShowContent />
        <ShowActionButton />
      </div>
    </div>
  )
}

export default Rankings