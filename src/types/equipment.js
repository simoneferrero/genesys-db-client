import PropTypes from 'prop-types'

export const equipmentType = PropTypes.shape({
  armor: PropTypes.string.isRequired,
  gear: PropTypes.string.isRequired,
  money: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
})
