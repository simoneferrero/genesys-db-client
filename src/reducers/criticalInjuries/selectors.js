import { createSelector } from 'reselect'

export const criticalInjuriesSelector = (state) => state.get('criticalInjuries')

export const criticalInjuriesByIdSelector = createSelector(
  criticalInjuriesSelector,
  (criticalInjuries) => criticalInjuries.get('byId'),
)

export const criticalInjuriesAllIdsSelector = createSelector(
  criticalInjuriesSelector,
  (criticalInjuries) => criticalInjuries.get('allIds'),
)

export const criticalInjuriesOrderedSelector = createSelector(
  criticalInjuriesAllIdsSelector,
  criticalInjuriesByIdSelector,
  (criticalInjuriesAllIds, criticalInjuriesById) =>
    criticalInjuriesAllIds.map((id) => criticalInjuriesById.get(id)),
)
