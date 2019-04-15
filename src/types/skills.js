import PropTypes from 'prop-types'

export const skillData = {
  /** Characteristic to which the skill refers */
  characteristic: PropTypes.string,
  /** Skill's description */
  description: PropTypes.string,
  /** Skill's unique identifier */
  id: PropTypes.string.isRequired,
  /** Skill's name */
  name: PropTypes.string.isRequired,
  /** Skill's type */
  type: PropTypes.oneOf(['general', 'combat', 'social', 'knowledge']),
}

export const skillType = PropTypes.shape({
  ...skillData,
})
