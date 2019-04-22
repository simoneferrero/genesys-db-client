import { createSelector } from 'reselect'
import { uiSelector } from 'reducers/ui/selectors'

export const skillsUiSelector = createSelector(
  uiSelector,
  (ui) => ui.get('skills'),
)
