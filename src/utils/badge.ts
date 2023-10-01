import { RankBadgeColors } from '../types'

export const getColorByrank = (rank: number): `${RankBadgeColors}` => {
  switch (rank) {
    case 1:
      return RankBadgeColors.GOLD
    case 2:
      return RankBadgeColors.SILVER
    case 3:
      return RankBadgeColors.PINK
    default:
      return RankBadgeColors.BLUE
  }
}
