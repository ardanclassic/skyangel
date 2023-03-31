import React, { useEffect } from 'react'
import { getRandNumber } from 'utils/helper';
import { useObjectStore, useStatusStore } from 'zuu';
import Parachute from 'components/parachute';

const ParachutesGenerator = (state) => {
  const { death } = state;
  const { pause } = useStatusStore();
  const { parachute, updateParachute } = useObjectStore();

  useEffect(() => {
    /** generate random parachute */
    const generateParachute = setInterval(() => {
      if (!pause && !death) {
        const id = getRandNumber(100, 1000);
        const x = getRandNumber(400, 900);
        const createParachute = { id: `pa-${id}`, x, y: 5, type: 'parachute' };
        updateParachute(createParachute)
      }
    }, 6000);

    return () => clearInterval(generateParachute);
  }, [parachute, pause, death, updateParachute])

  const ShowParachute = () => {
    if (parachute.length > 0) {
      return parachute.map((en, i) => {
        return <Parachute key={i} {...en} />
      })
    }
  }

  return (
    <div className="parachute-area">{ShowParachute()}</div>
  )
}

export default ParachutesGenerator