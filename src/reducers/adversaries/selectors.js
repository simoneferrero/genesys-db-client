import { createSelector } from 'reselect'

import { criticalInjuriesByIdSelector } from 'reducers/criticalInjuries/selectors'
import { adversaryIdSelector } from 'reducers/router/selectors'
import { skillsByIdSelector } from 'reducers/skills/selectors'
import { talentsByIdSelector } from 'reducers/talents/selectors'
import { weaponsByIdSelector } from 'reducers/weapons/selectors'

import AdversaryRecord from 'reducers/adversaries/records'

export const adversariesSelector = (state) => state.get('adversaries')

export const adversariesByIdSelector = createSelector(
  adversariesSelector,
  criticalInjuriesByIdSelector,
  skillsByIdSelector,
  talentsByIdSelector,
  weaponsByIdSelector,
  (adversaries, criticalInjuriesById, skillsById, talentsById, weaponsById) =>
    adversaries.get('byId').map((adversary) => {
      const augmentedData = {
        ...(!criticalInjuriesById.isEmpty()
          ? {
              critical_injuries: adversary
                .get('critical_injuries')
                .map((adversaryCriticalInjury) => {
                  const criticalInjuryId = adversaryCriticalInjury.get(
                    'critical_injury_id',
                  )
                  const criticalInjury = criticalInjuriesById.get(
                    criticalInjuryId,
                  )
                  return criticalInjury.merge(adversaryCriticalInjury)
                }),
            }
          : {}),
        ...(!skillsById.isEmpty()
          ? {
              skills: adversary.get('skills').map((skill) => {
                const skillId = skill.get('id')
                const skillData = skillsById.get(skillId)
                return skill.merge(skillData)
              }),
            }
          : []),
        ...(!talentsById.isEmpty()
          ? {
              talents: adversary.get('talents').map((adversaryTalent) => {
                const talentId = adversaryTalent.get('talent_id')
                const talent = talentsById.get(talentId)
                return talent.merge(adversaryTalent)
              }),
            }
          : {}),
        ...(!weaponsById.isEmpty()
          ? {
              weapons: adversary.get('weapons').map((weapon) => {
                const id = weapon.get('id')
                const mods = weapon.get('mods')
                const weapon_id = weapon.get('weapon_id')
                const originalWeapon = weaponsById.get(`${weapon_id}`)

                return originalWeapon.merge({
                  mods,
                  id,
                })
              }),
            }
          : {}),
      }

      return adversary.merge(augmentedData)
    }),
)

export const adversariesAllIdsSelector = createSelector(
  adversariesSelector,
  (adversaries) => adversaries.get('allIds'),
)

export const allAdversariesSelector = createSelector(
  adversariesAllIdsSelector,
  adversariesByIdSelector,
  (adversariesAllIds, adversariesById) =>
    adversariesAllIds.map((id) => adversariesById.get(`${id}`)),
)

export const currentAdversarySelector = createSelector(
  adversaryIdSelector,
  adversariesByIdSelector,
  (adversaryId, adversariesById) =>
    adversariesById.get(adversaryId) ||
    new AdversaryRecord({ id: Number(adversaryId) }),
)
