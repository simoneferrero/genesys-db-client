import PropTypes from 'prop-types'
import { archetypeType } from './archetypes'
import { careerType } from './careers'

export const playerCharacterSummaryData = {
  /** The character's archetype */
  archetype: archetypeType.isRequired,
  /** Information on the character's attributes */
  attributes: PropTypes.shape({
    defense: PropTypes.shape({
      melee: PropTypes.number.isRequired,
      ranged: PropTypes.number.isRequired,
    }).isRequired,
    soak: PropTypes.number.isRequired,
    strain: PropTypes.shape({
      current: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
    }).isRequired,
    wounds: PropTypes.shape({
      current: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  /** The character's career */
  career: careerType.isRequired,
  /** Information on the character's characteristics */
  characteristics: PropTypes.shape({
    agility: PropTypes.number.isRequired,
    brawn: PropTypes.number.isRequired,
    cunning: PropTypes.number.isRequired,
    intellect: PropTypes.number.isRequired,
    presence: PropTypes.number.isRequired,
    willpower: PropTypes.number.isRequired,
  }).isRequired,
  /** Character's unique identifier */
  id: PropTypes.number.isRequired,
  /** Character's name */
  name: PropTypes.string.isRequired,
  /** Player's name */
  player_name: PropTypes.string.isRequired,
}
export const playerCharacterSummaryType = PropTypes.shape({
  ...playerCharacterSummaryData,
})

export const playerCharacterData = {
  ...playerCharacterSummaryData,
}
export const playerCharacterType = PropTypes.shape({
  ...playerCharacterData,
})
