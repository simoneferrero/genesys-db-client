import PropTypes from 'prop-types'

export const criticalInjuryData = {
  /** What must be rolled to get this injury */
  dice_value: PropTypes.string.isRequired,
  /** Description of the injury's effects */
  effects: PropTypes.string.isRequired,
  /** Unique identifier */
  id: PropTypes.string.isRequired,
  /** Name of the injury */
  name: PropTypes.string.isRequired,
  /** Whether it remains until healed or is just a one-off */
  persistent: PropTypes.bool,
  /** How difficult it is to heal it */
  severity: PropTypes.number.isRequired,
}

export const criticalInjuryType = PropTypes.shape({
  ...criticalInjuryData,
})

export const characterCriticalInjuryType = PropTypes.shape({
  ...criticalInjuryData,
  critical_injury_id: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
})
