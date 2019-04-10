import { Map, Record } from 'immutable'

const PlayerCharacterRecord = Record({
  archetype: null,
  archetype_id: null,
  attributes: Map({
    defense: Map({
      melee: 0,
      ranged: 0,
    }),
    soak: 0,
    strain: Map({
      current: 0,
      total: 0,
    }),
    wounds: Map({
      current: 0,
      total: 0,
    }),
  }),
  career: null,
  career_id: null,
  characteristics: Map({
    agility: 0,
    brawn: 0,
    cunning: 0,
    intellect: 0,
    presence: 0,
    willpower: 0,
  }),
  id: null,
  name: null,
  player_name: null,
})

export default PlayerCharacterRecord
