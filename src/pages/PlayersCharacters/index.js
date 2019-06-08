import { connect } from 'react-redux'

// Selectors
import { allPlayersCharactersSelector } from 'reducers/playersCharacters/selectors'
import { playersCharactersUiSelector } from 'reducers/ui/playersCharacters/selectors'

// Actions
import { getArchetypes } from 'actions/archetypes'
import { getAuthInfo } from 'actions/authentication'
import { getCareers } from 'actions/careers'
import { getPlayersCharacters } from 'actions/playersCharacters'

import ImmutableConverter from 'HOCs/ImmutableConverter'

import PlayersCharacters from './component'

const mapStateToProps = (state) => ({
  playersCharacters: allPlayersCharactersSelector(state),
  playersCharactersUi: playersCharactersUiSelector(state),
})
const mapDispatchToProps = {
  getArchetypes,
  getAuthInfo,
  getCareers,
  getPlayersCharacters,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImmutableConverter(PlayersCharacters))
