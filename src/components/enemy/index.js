import React, { useCallback, useEffect, useState } from 'react'
import { usePlayerStore, useStatusStore } from 'zuu'
import './style.scss'

const Enemy = (enemyData) => {
  const { id, x, y, type } = enemyData;
  const { player } = usePlayerStore();
  const { pause, life, removeLife } = useStatusStore();
  const [posX, setposX] = useState(x)
  const currentElement = document.getElementById(id);

  const handleEnemyCollision = useCallback(() => {
    if (currentElement) {
      const rightSide = player.x + 32;
      const leftSide = player.x - 64;
      const upSide = player.y + 32;
      const downSide = player.y - 32;
      if (rightSide > posX && leftSide < posX && upSide > y && downSide < y) {
        removeLife()
        currentElement.remove()
      }
    }
  })

  useEffect(() => handleEnemyCollision(), [handleEnemyCollision])

  useEffect(() => {
    const moveObject = setInterval(() => {
      if (posX > -64) !pause && life > 0 && setposX(posX - 7)
      else currentElement && currentElement.remove()
    }, 10);
    return () => clearInterval(moveObject);
  }, [posX, pause, life, currentElement])

  return <div id={id} className={type} style={{ left: posX, top: y }}></div>
}

export default Enemy