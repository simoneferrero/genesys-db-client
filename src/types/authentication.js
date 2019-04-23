import PropTypes from 'prop-types'

export const authInfoType = PropTypes.shape({
  jwt: PropTypes.string,
  role: PropTypes.oneOf(['gm', 'player']),
  username: PropTypes.string,
})
