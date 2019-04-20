import PropTypes from 'prop-types'

export const favorData = {
  /** Favor's description */
  description: PropTypes.string.isRequired,
  /** Who owes/is owed the favor */
  faction_id: PropTypes.string,
  /** Favor's unique identifier */
  id: PropTypes.number,
  /** Favor's type */
  size: PropTypes.oneOf(['small', 'normal', 'big']).isRequired,
  /** Whether the favor is complete or incomplete */
  status: PropTypes.oneOf(['complete', 'incomplete']).isRequired,
  /** Whether the favor is owed or given */
  type: PropTypes.oneOf(['owed', 'given']),
}

export const favorType = PropTypes.shape({
  ...favorData,
})
