import { Record } from 'immutable'

const WeaponRecord = Record({
  id: null,
  name: null,
  skill: '',
  damage: 0,
  crit: 0,
  range: '',
  encumbrance: 0,
  hard_points: 0,
  price: 0,
  rarity: 0,
  special: '',
  restricted: false,
})

export default WeaponRecord
