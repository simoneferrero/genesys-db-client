import { createSelector } from 'reselect'

import { archetypesByIdSelector } from 'reducers/archetypes/selectors'
import { careersByIdSelector } from 'reducers/careers/selectors'
import { playerCharacterIdSelector } from 'reducers/router/selectors'

import ArchetypeRecord from 'reducers/archetypes/records'
import CareerRecord from 'reducers/careers/records'
import PlayerCharacterRecord from 'reducers/playersCharacters/records'

export const playersCharactersSelector = (state) =>
  state.get('playersCharacters')

export const playersCharactersByIdSelector = createSelector(
  playersCharactersSelector,
  archetypesByIdSelector,
  careersByIdSelector,
  (playersCharacters, archetypesById, careersById) =>
    playersCharacters.get('byId').map((playerCharacter) => {
      const playerCharacterArchetype = playerCharacter.get('archetype')
      const archetype =
        archetypesById.get(playerCharacterArchetype) || new ArchetypeRecord()
      const playerCharacterCareer = playerCharacter.get('career')
      const career =
        careersById.get(playerCharacterCareer) || new CareerRecord()

      return playerCharacter.set('archetype', archetype).set('career', career)
    }),
)

export const playersCharactersAllIdsSelector = createSelector(
  playersCharactersSelector,
  (playersCharacters) => playersCharacters.get('allIds'),
)

export const allPlayersCharactersSelector = createSelector(
  playersCharactersAllIdsSelector,
  playersCharactersByIdSelector,
  (playersCharactersAllIds, playersCharactersById) =>
    playersCharactersAllIds.map((id) => playersCharactersById.get(`${id}`)),
)

export const currentPlayerCharacterSelector = createSelector(
  playerCharacterIdSelector,
  playersCharactersByIdSelector,
  (playerCharacterId, playersCharactersById) => {
    const defaultPlayerCharacter = new PlayerCharacterRecord({
      archetype: new ArchetypeRecord(),
      career: new CareerRecord(),
      id: Number(playerCharacterId),
      name: '',
      player_name: '',
    })

    return (
      playersCharactersById.get(playerCharacterId) || defaultPlayerCharacter
    )
  },
)
