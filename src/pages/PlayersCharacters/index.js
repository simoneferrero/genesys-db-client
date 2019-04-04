import { connect } from 'react-redux'

// Selectors
import { archetypesByIdSelector } from 'reducers/archetypes/selectors'
import { careersByIdSelector } from 'reducers/careers/selectors'
import {
  playersCharactersAllIdsSelector,
  playersCharactersByIdSelector,
} from 'reducers/playersCharacters/selectors'

// Actions
import { getArchetypes } from 'actions/archetypes'
import { getCareers } from 'actions/careers'
import { getPlayersCharacters } from 'actions/playersCharacters'

import ImmutableConverter from 'HOCs/ImmutableConverter'

import PlayersCharacters from './component'

const mapStateToProps = (state) => ({
  archetypesById: archetypesByIdSelector(state),
  careersById: careersByIdSelector(state),
  playersCharactersAllIds: playersCharactersAllIdsSelector(state),
  playersCharactersById: playersCharactersByIdSelector(state),
})
const mapDispatchToProps = (dispatch) => ({
  getArchetypes: () => dispatch(getArchetypes()),
  getCareers: () => dispatch(getCareers()),
  getPlayersCharacters: () => dispatch(getPlayersCharacters()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImmutableConverter(PlayersCharacters))
