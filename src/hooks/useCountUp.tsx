import { useState, useEffect } from 'react'

import { COUNTUP_STEPS } from '../constants/intex'

type useCountUpParams = {
  start: number
  end: number
  duration: number
}

const useCountUp = ({ start, end, duration }: useCountUpParams): number => {
  const [count, setCount] = useState(start)

  const step = (end - start) / COUNTUP_STEPS
  const intervalDuration = duration / COUNTUP_STEPS

  useEffect(() => {
    if (start < end) {
      const interval = setInterval(() => {
        setCount(c => {
          const newCount = c + step
          return Math.ceil(newCount >= end ? end : newCount)
        })
      }, intervalDuration * 1000)

      return () => clearInterval(interval)
    }
    // eslint-disable-next-line
  }, [start, end, duration])

  return count
}

export default useCountUp
