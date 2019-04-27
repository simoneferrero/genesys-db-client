import PropTypes from 'prop-types'

export const motivationType = PropTypes.shape({
  type: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
})

export const motivationsType = PropTypes.shape({
  strength: motivationType.isRequired,
  flaw: motivationType.isRequired,
  desire: motivationType.isRequired,
  fear: motivationType.isRequired,
})
