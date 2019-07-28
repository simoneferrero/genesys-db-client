import { connect } from 'react-redux'

// Selectors
import { allAdversariesSelector } from 'reducers/adversaries/selectors'
import { adversariesUiSelector } from 'reducers/ui/adversaries/selectors'

// Actions
import { getAuthInfo } from 'actions/authentication'
import { getAdversaries } from 'actions/adversaries'

import ImmutableConverter from 'HOCs/ImmutableConverter'

import Adversaries from './component'

const mapStateToProps = (state) => ({
  adversaries: allAdversariesSelector(state),
  adversariesUi: adversariesUiSelector(state),
})
const mapDispatchToProps = {
  getAuthInfo,
  getAdversaries,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImmutableConverter(Adversaries))
