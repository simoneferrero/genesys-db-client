import { createSelector } from 'reselect'
import { uiSelector } from 'reducers/ui/selectors'

export const authenticationUiSelector = createSelector(
  uiSelector,
  (ui) => ui.get('authentication'),
)
