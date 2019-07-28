import PropTypes from 'prop-types'
import { characterCriticalInjuryType } from './criticalInjuries'
import { adversaryEquipmentType } from './equipment'
import { motivationsType } from './motivations'
import { skillType } from './skills'
import { weaponType } from './weapons'

export const adversarySummaryData = {
  /** Information on the character's attributes */
  attributes: PropTypes.shape({
    defense: PropTypes.shape({
      melee: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      ranged: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
    }).isRequired,
    soak: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    strain: PropTypes.shape({
      current: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      total: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
    }).isRequired,
    wounds: PropTypes.shape({
      current: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      total: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
    }).isRequired,
  }).isRequired,
  /** Information on the character's characteristics */
  characteristics: PropTypes.shape({
    agility: PropTypes.number.isRequired,
    brawn: PropTypes.number.isRequired,
    cunning: PropTypes.number.isRequired,
    intellect: PropTypes.number.isRequired,
    presence: PropTypes.number.isRequired,
    willpower: PropTypes.number.isRequired,
  }).isRequired,
  /** Character's critical injuries */
  critical_injuries: PropTypes.objectOf(characterCriticalInjuryType).isRequired,
  /** Character's unique identifier */
  id: PropTypes.number.isRequired,
  /** Character's name */
  name: PropTypes.string.isRequired,
  /** Type of adversary */
  type: PropTypes.oneOf(['minion', 'rival', 'nemesis']).isRequired,
}
export const adversarySummaryType = PropTypes.shape({
  ...adversarySummaryData,
})

export const adversaryData = {
  ...adversarySummaryData,
  equipment: adversaryEquipmentType.isRequired,
  motivations: motivationsType.isRequired,
  notes: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(skillType).isRequired,
  weapons: PropTypes.arrayOf(weaponType).isRequired,
}
export const adversaryType = PropTypes.shape({
  ...adversaryData,
})
