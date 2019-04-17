import { createSelector } from 'reselect'
import { uiSelector } from 'reducers/ui/selectors'

export const favorsUiSelector = createSelector(
  uiSelector,
  (ui) => ui.get('favors'),
)
