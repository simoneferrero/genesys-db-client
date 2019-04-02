export const firstPlayerCharacter = {
  id: 1,
  name: 'Sveeb Tatsetli',
  player_name: 'Player 1',
}
export const secondPlayerCharacter = {
  id: 2,
  name: "L'Ceh Calrel",
  player_name: 'Player 2',
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
