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
const mapDispatchToProps = (dispatch) => ({
  getAuthInfo: () => dispatch(getAuthInfo()),
  login: (details, actions) => dispatch(login(details, actions)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImmutableConverter(Home))
