import { fromJS, List } from 'immutable'

import ArchetypeRecord from 'reducers/archetypes/records'
import CareerRecord from 'reducers/careers/records'
import PlayerCharacterRecord from 'reducers/playersCharacters/records'

import { archetype1, archetype2 } from './archetypes'
import { career1, career2 } from './careers'
import { skills, skillsById } from './skills'

export const playerCharacter1Id = 1
export const playerCharacterSummary1Response = {
  id: playerCharacter1Id,
  name: 'Aditi Desai',
  player_name: 'Player 1',
  archetype_id: 'clone',
  career_id: 'academic',
  characteristics: {
    brawn: 2,
    agility: 2,
    intellect: 4,
    cunning: 2,
    willpower: 4,
    presence: 2,
  },
  attributes: {
    soak: 3,
    wounds: {
      total: 13,
      current: 11,
    },
    strain: {
      total: 14,
      current: 2,
    },
    defense: {
      melee: 1,
      ranged: 1,
    },
  },
}
export const playerCharacterSummary1 = new PlayerCharacterRecord(
  playerCharacterSummary1Response,
)
export const playerCharacterSummary1Augmented = new PlayerCharacterRecord({
  ...playerCharacterSummary1Response,
  archetype: new ArchetypeRecord(archetype1),
  career: new CareerRecord(career1),
})
export const playerCharacter1Skills = skills.map(({ id, type }, index) => ({
  id,
  type,
  rank: index,
  career: index % 2 === 0,
}))
export const playerCharacter1SkillsAugmented = List(
  playerCharacter1Skills.map((skill) =>
    fromJS({
      ...skill,
      ...skillsById[skill.id].toJS(),
    }),
  ),
)
export const playerCharacter1Response = {
  ...playerCharacterSummary1Response,
  skills: playerCharacter1Skills,
}
export const playerCharacter1 = new PlayerCharacterRecord({
  ...playerCharacter1Response,
  skills: List(playerCharacter1Skills.map((skill) => fromJS(skill))),
})
export const playerCharacter1Augmented = new PlayerCharacterRecord({
  ...playerCharacter1Response,
  archetype: new ArchetypeRecord(archetype1),
  career: new CareerRecord(career1),
  skills: playerCharacter1SkillsAugmented,
})

export const playerCharacter2Id = 2
export const playerCharacterSummary2Response = {
  id: playerCharacter2Id,
  name: 'Tam Kamaka',
  player_name: 'Player 2',
  archetype_id: 'g_mod',
  career_id: 'bounty_hunter',
  characteristics: {
    brawn: 3,
    agility: 2,
    intellect: 3,
    cunning: 4,
    willpower: 1,
    presence: 2,
  },
  attributes: {
    soak: 5,
    wounds: {
      total: 16,
      current: 3,
    },
    strain: {
      total: 12,
      current: 1,
    },
    defense: {
      melee: 0,
      ranged: 0,
    },
  },
}
export const playerCharacterSummary2 = new PlayerCharacterRecord(
  playerCharacterSummary2Response,
)
export const playerCharacterSummary2Augmented = new PlayerCharacterRecord({
  ...playerCharacterSummary2Response,
  archetype: new ArchetypeRecord(archetype2),
  career: new CareerRecord(career2),
})
export const playersCharactersResponse = [
  playerCharacterSummary1Response,
  playerCharacterSummary2Response,
]
export const playersCharactersById = fromJS({
  [playerCharacter1Id]: playerCharacterSummary1,
  [playerCharacter2Id]: playerCharacterSummary2,
})
export const playersCharactersByIdAugmented = fromJS({
  [playerCharacter1Id]: playerCharacterSummary1Augmented,
  [playerCharacter2Id]: playerCharacterSummary2Augmented,
})
export const playersCharactersAllIds = fromJS([
  `${playerCharacter1Id}`,
  `${playerCharacter2Id}`,
])
export const playersCharactersAugmented = fromJS([
  playerCharacterSummary1Augmented,
  playerCharacterSummary2Augmented,
])
