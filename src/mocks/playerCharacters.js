export const firstPlayerCharacter = {
  id: 1,
  name: 'Sveeb Tatsetli',
  player_name: 'Player 1',
  archetype: 'clone',
  career: 'runner',
  characteristics: {
    brawn: 1,
    agility: 2,
    intellect: 2,
    cunning: 3,
    willpower: 4,
    presence: 2,
  },
  attributes: {
    wounds: {
      total: 10,
      current: 3,
    },
    strain: {
      total: 10,
      current: 3,
    },
    soak: 2,
    defense: {
      melee: 1,
      ranged: 1,
    },
  },
}
export const secondPlayerCharacter = {
  id: 2,
  name: "L'Ceh Calrel",
  player_name: 'Player 2',
  archetype: 'g-mod',
  career: 'bounty-hunter',
  characteristics: {
    brawn: 1,
    agility: 2,
    intellect: 2,
    cunning: 3,
    willpower: 4,
    presence: 2,
  },
  attributes: {
    wounds: {
      total: 10,
      current: 3,
    },
    strain: {
      total: 10,
      current: 3,
    },
    soak: 2,
    defense: {
      melee: 1,
      ranged: 1,
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
