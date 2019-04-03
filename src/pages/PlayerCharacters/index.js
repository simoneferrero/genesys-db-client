import { connect } from 'react-redux'

import {
  playerCharactersAllIdsSelector,
  playerCharactersByIdSelector,
} from 'reducers/playerCharacters/selectors'

import { getPlayerCharacters } from 'actions/playerCharacters'

import ImmutableConverter from 'HOCs/ImmutableConverter'

import PlayerCharacters from './component'

const mapStateToProps = (state) => ({
  playerCharactersAllIds: playerCharactersAllIdsSelector(state),
  playerCharactersById: playerCharactersByIdSelector(state),
})
const mapDispatchToProps = (dispatch) => ({
  getPlayerCharacters: () => dispatch(getPlayerCharacters()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImmutableConverter(PlayerCharacters))
