import { createSelector } from 'reselect'

import { archetypesByIdSelector } from 'reducers/archetypes/selectors'
import { careersByIdSelector } from 'reducers/careers/selectors'
import { playerCharacterIdSelector } from 'reducers/router/selectors'
import { skillsByIdSelector } from 'reducers/skills/selectors'

import PlayerCharacterRecord from 'reducers/playersCharacters/records'

export const playersCharactersSelector = (state) =>
  state.get('playersCharacters')

export const playersCharactersByIdSelector = createSelector(
  playersCharactersSelector,
  archetypesByIdSelector,
  careersByIdSelector,
  skillsByIdSelector,
  (playersCharacters, archetypesById, careersById, skillsById) =>
    playersCharacters.get('byId').map((playerCharacter) => {
      const archetypeId = playerCharacter.get('archetype_id')
      const archetype = archetypesById.get(archetypeId)
      const careerId = playerCharacter.get('career_id')
      const career = careersById.get(careerId)

      const augmentedData = {
        archetype,
        career,
        ...(!skillsById.isEmpty() && {
          skills: playerCharacter.get('skills').map((skill) => {
            const skillId = skill.get('id')
            const skillData = skillsById.get(skillId)
            return skill.merge(skillData)
          }),
        }),
      }

      return playerCharacter.merge(augmentedData)
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
  (playerCharacterId, playersCharactersById) =>
    playersCharactersById.get(playerCharacterId) ||
    new PlayerCharacterRecord({ id: Number(playerCharacterId) }),
)
