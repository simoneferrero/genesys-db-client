import { createSelector } from 'reselect'
import { uiSelector } from 'reducers/ui/selectors'

export const factionsUiSelector = createSelector(
  uiSelector,
  (ui) => ui.get('factions'),
)
