import React, { useEffect } from 'react'
import { usePlayerStore, useStatusStore } from 'zuu'
import { GameOverHTML, PausedHTML } from 'components/popup';
import { useNavigate } from 'react-router-dom';
import { ResetGame } from 'utils/helper';
import { addPlayer } from 'services/players';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './style.scss'

const ReactSwal = withReactContent(Swal)

const StatusBar = () => {
  const navigate = useNavigate();
  const { life, time, score, pause, increaseTime, reduceLife, updatePause, resetLife, resetTime, resetScore } = useStatusStore();
  const { resetPlayer } = usePlayerStore();
  const statedata = { resetPlayer, resetLife, resetTime, resetScore }

  const showPausePopup = () => {
    ReactSwal.fire({
      html: <PausedHTML action={(res) => {
        if (res === 'continue') updatePause()
        else if (res === 'restart') ResetGame(statedata)
        else navigate("/")

        Swal.close()
      }} />,
      focusConfirm: false,
      showConfirmButton: false,
      customClass: 'custom-popup pause'
    }).then(res => {
      updatePause()
      Swal.close()
    })
  }

  const showGameOverPopup = () => {
    const gamedata = { score, time }
    ReactSwal.fire({
      html: <GameOverHTML {...gamedata} action={async (res, name) => {
        if (res === 'restart') {
          ResetGame(statedata)
          Swal.close()
        } else if (res === "sendlink") {
          const ID = new Date().getTime();
          const dataPlayer = {
            id: ID,
            name,
            stars: score,
            time
          }

          await addPlayer(dataPlayer);
          navigate("/ranks")
          Swal.close();
        } else {
          navigate("/")
          Swal.close()
        }
      }} />,
      focusConfirm: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      customClass: 'custom-popup gameover'
    })
  }

  useEffect(() => { if (pause) showPausePopup() }, [pause])
  useEffect(() => { if (life === 0) showGameOverPopup() }, [life])

  useEffect(() => {
    const action = setInterval(() => {
      if (!pause && life > 0) {
        reduceLife()
        increaseTime()
      }
    }, 1000);
    return () => clearInterval(action);
  }, [life, pause, reduceLife, increaseTime, updatePause])

  return (
    <div className="status-area">
      <div className="status-box score-box">
        <div className="label">score</div>
        <div className="value">{score}</div>
      </div>
      <div className="status-box life-box">
        <div className="label">health</div>
        <div className="value">{life}</div>
      </div>
      <div className="status-box time-box">
        <div className="label">survive time</div>
        <div className="value">{time}</div>
      </div>
    </div>
  )
}

export default StatusBar