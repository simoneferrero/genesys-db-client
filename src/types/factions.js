import PropTypes from 'prop-types'

export const factionData = {
  /** Faction's description */
  description: PropTypes.string.isRequired,
  /** Faction's unique identifier */
  id: PropTypes.string.isRequired,
  /** Faction's name */
  name: PropTypes.string.isRequired,
}

export const factionType = PropTypes.shape({
  ...factionData,
})
