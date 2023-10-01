import { useState, useEffect, useRef } from 'react'

import LeaderBoard from './components/Leaderboard'
import { initialRows } from './data'
import { createNewRows } from './utils/score'

export default function App() {
  const [rows, setRows] = useState(initialRows)

  const timerIdRef = useRef<number | null>(null)

  useEffect(() => {
    const updateRows = () => setRows(p => createNewRows(p))

    const startScoring = () => {
      updateRows()
      timerIdRef.current = setInterval(updateRows, 1000)
    }

    const stopScoring = () => {
      if (timerIdRef.current) clearInterval(timerIdRef.current)
    }

    window.addEventListener('focus', startScoring)
    window.addEventListener('blur', stopScoring)

    if (!timerIdRef.current) {
      startScoring()
    }

    return () => {
      window.removeEventListener('focus', startScoring)
      window.removeEventListener('blur', stopScoring)
    }
  }, [])

  return <LeaderBoard rows={[...rows].sort((a, b) => b.score - a.score)} />
}
