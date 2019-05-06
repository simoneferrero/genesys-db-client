import { connect } from 'react-redux'

// Selectors
import { currentPlayerCharacterSelector } from 'reducers/playersCharacters/selectors'
import { factionsByIdSelector } from 'reducers/factions/selectors'
import { playerCharacterIdSelector } from 'reducers/router/selectors'
import { uiSelector } from 'reducers/ui/selectors'
import { weaponsByIdSelector } from 'reducers/weapons/selectors'

// Actions
import { getArchetypes } from 'actions/archetypes'
import { getAuthInfo } from 'actions/authentication'
import { getCareers } from 'actions/careers'
import { getCriticalInjuries } from 'actions/criticalInjuries'
import { getFactions } from 'actions/factions'
import { addFavor } from 'actions/favors'
import {
  editPlayerCharacter,
  getPlayerCharacter,
} from 'actions/playersCharacters'
import { getSkills } from 'actions/skills'
import { getWeapons, addPlayerCharacterWeapon } from 'actions/weapons'

import ImmutableConverter from 'HOCs/ImmutableConverter'

import PlayersCharacters from './component'

const mapStateToProps = (state) => ({
  factions: factionsByIdSelector(state),
  playerCharacter: currentPlayerCharacterSelector(state),
  playerCharacterId: playerCharacterIdSelector(state),
  ui: uiSelector(state),
  weapons: weaponsByIdSelector(state),
})
const mapDispatchToProps = {
  addFavor,
  addPlayerCharacterWeapon,
  editPlayerCharacter,
  getArchetypes,
  getAuthInfo,
  getCareers,
  getCriticalInjuries,
  getFactions,
  getPlayerCharacter,
  getSkills,
  getWeapons,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImmutableConverter(PlayersCharacters))
