export const firstPlayerCharacter = {
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
export const secondPlayerCharacter = {
  id: 2,
  name: 'Tam Kamaka',
  player_name: 'Player 2',
  archetype: 'g-mod',
  career: 'bounty-hunter',
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
export const playerCharacters = [firstPlayerCharacter, secondPlayerCharacter]
export const playerCharactersById = {
  [firstPlayerCharacter.id]: firstPlayerCharacter,
  [secondPlayerCharacter.id]: secondPlayerCharacter,
}
export const playerCharactersAllIds = [
  firstPlayerCharacter.id,
  secondPlayerCharacter.id,
]
