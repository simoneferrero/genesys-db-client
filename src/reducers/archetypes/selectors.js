import { createSelector } from 'reselect'

export const archetypesSelector = (state) => state.get('archetypes')

export const archetypesByIdSelector = createSelector(
  archetypesSelector,
  (archetypes) => archetypes.get('byId'),
)

export const archetypesAllIdsSelector = createSelector(
  archetypesSelector,
  (archetypes) => archetypes.get('allIds'),
)
