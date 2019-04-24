import { Record } from 'immutable'

const WeaponRecord = Record({
  id: null,
  name: null,
  skill: null,
  damage: null,
  crit: null,
  range: null,
  encumbrance: null,
  hard_points: null,
  price: null,
  rarity: null,
  special: null,
  restricted: false,
})

export default WeaponRecord
