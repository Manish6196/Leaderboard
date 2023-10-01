import { useLayoutEffect, useRef } from 'react'

import { inverseYPosition, transitPosition } from '../utils/row'
import { DatasetRow } from '../types'

const useAutoRowSwap = ({
  rows,
}: {
  rows: DatasetRow[]
}): React.MutableRefObject<HTMLDivElement[]> => {
  const rowRefs = useRef<HTMLDivElement[]>([])
  const prevTopPositions = useRef<Record<string, number>>({})

  const frameIdsRef = useRef<Record<string, number | null>>({
    inverse: null,
    transition: null,
    reset: null,
  })

  useLayoutEffect(() => {
    const clearAnimationFrames = () => {
      Object.values(frameIdsRef.current).forEach(id => {
        if (id) cancelAnimationFrame(id)
      })
    }

    if (rowRefs.current?.length) {
      rowRefs.current.forEach(el => {
        if (!el) return
        const currentTop = el.getBoundingClientRect().top
        const elementID = el.getAttribute('data-id')

        if (typeof elementID === 'string') {
          const prevTop = prevTopPositions.current?.[elementID]
          if (currentTop !== prevTop) {
            const frameIds = frameIdsRef.current
            frameIds.inverse = requestAnimationFrame(() => {
              inverseYPosition(el, currentTop - prevTop)
              frameIds.transition = requestAnimationFrame(() => {
                transitPosition(el)
                frameIds.reset = requestAnimationFrame(() => {
                  clearAnimationFrames()
                })
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
