import { createSelector } from 'reselect'
import { uiSelector } from 'reducers/ui/selectors'

export const careersUiSelector = createSelector(
  uiSelector,
  (ui) => ui.get('careers'),
)
