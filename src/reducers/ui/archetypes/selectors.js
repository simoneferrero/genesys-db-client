import { createSelector } from 'reselect'
import { uiSelector } from 'reducers/ui/selectors'

export const archetypesUiSelector = createSelector(
  uiSelector,
  (ui) => ui.get('archetypes'),
)
