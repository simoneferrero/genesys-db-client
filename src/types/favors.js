import PropTypes from 'prop-types'

export const favorData = {
  /** Favor's description */
  description: PropTypes.string.isRequired,
  /** Who owes/is owed the favor */
  faction: PropTypes.oneOf([
    'jinteki',
    'haas-biodroid',
    'weyland-consortium',
    'nbn',
    'orgcrime',
    'street-gangs',
    'napd',
    'government',
    'sea',
    'globalsec',
    'loonies',
    'human-first',
    'humanity-labor',
    'opticon-foundation',
    'simulant-abolitionist-movement',
    'brigada-tricolor',
    'other',
  ]).isRequired,
  /** Favor's unique identifier */
  id: PropTypes.number,
  /** Whether the favor is owed or given */
  owed: PropTypes.bool,
  /** Whether the favor has been completed */
  completed: PropTypes.bool,
  /** Favor's type */
  type: PropTypes.oneOf(['small', 'normal', 'big']).isRequired,
}

export const favorType = PropTypes.shape({
  ...favorData,
})
