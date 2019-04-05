import PropTypes from 'prop-types'

export const uiType = PropTypes.shape({
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object, // TODO: improve when shape of error is clearer
})
