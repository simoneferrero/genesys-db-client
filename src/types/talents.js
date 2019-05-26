import PropTypes from 'prop-types'

export const talentData = {
  /** When the talent can be used */
  activation: PropTypes.oneOf([
    'Active (Action)',
    'Active (Incidental, Out of Turn)',
    'Active (Incidental)',
    'Active (Maneuver)',
    'Passive',
  ]).isRequired,
  /** What it does */
  description: PropTypes.string.isRequired,
  /** Unique identifier */
  id: PropTypes.string.isRequired,
  /** Name of the talent */
  name: PropTypes.string.isRequired,
  /** Whether it is ranked or not */
  ranked: PropTypes.bool.isRequired,
  /** The tier from 1 to 5 */
  tier: PropTypes.number.isRequired,
}

export const talentType = PropTypes.shape(talentData)

export const playerCharacterTalentData = {
  ...talentData,
  /** Any modification or addition to the description */
  notes: PropTypes.string.isRequired,
  /** Identifier or player's talent */
  id: PropTypes.number.isRequired,
  /** The rank if ranked */
  rank: PropTypes.number,
  /** Unique identifier */
  talent_id: PropTypes.string.isRequired,
}

export const playerCharacterTalentType = PropTypes.shape(
  playerCharacterTalentData,
)
