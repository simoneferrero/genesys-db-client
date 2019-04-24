import { playerCharacter1Id } from './playersCharacters'

export const username = 'player1'
export const password = 'testPassword'

export const authInfoResponse = {
  jwt: 'abcd',
  playerCharacterId: playerCharacter1Id,
  role: 'player',
  username,
}

export const authInfoGmResponse = {
  jwt: 'abcd',
  role: 'gm',
  username: 'theBoss',
}
