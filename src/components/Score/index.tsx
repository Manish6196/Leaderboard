import CountUp from '../CountUp'
import { COUNTUP_DURATION } from '../../constants/intex'
import usePrevious from '../../hooks/usePrevious'

type ScoreProps = {
  value: number
}

const Score: React.FC<ScoreProps> = ({ value }) => {
  const pastValue = usePrevious(value)

  return <CountUp start={pastValue} end={value} duration={COUNTUP_DURATION} />
}

export default Score
