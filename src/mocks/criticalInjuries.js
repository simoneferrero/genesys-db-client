import { List } from 'immutable'
import CriticalInjuryrRecord from 'reducers/criticalInjuries/records'

export const criticalInjury1 = {
  id: 'minor_nick',
  name: 'Minor Nick',
  severity: 1,
  effects: 'The target suffers 1 strain.',
  dice_value: '01-05',
  persistent: false,
}
export const criticalInjury2 = {
  id: 'the_end_is_nigh',
  name: 'The End Is Nigh',
  severity: 4,
  effects:
    'The target dies after the last Initiative slot during the next round unless this Critical Injury is healed.',
  dice_value: '141-150',
  persistent: true,
}

export const criticalInjuries = [criticalInjury1, criticalInjury2]
export const criticalInjuriesById = {
  [criticalInjury1.id]: new CriticalInjuryrRecord(criticalInjury1),
  [criticalInjury2.id]: new CriticalInjuryrRecord(criticalInjury2),
}
export const criticalInjuriesAllIds = [criticalInjury1.id, criticalInjury2.id]
export const criticalInjuriesOrdered = List([
  new CriticalInjuryrRecord(criticalInjury1),
  new CriticalInjuryrRecord(criticalInjury2),
])
