import { List, Map, Record } from 'immutable'

const AdversaryRecord = Record({
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
  characteristics: Map({
    agility: 0,
    brawn: 0,
    cunning: 0,
    intellect: 0,
    presence: 0,
    willpower: 0,
  }),
  critical_injuries: Map(),
  equipment: Map({
    armor: '',
    gear: '',
  }),
  id: null,
  motivations: Map({
    strength: Map({
      type: '',
      description: '',
    }),
    flaw: Map({
      type: '',
      description: '',
    }),
    desire: Map({
      type: '',
      description: '',
    }),
    fear: Map({
      type: '',
      description: '',
    }),
  }),
  name: '',
  notes: '',
  skills: List(),
  talents: Map(),
  type: null,
  weapons: List(),
})

export default AdversaryRecord
