import React, { lazy, memo, Suspense, useEffect } from 'react'
import PropTypes from 'prop-types'
import { authInfoType } from 'types/authentication'
import { uiType } from 'types/ui'
import { talentType } from 'types/talents'

import { Helmet } from 'react-helmet'
import { HEAD_INFO } from 'utils/definitions'

import Header from 'components/Header'
import Spinner from 'components/Spinner'

import styled from 'styled-components/macro'
import { baseSpacing, headerHeight } from 'styles/constants'

const TalentsSection = lazy(() => import('components/TalentsSection'))

const StyledWrapper = styled.div`
  width: 100vw;
  padding: ${baseSpacing}px ${baseSpacing * 2}px;
  padding-top: ${baseSpacing + headerHeight}px;
`

export const Talents = ({
  addTalent,
  authInfo: { role },
  getAuthInfo,
  getTalents,
  talents,
  talentsUi,
}) => {
  useEffect(() => {
    getAuthInfo()
  }, [getAuthInfo])
  useEffect(() => {
    getTalents()
  }, [getTalents])

  const loading = talentsUi.loading

  return (
    <>
      <Helmet title={HEAD_INFO.TALENTS} />
      <StyledWrapper data-testid="talents">
        <Header>{HEAD_INFO.TALENTS}</Header>
        <Suspense fallback={<Spinner />}>
          <TalentsSection
            handleSubmit={addTalent}
            showAdd={role === 'gm'}
            talents={talents}
          />
        </Suspense>
      </StyledWrapper>
      {loading && <Spinner />}
    </>
  )
}

Talents.propTypes = {
  /** Dispatched when adding a new talent */
  addTalent: PropTypes.func.isRequired,
  /** Data about the user */
  authInfo: authInfoType.isRequired,
  /** Dispatched to get a user's info */
  getAuthInfo: PropTypes.func.isRequired,
  /** Dispatched to get all talents */
  getTalents: PropTypes.func.isRequired,
  /** Talents data */
  talents: PropTypes.objectOf(talentType).isRequired,
  /** Talents loader and error information */
  talentsUi: uiType.isRequired,
}

export default memo(Talents)
