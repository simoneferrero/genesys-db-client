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
      const archetypeId = playerCharacter.get('archetype_id')
      const archetype = archetypesById.get(archetypeId) || new ArchetypeRecord()
      const careerId = playerCharacter.get('career_id')
      const career = careersById.get(careerId) || new CareerRecord()

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
