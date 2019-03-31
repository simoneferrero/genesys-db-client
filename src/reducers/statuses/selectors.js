import { createSelector } from 'reselect'

export const statusesSelector = (state) => state.get('statuses')

export const statusesByIdSelector = createSelector(
  statusesSelector,
  (statuses) => statuses.get('byId'),
)

export const statusesAllIdsSelector = createSelector(
  statusesSelector,
  (statuses) => statuses.get('allIds'),
)

// It's also possible to export denormalised data combining the above
// in a separate selector
