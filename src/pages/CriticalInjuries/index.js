import { connect } from 'react-redux'

// Selectors
import { criticalInjuriesOrderedSelector } from 'reducers/criticalInjuries/selectors'
import { criticalInjuriesUiSelector } from 'reducers/ui/criticalInjuries/selectors'

// Actions
import { getAuthInfo } from 'actions/authentication'
import { getCriticalInjuries } from 'actions/criticalInjuries'

import ImmutableConverter from 'HOCs/ImmutableConverter'

import Home from './component'

const mapStateToProps = (state) => ({
  criticalInjuries: criticalInjuriesOrderedSelector(state),
  criticalInjuriesUi: criticalInjuriesUiSelector(state),
})
const mapDispatchToProps = {
  getAuthInfo,
  getCriticalInjuries,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImmutableConverter(Home))
