

export const getRandNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

export const ResetGame = (state) => {
  const { resetPlayer, resetLife, resetTime, resetScore } = state

  /** reset all game & player status */
  resetLife()
  resetTime()
  resetScore()
  resetPlayer()

  /** reset all objects */
  const stars = document.querySelectorAll('.star');
  stars.forEach(el => el.remove());

  const parachutes = document.querySelectorAll('.parachute');
  parachutes.forEach(el => el.remove());

  const enemies = document.querySelectorAll('.enemy');
  enemies.forEach(el => el.remove());
}