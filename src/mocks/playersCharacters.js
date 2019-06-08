import { fromJS, List } from 'immutable'

import ArchetypeRecord from 'reducers/archetypes/records'
import CareerRecord from 'reducers/careers/records'
import PlayerCharacterRecord from 'reducers/playersCharacters/records'
import TalentRecord from 'reducers/talents/records'

import { archetype1, archetype2 } from './archetypes'
import { career1, career2 } from './careers'
import { criticalInjury1, criticalInjury2 } from './criticalInjuries'
import { favor1, favor2 } from './favors'
import { skills, skillsById } from './skills'
import {
  playerCharacterTalent1,
  playerCharacterTalent2,
  talent1,
  talent2,
} from './talents'
import { weapon1, weapon2, weaponsById } from './weapons'

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
  fromJS(playerCharacterSummary1Response),
)
export const playerCharacterSummary1Augmented = new PlayerCharacterRecord(
  fromJS({
    ...playerCharacterSummary1Response,
    archetype: new ArchetypeRecord(archetype1),
    career: new CareerRecord(career1),
  }),
)
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
export const playerCharacter1Favors = [favor1, favor2]
export const playerCharacter1CriticalInjuries = {
  '1': { id: 1, critical_injury_id: criticalInjury1.id },
  '2': { id: 2, critical_injury_id: criticalInjury2.id },
}
export const playerCharacter1CriticalInjuriesAugmented = {
  '1': { ...criticalInjury1, id: 1, critical_injury_id: criticalInjury1.id },
  '2': { ...criticalInjury2, id: 2, critical_injury_id: criticalInjury2.id },
}
export const playerCharacter1Weapons = [
  {
    id: 1,
    weapon_id: weapon1.id,
    name: weapon1.name,
    mods: 'Stun 4, Knockdown',
  },
  { id: 2, weapon_id: weapon2.id, name: weapon2.name, mods: null },
]
export const playerCharacter1WeaponsAugmented = playerCharacter1Weapons.map(
  ({ id, weapon_id, mods }) =>
    weaponsById[weapon_id].merge({ id, ...(mods && { special: mods }) }),
)
export const playerCharacter1Talents = {
  [`${playerCharacterTalent1.id}`]: playerCharacterTalent1,
  [`${playerCharacterTalent2.id}`]: playerCharacterTalent2,
}
export const playerCharacter1TalentsAugmented = {
  [`${playerCharacterTalent1.id}`]: TalentRecord({
    ...talent1,
    ...playerCharacterTalent1,
  }),
  [`${playerCharacterTalent2.id}`]: TalentRecord({
    ...talent2,
    ...playerCharacterTalent2,
  }),
}
export const playerCharacter1Response = {
  ...playerCharacterSummary1Response,
  critical_injuries: playerCharacter1CriticalInjuries,
  favors: playerCharacter1Favors,
  skills: playerCharacter1Skills,
  talents: playerCharacter1Talents,
  weapons: playerCharacter1Weapons,
  motivations: {
    strength: {
      type: 'Patient',
      description:
        'Thanks to her training as a tutor and teacher, Aditi is incredibly patient and can almost always remain calm.',
    },
    flaw: {
      type: 'Conditioning',
      description:
        'Even after her escape, Aditi still struggles with conditioning that requires her to be subservient to humans and avoid hurting them.',
    },
    desire: {
      type: 'Belonging',
      description:
        'Aditi seeks a family or community where she feels like she belongs, and isn’t treated as a “thing.”',
    },
    fear: {
      type: 'Discovery',
      description:
        'Aditi fears others (especially Mila) learning that she’s a clone, and worse, that she’s an escaped clone.',
    },
  },
  notes:
    'Aditi is a clone, a created being developed by Jinteki Biotech. She is one of thousands of Desai clones, developed as tutors and care- takers for the children of the rich and powerful. Aditi, like other clones, was conditioned to obey humans at all cost. But for some reason, her conditioning had a tiny flaw, and Aditi de- veloped the desire for freedom. As a caretaker to two young children in a wealthy household, Aditi slowly stole money and made contacts in the New Angeles underworld. Then one day she simply walked away and into her new life. A man named Tián Shun got her a new ID and a place to crash in Base De Cayambe. Now Aditi works as an off-the-books doctor and research assistant. She keeps the clone barcode on her neck hidden with high collars, counting on the fact that Desai clones have always been rare and exclusive to help avoid being recognized. After she helped Mila Braun with an industrial injury and Tam Kamaka when his body attempted to reject his g-modded muscles, she became a part of their group of friends. She works hard to keep her identity as a clone secret, especially from Mila. The two are great friends, and losing that scares Aditi more than anything.',
  equipment: {
    armor: 'Concealed buckyweave jacket (defense 1, +1 soak)',
    gear:
      'Portable medkit (may perform Medicine checks without penalty) 3 slap-patches (painkillers) PAD Fake New Angeles ID',
    money: 238,
  },
}
export const playerCharacter1 = new PlayerCharacterRecord(
  fromJS({
    ...playerCharacter1Response,
    favors: playerCharacter1Favors.map((favor) => fromJS(favor)),
    skills: List(playerCharacter1Skills.map((skill) => fromJS(skill))),
    talents: fromJS(playerCharacter1Talents),
    weapons: List(playerCharacter1Weapons.map((weapon) => fromJS(weapon))),
  }),
)
export const playerCharacter1Augmented = new PlayerCharacterRecord(
  fromJS({
    ...playerCharacter1Response,
    archetype: new ArchetypeRecord(archetype1),
    career: new CareerRecord(career1),
    critical_injuries: playerCharacter1CriticalInjuriesAugmented,
    favors: playerCharacter1Favors.map((favor) => fromJS(favor)),
    skills: playerCharacter1SkillsAugmented,
    talents: playerCharacter1TalentsAugmented,
    weapons: playerCharacter1WeaponsAugmented,
  }),
)

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
  fromJS(playerCharacterSummary2Response),
)
export const playerCharacterSummary2Augmented = new PlayerCharacterRecord(
  fromJS({
    ...playerCharacterSummary2Response,
    archetype: new ArchetypeRecord(archetype2),
    career: new CareerRecord(career2),
  }),
)
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
