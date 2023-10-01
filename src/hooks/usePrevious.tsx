import { useEffect, useRef } from 'react'

const usePrevious = <T,>(value: T): T => {
  const prevChildrenRef = useRef<T>(value)

  useEffect(() => {
    prevChildrenRef.current = value
  }, [value])

  return prevChildrenRef.current
}

export default usePrevious
