import { createSelector } from 'reselect'

import { archetypesByIdSelector } from 'reducers/archetypes/selectors'
import { careersByIdSelector } from 'reducers/careers/selectors'
import { playerCharacterIdSelector } from 'reducers/router/selectors'
import { skillsByIdSelector } from 'reducers/skills/selectors'
import { weaponsByIdSelector } from 'reducers/weapons/selectors'

import PlayerCharacterRecord from 'reducers/playersCharacters/records'

export const playersCharactersSelector = (state) =>
  state.get('playersCharacters')

export const playersCharactersByIdSelector = createSelector(
  playersCharactersSelector,
  archetypesByIdSelector,
  careersByIdSelector,
  skillsByIdSelector,
  weaponsByIdSelector,
  (playersCharacters, archetypesById, careersById, skillsById, weaponsById) =>
    playersCharacters.get('byId').map((playerCharacter) => {
      const archetypeId = playerCharacter.get('archetype_id')
      const archetype = archetypesById.get(archetypeId)
      const careerId = playerCharacter.get('career_id')
      const career = careersById.get(careerId)
      const weapons = playerCharacter.get('weapons').map((weapon) => {
        const id = weapon.get('id')
        const mods = weapon.get('mods')
        const weapon_id = weapon.get('weapon_id')
        const originalWeapon = weaponsById.get(`${weapon_id}`)

        return originalWeapon.merge({
          mods,
          id,
        })
      })

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
        weapons,
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
