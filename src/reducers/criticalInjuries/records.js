import { Record } from 'immutable'

const CriticalInjuryRecord = new Record({
  critical_injury_id: null,
  dice_value: null,
  effects: '',
  id: null,
  name: '',
  persistent: false,
  severity: 0,
})

export default CriticalInjuryRecord
