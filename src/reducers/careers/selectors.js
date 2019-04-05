import { createSelector } from 'reselect'

export const careersSelector = (state) => state.get('careers')

export const careersByIdSelector = createSelector(
  careersSelector,
  (careers) => careers.get('byId'),
)

export const careersAllIdsSelector = createSelector(
  careersSelector,
  (careers) => careers.get('allIds'),
)
