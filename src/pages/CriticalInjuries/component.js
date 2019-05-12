import React, { lazy, memo, Suspense, useEffect } from 'react'
import PropTypes from 'prop-types'
import { uiType } from 'types/ui'
import { criticalInjuryType } from 'types/criticalInjuries'

import { Helmet } from 'react-helmet'
import { HEAD_INFO } from 'utils/definitions'

import Header from 'components/Header'
import Spinner from 'components/Spinner'

import styled from 'styled-components/macro'
import { baseSpacing, headerHeight } from 'styles/constants'

const CriticalInjuriesSection = lazy(() =>
  import('components/CriticalInjuriesSection'),
)

const StyledWrapper = styled.div`
  width: 100vw;
  padding: ${baseSpacing}px ${baseSpacing * 2}px;
  padding-top: ${baseSpacing + headerHeight}px;
`

export const CriticalInjuries = ({
  criticalInjuries,
  criticalInjuriesUi,
  getAuthInfo,
  getCriticalInjuries,
}) => {
  useEffect(() => {
    getAuthInfo()
  }, [getAuthInfo])
  useEffect(() => {
    getCriticalInjuries()
  }, [getCriticalInjuries])

  const loading = criticalInjuriesUi.loading

  return (
    <>
      <Helmet title={HEAD_INFO.WEAPONS} />
      <StyledWrapper data-testid="criticalInjuries">
        <Header>{HEAD_INFO.WEAPONS}</Header>
        <Suspense fallback={<Spinner />}>
          <CriticalInjuriesSection criticalInjuries={criticalInjuries} />
        </Suspense>
      </StyledWrapper>
      {loading && <Spinner />}
    </>
  )
}

CriticalInjuries.propTypes = {
  /** Critical injuries data */
  criticalInjuries: PropTypes.arrayOf(criticalInjuryType).isRequired,
  /** Critical injuries loader and error information */
  criticalInjuriesUi: uiType.isRequired,
  /** Dispatched to get a user's info */
  getAuthInfo: PropTypes.func.isRequired,
  /** Dispatched to get all critical injuries */
  getCriticalInjuries: PropTypes.func.isRequired,
}

export default memo(CriticalInjuries)
