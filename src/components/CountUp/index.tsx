import { Count, CountWrapper } from './styled'
import useCountUp from '../../hooks/useCountUp'

type CountUpProps = {
  start: number
  end: number
  duration: number
}

const CountUp: React.FC<CountUpProps> = ({ start = 0, end, duration }) => {
  const count = useCountUp({ start, end, duration })

  return (
    <CountWrapper>
      <Count>{count}</Count> points
    </CountWrapper>
  )
}

export default CountUp
