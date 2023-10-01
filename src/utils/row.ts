import { ROW_SWAP_TRANSITION_MS } from '../constants/intex'

export const inverseYPosition = (row: HTMLDivElement, deltaY: number): void => {
  row.style.transform = `translateY(${-deltaY}px)`
  row.style.transition = 'transform 0s'
}

export const resetYPosition = (row: HTMLDivElement): void => {
  row.style.transform = ''
  row.style.transition = `transform ${ROW_SWAP_TRANSITION_MS}ms`
}
