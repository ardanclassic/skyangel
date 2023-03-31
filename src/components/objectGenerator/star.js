import React, { useEffect } from 'react'
import { getRandNumber } from 'utils/helper';
import { useObjectStore, useStatusStore } from 'zuu';
import StarPoint from 'components/star';

const StarsGenerator = (state) => {
  const { death } = state;
  const { pause } = useStatusStore();
  const { star, updateStar } = useObjectStore();

  useEffect(() => {
    /** generate random star */
    const generateStar = setInterval(() => {
      if (!pause && !death) {
        const id = getRandNumber(100, 1000);
        const x = getRandNumber(300, 800);
        const createStar = { id: `fo-${id}`, x, y: 5, type: 'star' };
        updateStar(createStar)
      }
    }, 2000);

    return () => clearInterval(generateStar);
  }, [star, pause, updateStar, death])

  const ShowStar = () => {
    if (star.length > 0) {
      return star.map((fu, i) => {
        return <StarPoint key={i} {...fu} />
      })
    }
  }

  return (
    <div className="star-area">{ShowStar()}</div>
  )
}

export default StarsGenerator