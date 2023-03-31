import React, { useCallback, useEffect, useState } from 'react'
import { useStatusStore, usePlayerStore } from 'zuu'

import './style.scss'

const Parachute = (data) => {
  const { id, x, y, type } = data;
  const { player } = usePlayerStore();
  const { increaseBigLife, updateBigScore, pause, life } = useStatusStore();

  const [posX, setposX] = useState(x)
  const [posY, setposY] = useState(y)
  const currentElement = document.getElementById(id);

  const handleCollision = useCallback(() => {
    if (currentElement) {
      const rightSide = player.x + 64;
      const leftSide = player.x - 32;
      const upSide = player.y + 48;
      const downSide = player.y - 48;
      if (rightSide > posX && leftSide < posX && upSide > posY && downSide < posY) {
        increaseBigLife()
        updateBigScore()
        currentElement.remove()
      }
    }
  })

  useEffect(() => handleCollision(), [handleCollision])

  useEffect(() => {
    const moveObject = setInterval(() => {
      if (posX > 0) !pause && life > 0 && setposX(posX - 2)
      else currentElement && currentElement.remove()

      if (posY > 0 && posY < 735) !pause && life > 0 && setposY(posY + 5)
      else currentElement && currentElement.remove()
    }, 30);
    return () => clearInterval(moveObject);
  }, [posX, posY, life, pause, currentElement])

  return <div id={id} className={type} style={{ left: posX, top: posY }}></div>
}

export default Parachute