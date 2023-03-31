import React, { useEffect, useCallback } from 'react'
import { usePlayerStore, useStatusStore } from 'zuu'

import './style.scss'

const Player = () => {
  const { life, pause, updatePause } = useStatusStore();
  const { keystate, player, updateKeystate, updatePlayer } = usePlayerStore()

  const handlePause = (e) => {
    /** pause the game */
    if (e.key === "Escape" || e.key === " ") updatePause(!pause);
  }

  const movement = useCallback(() => {
    /** ---------------- variables ---------------- */
    const offset_top = 0;
    const offset_left = 0;
    const offset_bottom = 768;
    const offset_right = 1024;
    /** ---------------- --------- ---------------- */

    if (life > 0 && !pause) {
      if (player.x > offset_left + 4) {
        if (keystate['a'] || keystate['ArrowLeft']) updatePlayer('x', false);
      }
      if (player.x < offset_right - 72) {
        if (keystate['d'] || keystate['ArrowRight']) updatePlayer('x', true);
      }
      if (player.y > offset_top) {
        if (keystate['w'] || keystate['ArrowUp']) updatePlayer('y', false);
      }
      if (player.y < offset_bottom - 48) {
        if (keystate['s'] || keystate['ArrowDown']) updatePlayer('y', true);
      }
    }
  })

  useEffect(() => {
    window.addEventListener('keydown', (e) => handlePause(e));
    window.addEventListener('keydown', (e) => updateKeystate(e.key, true), true);
    window.addEventListener('keyup', (e) => updateKeystate(e.key, false), true);

    return () => {
      window.removeEventListener('keydown', (e) => handlePause(e));
      window.removeEventListener('keydown', (e) => updateKeystate(e.key, true), true);
      window.removeEventListener('keyup', (e) => updateKeystate(e.key, false), true);
    }
  }, [])

  useEffect(() => {
    let timer = setTimeout(movement, 10)
    return () => clearTimeout(timer);
  }, [movement])

  return (
    <div className="player" style={{ left: player.x, top: player.y }}></div>
  )
}

export default Player