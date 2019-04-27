import React, { lazy, memo, Suspense, useEffect } from 'react'
import PropTypes from 'prop-types'
import { authInfoType } from 'types/authentication'
import { uiType } from 'types/ui'
import { skillType } from 'types/skills'
import { weaponType } from 'types/weapons'

import { Helmet } from 'react-helmet'
import { HEAD_INFO } from 'utils/definitions'

import Header from 'components/Header'
import Spinner from 'components/Spinner'

import styled from 'styled-components/macro'
import { baseSpacing, headerHeight } from 'styles/constants'

const WeaponsSection = lazy(() => import('components/WeaponsSection'))

const StyledWrapper = styled.div`
  width: 100vw;
  padding: ${baseSpacing}px ${baseSpacing * 2}px;
  padding-top: ${baseSpacing + headerHeight}px;
`

export const Weapons = ({
  addWeapon,
  authInfo: { role },
  getAuthInfo,
  getSkills,
  getWeapons,
  skills,
  skillsUi,
  weapons,
  weaponsUi,
}) => {
  useEffect(() => {
    getAuthInfo()
  }, [getAuthInfo])
  useEffect(() => {
    getSkills()
  }, [getSkills])
  useEffect(() => {
    getWeapons()
  }, [getWeapons])

  const loading = weaponsUi.loading || skillsUi.loading

  return (
    <>
      <Helmet title={HEAD_INFO.WEAPONS} />
      <StyledWrapper data-testid="weapons">
        <Header>{HEAD_INFO.WEAPONS}</Header>
        <Suspense fallback={<Spinner />}>
          <WeaponsSection
            handleSubmit={addWeapon}
            showAdd={role === 'gm'}
            skills={skills}
            weapons={weapons}
          />
        </Suspense>
      </StyledWrapper>
      {loading && <Spinner />}
    </>
  )
}

Weapons.propTypes = {
  /** Dispatched when adding a new weapon */
  addWeapon: PropTypes.func.isRequired,
  /** Data about the user */
  authInfo: authInfoType.isRequired,
  /** Dispatched to get a user's info */
  getAuthInfo: PropTypes.func.isRequired,
  /** Dispatched to get all skills */
  getSkills: PropTypes.func.isRequired,
  /** Dispatched to get all weapons */
  getWeapons: PropTypes.func.isRequired,
  /** Skills data */
  skills: PropTypes.objectOf(skillType).isRequired,
  /** Skills' characters loader and error information */
  skillsUi: uiType.isRequired,
  /** Weapons data */
  weapons: PropTypes.objectOf(weaponType).isRequired,
  /** Weapons' characters loader and error information */
  weaponsUi: uiType.isRequired,
}

export default memo(Weapons)
