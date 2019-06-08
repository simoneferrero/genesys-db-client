import { connect } from 'react-redux'

// Selectors
import { authenticationSelector } from 'reducers/authentication/selectors'
import { talentsByIdSelector } from 'reducers/talents/selectors'
import { talentsUiSelector } from 'reducers/ui/talents/selectors'

// Actions
import { getAuthInfo } from 'actions/authentication'
import { getTalents, addTalent } from 'actions/talents'

import ImmutableConverter from 'HOCs/ImmutableConverter'

import Talents from './component'

const mapStateToProps = (state) => ({
  authInfo: authenticationSelector(state),
  talents: talentsByIdSelector(state),
  talentsUi: talentsUiSelector(state),
})
const mapDispatchToProps = {
  addTalent,
  getAuthInfo,
  getTalents,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImmutableConverter(Talents))
