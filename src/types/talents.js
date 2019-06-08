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
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Name of the talent */
  name: PropTypes.string.isRequired,
  /** Any modification or addition to the description */
  notes: PropTypes.string,
  /** The rank if ranked */
  rank: PropTypes.number,
  /** Whether it is ranked or not */
  ranked: PropTypes.bool.isRequired,
  /** Unique talent identifier */
  talent_id: PropTypes.string,
  /** The tier from 1 to 5 */
  tier: PropTypes.number.isRequired,
}

export const talentType = PropTypes.shape(talentData)
