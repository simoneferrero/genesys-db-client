import { createSelector } from 'reselect'
import { uiSelector } from 'reducers/ui/selectors'

export const criticalInjuriesUiSelector = createSelector(
  uiSelector,
  (ui) => ui.get('criticalInjuries'),
)
