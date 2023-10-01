import type { DatasetRow } from '../types'

export const createNewRows = (players: DatasetRow[]): DatasetRow[] =>
  players.map(player => ({
    ...player,
    score: player.score + Math.floor(Math.random() * 2400),
  }))
