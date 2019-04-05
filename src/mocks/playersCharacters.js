import { archetype1 } from './archetypes'
import { career1 } from './careers'

export const playerCharacter1 = {
  id: 1,
  name: 'Aditi Desai',
  player_name: 'Player 1',
  archetype: 'clone',
  career: 'academic',
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
      current: 0,
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
export const playerCharacter1Augmented = {
  ...playerCharacter1,
  archetype: archetype1,
  career: career1,
}
export const playerCharacter2 = {
  id: 2,
  name: 'Tam Kamaka',
  player_name: 'Player 2',
  archetype: 'g_mod',
  career: 'bounty_hunter',
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
export const playersCharacters = [playerCharacter1, playerCharacter2]
export const playersCharactersById = {
  [playerCharacter1.id]: playerCharacter1,
  [playerCharacter2.id]: playerCharacter2,
}
export const playersCharactersAllIds = [
  playerCharacter1.id,
  playerCharacter2.id,
]
