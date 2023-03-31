import React, { useEffect } from 'react'
import { getRandNumber } from 'utils/helper';
import { useObjectStore, useStatusStore } from 'zuu';
import Enemy from 'components/enemy';

const EnemiesGenerator = (state) => {
  const { death } = state;
  const { pause } = useStatusStore();
  const { enemy, updateEnemy } = useObjectStore();

  useEffect(() => {
    /** generate random enemy */
    const generateEnemy = setInterval(() => {
      if (!pause && !death) {
        const id = getRandNumber(100, 1000);
        const y = getRandNumber(100, 600);
        const createEnemy = { id: `en-${id}`, x: 990, y, type: 'enemy' };
        updateEnemy(createEnemy)
      }
    }, getRandNumber(800, 3500));

    return () => clearInterval(generateEnemy);
  }, [enemy, pause, death, updateEnemy])

  const ShowEnemy = () => {
    if (enemy.length > 0) {
      return enemy.map((en, i) => {
        return <Enemy key={i} {...en} />
      })
    }
  }

  return (
    <div className="enemy-area">{ShowEnemy()}</div>
  )
}

export default EnemiesGenerator