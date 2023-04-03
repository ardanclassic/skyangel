import { create } from 'zustand'

export const useObjectStore = create((set) => ({
  star: [],
  parachute: [],
  enemy: [],

  updateStar: (st) => set((state) => ({
    star: [...state.star, st]
  })),

  updateEnemy: (en) => set((state) => ({
    enemy: [...state.enemy, en]
  })),

  updateParachute: (pa) => set((state) => ({
    parachute: [...state.parachute, pa]
  })),
}))

export const useStatusStore = create((set) => ({
  score: 0,
  time: 0,
  life: 10,
  pause: false,
  starCollision: false,

  increaseLife: () => set((state) => ({ life: state.life + 1 })),
  increaseBigLife: () => set((state) => ({ life: state.life + 10 })),
  reduceLife: () => set((state) => ({ life: state.life - 1 })),
  removeLife: () => set({ life: 0 }),
  resetLife: () => set({ life: 10 }),

  updatePause: (status) => set(() => ({ pause: status })),
  increaseTime: () => set((state) => ({ time: state.time + 1 })),
  resetTime: () => set({ time: 0 }),

  updateScore: () => set((state) => ({ score: state.score + 1 })),
  updateBigScore: () => set((state) => ({ score: state.score + 10 })),
  resetScore: () => set({ score: 0 }),
}))

export const usePlayerStore = create((set) => ({
  keystate: {
    a: false,
    s: false,
    d: false,
    w: false,
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
  },

  player: {
    y: 120,
    x: 32,
    left: false,
    up: false,
    right: false,
    down: false,
  },

  resetPlayer: () => set({
    player: {
      y: 120,
      x: 32,
      left: false,
      up: false,
      right: false,
      down: false,
    }
  }),

  updatePlayer: (pos, type) => set((state) => {
    let count = type ? state.player[pos] + 5 : state.player[pos] - 5;
    return ({
      player: { ...state.player, [pos]: count }
    })
  }),

  updateKeystate: (key, type) => set((state) => ({
    keystate: { ...state.keystate, [key]: type }
  })),
}))