import { connect } from 'react-redux'

// Selectors
import { currentPlayerCharacterSelector } from 'reducers/playersCharacters/selectors'
import { factionsByIdSelector } from 'reducers/factions/selectors'
import { factionsUiSelector } from 'reducers/ui/factions/selectors'
import { favorsUiSelector } from 'reducers/ui/favors/selectors'
import { playerCharacterIdSelector } from 'reducers/router/selectors'
import { playersCharactersUiSelector } from 'reducers/ui/playersCharacters/selectors'

// Actions
import { getArchetypes } from 'actions/archetypes'
import { getAuthInfo } from 'actions/authentication'
import { getCareers } from 'actions/careers'
import { getFactions } from 'actions/factions'
import { addFavor } from 'actions/favors'
import {
  editPlayerCharacter,
  getPlayerCharacter,
} from 'actions/playersCharacters'
import { getSkills } from 'actions/skills'

import ImmutableConverter from 'HOCs/ImmutableConverter'

import PlayersCharacters from './component'

const mapStateToProps = (state) => ({
  factions: factionsByIdSelector(state),
  factionsUi: factionsUiSelector(state),
  favorsUi: favorsUiSelector(state),
  playerCharacter: currentPlayerCharacterSelector(state),
  playerCharacterId: playerCharacterIdSelector(state),
  playersCharactersUi: playersCharactersUiSelector(state),
})
const mapDispatchToProps = (dispatch) => ({
  addFavor: (playerCharacterId, favor, actions) =>
    dispatch(addFavor(playerCharacterId, favor, actions)),
  editPlayerCharacter: (id, values, actions) =>
    dispatch(editPlayerCharacter(id, values, actions)),
  getArchetypes: () => dispatch(getArchetypes()),
  getAuthInfo: () => dispatch(getAuthInfo()),
  getCareers: () => dispatch(getCareers()),
  getFactions: () => dispatch(getFactions()),
  getPlayerCharacter: (id) => dispatch(getPlayerCharacter(id)),
  getSkills: () => dispatch(getSkills()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImmutableConverter(PlayersCharacters))
