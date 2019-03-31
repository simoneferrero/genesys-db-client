import { connect } from 'react-redux'

import {
  statusesByIdSelector,
  statusesAllIdsSelector,
} from 'reducers/statuses/selectors'

import { getTubeStatuses } from 'actions/getTubeStatuses'

import ImmutableConverter from 'HOCs/ImmutableConverter'

import StatusCardsContainer from './component'

const mapStateToProps = (state) => {
  return {
    statusesAllIds: statusesAllIdsSelector(state),
    statusesById: statusesByIdSelector(state),
  }
}

const mapDispatchToProps = (dispatch) => ({
  getTubeStatuses: () => dispatch(getTubeStatuses()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImmutableConverter(StatusCardsContainer))
