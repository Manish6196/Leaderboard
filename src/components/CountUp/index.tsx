import { useState, useEffect } from 'react'

import { COUNTUP_STEPS } from '../../constants/intex'
import { Count, CountWrapper } from './styled'

type CountUpProps = {
  start: number
  end: number
  duration: number
}

const CountUp: React.FC<CountUpProps> = ({ start = 0, end, duration }) => {
  const [count, setCount] = useState(start)

  const step = (end - start) / COUNTUP_STEPS
  const intervalDuration = duration / COUNTUP_STEPS

  useEffect(() => {
    if (start < end) {
      const interval = setInterval(() => {
        setCount(prevCount => {
          const newCount = prevCount + step
          return Math.ceil(newCount >= end ? end : newCount)
        })
      }, intervalDuration * 1000)

      return () => clearInterval(interval)
    }
    // eslint-disable-next-line
  }, [start, end, duration])

  return (
    <CountWrapper>
      <Count>{count}</Count> points
    </CountWrapper>
  )
}

export default CountUp
