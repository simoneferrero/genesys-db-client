import { createSelector } from 'reselect'

export const skillsSelector = (state) => state.get('skills')

export const skillsByIdSelector = createSelector(
  skillsSelector,
  (skills) => skills.get('byId'),
)

export const skillsAllIdsSelector = createSelector(
  skillsSelector,
  (skills) => skills.get('allIds'),
)
