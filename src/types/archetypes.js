import PropTypes from 'prop-types'

export const archetypeData = {
  /** Archetype's unique identifier */
  id: PropTypes.string.isRequired,
  /** Archetype's name */
  name: PropTypes.string.isRequired,
}

export const archetypeType = PropTypes.shape({
  ...archetypeData,
})
