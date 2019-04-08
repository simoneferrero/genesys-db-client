import { connect } from 'react-redux'

// Selectors
import { currentPlayerCharacterSelector } from 'reducers/playersCharacters/selectors'
import { playerCharacterIdSelector } from 'reducers/router/selectors'
import { playersCharactersUiSelector } from 'reducers/ui/playersCharacters/selectors'

// Actions
import { getArchetypes } from 'actions/archetypes'
import { getCareers } from 'actions/careers'
import { getPlayerCharacter } from 'actions/playersCharacters'

import ImmutableConverter from 'HOCs/ImmutableConverter'

import PlayersCharacters from './component'

const mapStateToProps = (state) => ({
  playerCharacter: currentPlayerCharacterSelector(state),
  playerCharacterId: playerCharacterIdSelector(state),
  playersCharactersUi: playersCharactersUiSelector(state),
})
const mapDispatchToProps = (dispatch) => ({
  getArchetypes: () => dispatch(getArchetypes()),
  getCareers: () => dispatch(getCareers()),
  getPlayerCharacter: (id) => dispatch(getPlayerCharacter(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImmutableConverter(PlayersCharacters))
