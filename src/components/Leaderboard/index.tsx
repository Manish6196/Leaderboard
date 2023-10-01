import Score from '../Score'
import type { DatasetRow } from '../../types'
import {
  Avatar,
  Badge,
  Container,
  ImageSpan,
  LeftSection,
  Name,
  RightSection,
  Row,
} from './styled'
import useAutoRowSwap from '../../hooks/useAutoRowSwap'

type LeaderboardProps = {
  rows: DatasetRow[]
}

const Leaderboard: React.FC<LeaderboardProps> = ({ rows }) => {
  const rowRefs = useAutoRowSwap({ rows })
  return (
    <Container>
      {rows.map(({ userID, displayName, score }, index) => (
        <Row
          key={userID}
          data-id={userID}
          ref={(element: HTMLDivElement) => rowRefs.current.push(element)}
        >
          <LeftSection>
            <Badge rank={index + 1}>
              #{String(index + 1).padStart(2, '0')}
            </Badge>
            <Avatar>
              <ImageSpan userid={userID} />
            </Avatar>
            <Name>{displayName}</Name>
          </LeftSection>
          <RightSection>
            <Score value={score} />
          </RightSection>
        </Row>
      ))}
    </Container>
  )
}

export default Leaderboard
