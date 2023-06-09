import React, { useEffect, useState } from 'react'
import { useStatusStore, usePlayerStore } from 'zuu';
import Player from 'components/player';
import StatusBar from 'components/statusbar';
import ParachutesGenerator from 'components/objectGenerator/parachute';
import StarsGenerator from 'components/objectGenerator/star';
import EnemiesGenerator from 'components/objectGenerator/enemy';
import { ResetGame } from 'utils/helper';
import pauseIcon from 'assets/icons/pause.png'
import './style.scss'

const GameShow = () => {
  const { life, pause, resetLife, resetTime, resetScore, updatePause } = useStatusStore();
  const { resetPlayer } = usePlayerStore();
  const [death, setdeath] = useState(false)
  const statedata = { death, resetPlayer, resetLife, resetTime, resetScore }

  useEffect(() => {
    ResetGame(statedata)
  }, [])

  useEffect(() => {
    if (life === 0) setdeath(true)
    else setdeath(false)
  }, [life])

  return (
    <div className="container">
      <div className="game-arena" style={{ height: window.innerHeight < 768 ? "100%" : 768 }}>
        <div className="foreground">
          <StatusBar />
          <Player />
          <ParachutesGenerator {...statedata} />
          <StarsGenerator {...statedata} />
          <EnemiesGenerator {...statedata} />
          <img src={pauseIcon} alt="pause" className="pause-button" onClick={() => updatePause(!pause)} />
        </div>
        <div className="moving-bg"></div>
      </div>
    </div>
  )
}

export default GameShow