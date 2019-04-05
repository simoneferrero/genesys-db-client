import { createSelector } from 'reselect'

export const playersCharactersSelector = (state) =>
  state.get('playersCharacters')

export const playersCharactersByIdSelector = createSelector(
  playersCharactersSelector,
  (playersCharacters) => playersCharacters.get('byId'),
)

export const playersCharactersAllIdsSelector = createSelector(
  playersCharactersSelector,
  (playersCharacters) => playersCharacters.get('allIds'),
)
