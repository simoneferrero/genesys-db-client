import { createSelector } from 'reselect'
import { uiSelector } from 'reducers/ui/selectors'

export const playersCharactersUiSelector = createSelector(
  uiSelector,
  (ui) => ui.get('playersCharacters'),
)
