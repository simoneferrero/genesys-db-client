import { connect } from 'react-redux'

// Selectors
import { authenticationSelector } from 'reducers/authentication/selectors'

// Actions
import { getAuthInfo, login } from 'actions/authentication'

import ImmutableConverter from 'HOCs/ImmutableConverter'

import Home from './component'

const mapStateToProps = (state) => ({
  authInfo: authenticationSelector(state),
})
const mapDispatchToProps = {
  getAuthInfo,
  login,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImmutableConverter(Home))
