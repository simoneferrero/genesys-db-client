import PropTypes from 'prop-types'

export const careerData = {
  /** Career's unique identifier */
  id: PropTypes.string.isRequired,
  /** Career's name */
  name: PropTypes.string.isRequired,
}

export const careerType = PropTypes.shape({
  ...careerData,
})
