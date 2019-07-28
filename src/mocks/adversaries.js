import { fromJS, List } from 'immutable'

import AdversaryRecord from 'reducers/adversaries/records'
import TalentRecord from 'reducers/talents/records'

import { criticalInjury1, criticalInjury2 } from './criticalInjuries'
import { skills, skillsById } from './skills'
import { characterTalent1, characterTalent2, talent1, talent2 } from './talents'
import { weapon1, weapon2, weaponsById } from './weapons'

export const adversary1Id = 1
export const adversarySummary1Response = {
  id: adversary1Id,
  type: 'nemesis',
  name: 'Criminal Runner',
  characteristics: {
    brawn: 2,
    agility: 3,
    intellect: 3,
    cunning: 4,
    willpower: 2,
    presence: 2,
  },
  attributes: {
    soak: 2,
    wounds: {
      total: 14,
      current: 10,
    },
    strain: {
      total: 16,
      current: 2,
    },
    defense: {
      melee: 0,
      ranged: 0,
    },
  },
}
export const adversarySummary1 = new AdversaryRecord(
  fromJS(adversarySummary1Response),
)
export const adversary1Skills = skills.map(({ id, type }, index) => ({
  id,
  type,
  rank: index,
  career: index % 2 === 0,
}))
export const adversary1SkillsAugmented = List(
  adversary1Skills.map((skill) =>
    fromJS({
      ...skill,
      ...skillsById[skill.id].toJS(),
    }),
  ),
)
export const adversary1CriticalInjuries = {
  '1': { id: 1, critical_injury_id: criticalInjury1.id },
  '2': { id: 2, critical_injury_id: criticalInjury2.id },
}
export const adversary1CriticalInjuriesAugmented = {
  '1': { ...criticalInjury1, id: 1, critical_injury_id: criticalInjury1.id },
  '2': { ...criticalInjury2, id: 2, critical_injury_id: criticalInjury2.id },
}
export const adversary1Weapons = [
  {
    id: 1,
    weapon_id: weapon1.id,
    name: weapon1.name,
    mods: 'Stun 4, Knockdown',
  },
  { id: 2, weapon_id: weapon2.id, name: weapon2.name, mods: null },
]
export const adversary1WeaponsAugmented = adversary1Weapons.map(
  ({ id, weapon_id, mods }) =>
    weaponsById[weapon_id].merge({ id, ...(mods && { special: mods }) }),
)
export const adversary1Talents = {
  [`${characterTalent1.id}`]: characterTalent1,
  [`${characterTalent2.id}`]: characterTalent2,
}
export const adversary1TalentsAugmented = {
  [`${characterTalent1.id}`]: TalentRecord({
    ...talent1,
    ...characterTalent1,
  }),
  [`${characterTalent2.id}`]: TalentRecord({
    ...talent2,
    ...characterTalent2,
  }),
}
export const adversary1Response = {
  ...adversarySummary1Response,
  critical_injuries: adversary1CriticalInjuries,
  skills: adversary1Skills,
  talents: adversary1Talents,
  weapons: adversary1Weapons,
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
    "Criminal runners come in all types: some are cocky upstarts taking on jobs out of their league, while others are cold professionals saving up for retirement. But for each of them, at the end of the day it's all about the paycheck.",
  equipment: {
    armor: '',
    gear:
      'Skulljack\nPortable rig with Femme Fatale (page 137 of SotB) and Corroder (page 136 of SotB) - protected by Shinoby (page 135 of SotB)\nFake IDs',
  },
}
export const adversary1 = new AdversaryRecord(
  fromJS({
    ...adversary1Response,
    skills: List(adversary1Skills.map((skill) => fromJS(skill))),
    talents: fromJS(adversary1Talents),
    weapons: List(adversary1Weapons.map((weapon) => fromJS(weapon))),
  }),
)
export const adversary1Augmented = new AdversaryRecord(
  fromJS({
    ...adversary1Response,
    critical_injuries: adversary1CriticalInjuriesAugmented,
    skills: adversary1SkillsAugmented,
    talents: adversary1TalentsAugmented,
    weapons: adversary1WeaponsAugmented,
  }),
)

export const adversary2Id = 2
export const adversarySummary2Response = {
  id: adversary2Id,
  type: 'minion',
  name: 'Disenfrancisto',
  characteristics: {
    brawn: 2,
    agility: 2,
    intellect: 2,
    cunning: 3,
    willpower: 2,
    presence: 1,
  },
  attributes: {
    soak: 2,
    wounds: {
      total: 5,
      current: 3,
    },
    strain: {
      total: 0,
      current: 0,
    },
    defense: {
      melee: 1,
      ranged: 1,
    },
  },
}
export const adversarySummary2 = new AdversaryRecord(
  fromJS(adversarySummary2Response),
)
export const adversariesResponse = [
  adversarySummary1Response,
  adversarySummary2Response,
]
export const adversariesById = fromJS({
  [adversary1Id]: adversarySummary1,
  [adversary2Id]: adversarySummary2,
})
export const adversariesAllIds = fromJS([`${adversary1Id}`, `${adversary2Id}`])

export const adversariesAugmented = fromJS([
  adversarySummary1,
  adversarySummary2,
])
