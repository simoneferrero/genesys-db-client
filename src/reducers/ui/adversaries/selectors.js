import { createSelector } from 'reselect'
import { uiSelector } from 'reducers/ui/selectors'

export const adversariesUiSelector = createSelector(
  uiSelector,
  (ui) => ui.get('adversaries'),
)
