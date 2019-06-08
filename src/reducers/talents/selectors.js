import { createSelector } from 'reselect'

export const talentsSelector = (state) => state.get('talents')

export const talentsByIdSelector = createSelector(
  talentsSelector,
  (talents) => talents.get('byId'),
)

export const talentsAllIdsSelector = createSelector(
  talentsSelector,
  (talents) => talents.get('allIds'),
)
