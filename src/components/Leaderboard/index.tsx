import { useRef, useLayoutEffect } from 'react'

import Score from '../Score'
import type { DatasetRow } from '../../types'
import { ROW_SWAP_TRANSITION_MS } from '../../constants/intex'
import { inverseYPosition, resetYPosition } from '../../utils/row'
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

type LeaderboardProps = {
  rows: DatasetRow[]
}

const Leaderboard: React.FC<LeaderboardProps> = ({ rows }) => {
  const rowRefs = useRef<HTMLDivElement[]>([])
  const prevTopPositions = useRef<Record<string, number>>({})

  const prevAnimationFrameID = useRef<number | null>(null)
  const currentAnimationFrameID = useRef<number | null>(null)
  const timerID = useRef<number | null>(null)

  useLayoutEffect(() => {
    const clearAnimationFrames = () => {
      if (prevAnimationFrameID.current) {
        cancelAnimationFrame(prevAnimationFrameID.current)
      }
      if (currentAnimationFrameID.current) {
        cancelAnimationFrame(currentAnimationFrameID.current)
      }
      if (timerID.current) {
        clearTimeout(timerID.current)
      }
    }
    if (rowRefs.current?.length) {
      rowRefs.current.forEach(el => {
        if (!el) return
        const currentTop = el.getBoundingClientRect().top
        const elementID = el.getAttribute('data-id')

        if (typeof elementID === 'string') {
          const prevTop = prevTopPositions.current?.[elementID]
          if (currentTop !== prevTop) {
            prevAnimationFrameID.current = requestAnimationFrame(() => {
              inverseYPosition(el, currentTop - prevTop)
              currentAnimationFrameID.current = requestAnimationFrame(() => {
                resetYPosition(el)
                timerID.current = setTimeout(
                  clearAnimationFrames,
                  ROW_SWAP_TRANSITION_MS
                )
              })
            })
          }
          prevTopPositions.current[elementID] = currentTop
        }
      })
    }

    return clearAnimationFrames
  }, [rows])

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
