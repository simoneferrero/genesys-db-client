import { connect } from 'react-redux'

// Selectors
import { authenticationSelector } from 'reducers/authentication/selectors'

// Actions
import { logout } from 'actions/authentication'

import ImmutableConverter from 'HOCs/ImmutableConverter'

import Sidebar from './component'

const mapStateToProps = (state) => ({
  authInfo: authenticationSelector(state),
})
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImmutableConverter(Sidebar))
