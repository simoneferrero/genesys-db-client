import PropTypes from 'prop-types'

export const playerCharacterType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  player_name: PropTypes.string.isRequired,
})
