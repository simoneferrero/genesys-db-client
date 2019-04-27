import { createSelector } from 'reselect'

export const weaponsSelector = (state) => state.get('weapons')

export const weaponsByIdSelector = createSelector(
  weaponsSelector,
  (weapons) => weapons.get('byId'),
)

export const weaponsAllIdsSelector = createSelector(
  weaponsSelector,
  (weapons) => weapons.get('allIds'),
)
