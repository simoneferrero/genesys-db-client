import { createSelector } from 'reselect'

export const playerCharactersSelector = (state) => state.get('playerCharacters')

export const playerCharactersByIdSelector = createSelector(
  playerCharactersSelector,
  (playerCharacters) => playerCharacters.get('byId'),
)

export const playerCharactersAllIdsSelector = createSelector(
  playerCharactersSelector,
  (playerCharacters) => playerCharacters.get('allIds'),
)
