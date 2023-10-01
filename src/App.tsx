import { useState, useEffect } from 'react'

import LeaderBoard from './components/Leaderboard'
import { initialRows } from './data'
import { createNewRows } from './utils/score'

export default function App() {
  const [rows, setRows] = useState(initialRows)

  useEffect(() => {
    const intervalID = setInterval(() => setRows(p => createNewRows(p)), 1000)
    return () => clearInterval(intervalID)
  }, [])

  return <LeaderBoard rows={[...rows].sort((a, b) => b.score - a.score)} />
}
