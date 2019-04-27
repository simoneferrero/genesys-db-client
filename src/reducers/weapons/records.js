import { Record } from 'immutable'

const WeaponRecord = Record({
  crit: 0,
  damage: 0,
  encumbrance: 0,
  hard_points: 0,
  id: null,
  mods: '',
  name: null,
  price: 0,
  range: '',
  rarity: 0,
  restricted: false,
  skill: '',
  special: '',
})

export default WeaponRecord
