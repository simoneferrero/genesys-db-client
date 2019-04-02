import { createSelector } from 'reselect'
import { uiSelector } from 'reducers/ui/selectors'

export const playerCharactersUiSelector = createSelector(
  uiSelector,
  (ui) => ui.get('playerCharacters'),
)
