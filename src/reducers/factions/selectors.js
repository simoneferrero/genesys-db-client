import { createSelector } from 'reselect'

export const factionsSelector = (state) => state.get('factions')

export const factionsByIdSelector = createSelector(
  factionsSelector,
  (factions) => factions.get('byId'),
)

export const factionsAllIdsSelector = createSelector(
  factionsSelector,
  (factions) => factions.get('allIds'),
)
