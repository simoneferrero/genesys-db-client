import { createSelector } from 'reselect'
import { uiSelector } from 'reducers/ui/selectors'

export const weaponsUiSelector = createSelector(
  uiSelector,
  (ui) => ui.get('weapons'),
)
