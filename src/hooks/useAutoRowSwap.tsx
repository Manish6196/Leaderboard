import { useLayoutEffect, useRef } from 'react'

import { inverseYPosition, resetYPosition } from '../utils/row'
import { ROW_SWAP_TRANSITION_MS } from '../constants/intex'
import { DatasetRow } from '../types'

const useAutoRowSwap = ({
  rows,
}: {
  rows: DatasetRow[]
}): React.MutableRefObject<HTMLDivElement[]> => {
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

  return rowRefs
}

export default useAutoRowSwap
