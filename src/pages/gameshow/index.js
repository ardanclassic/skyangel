import React, { useEffect, useState } from 'react'
import { useStatusStore, usePlayerStore } from 'zuu';
import Player from 'components/player';
import StatusBar from 'components/statusbar';
import ParachutesGenerator from 'components/objectGenerator/parachute';
import StarsGenerator from 'components/objectGenerator/star';
import EnemiesGenerator from 'components/objectGenerator/enemy';
import { ResetGame } from 'utils/helper';
import './style.scss'

const GameShow = () => {
  const { life, resetLife, resetTime, resetScore } = useStatusStore();
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
      <div id='game-arena' className="game-arena">
        <div className="foreground">
          <StatusBar />
          <Player />
          <ParachutesGenerator {...statedata} />
          <StarsGenerator {...statedata} />
          <EnemiesGenerator {...statedata} />
          <div className="pause"></div>
        </div>
        <div className="moving-bg"></div>
      </div>
    </div>
  )
}

export default GameShow