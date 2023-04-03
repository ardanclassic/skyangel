import React, { useCallback, useEffect, useState } from 'react'
import { useStatusStore, usePlayerStore } from 'zuu'

import './style.scss'

const StarPoint = (data) => {
  const { id, x, y, type } = data;
  const { player } = usePlayerStore();
  const { increaseLife, updateScore, pause, life } = useStatusStore();
  const [posX, setposX] = useState(x)
  const [posY, setposY] = useState(y)
  const currentElement = document.getElementById(id);

  const handleCollision = useCallback(() => {
    if (currentElement) {
      const rightSide = player.x + 64;
      const leftSide = player.x - 32;
      const upSide = player.y + 32;
      const downSide = player.y - 32;
      if (rightSide > posX && leftSide < posX && upSide > posY && downSide < posY) {
        increaseLife()
        updateScore()
        currentElement.remove();
      }
    }
  })

  useEffect(() => handleCollision(), [handleCollision])

  useEffect(() => {
    const moveObject = setInterval(() => {
      if (posX > 0) !pause && life > 0 && setposX(posX - 5)
      else currentElement && currentElement.remove()

      /** vertical outframe collision */
      if (window.innerHeight > 768) {
        if (posY > 0 && posY < 735) !pause && life > 0 && setposY(posY + 5)
        else currentElement && currentElement.remove()
      } else {
        if (posY > 0 && posY < window.innerHeight - 24) !pause && life > 0 && setposY(posY + 5)
        else currentElement && currentElement.remove()
      }
    }, 80);
    return () => clearInterval(moveObject);
  }, [pause, life, posX, posY, currentElement])

  return <div id={id} className={type} style={{ left: posX, top: posY }}></div>
}

export default StarPoint