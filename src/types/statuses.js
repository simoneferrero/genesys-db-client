import PropTypes from 'prop-types'

export const statusType = PropTypes.shape({
  disruptions: PropTypes.array.isRequired,
  serviceTypes: PropTypes.arrayOf(
    PropTypes.shape({
      $type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      uri: PropTypes.string.isRequired,
    }),
  ).isRequired,
  created: PropTypes.string.isRequired,
  modified: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  modeName: PropTypes.string.isRequired,
  lineStatuses: PropTypes.arrayOf(
    PropTypes.shape({
      $type: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      statusSeverity: PropTypes.number.isRequired,
      statusSeverityDescription: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
      validityPeriods: PropTypes.array.isRequired,
    }),
  ).isRequired,
  crowding: PropTypes.shape({
    $type: PropTypes.string.isRequired,
  }),
  routeSections: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  $type: PropTypes.string.isRequired,
})
