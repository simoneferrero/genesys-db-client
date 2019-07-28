import React, { memo, Suspense, useEffect } from 'react'
import PropTypes from 'prop-types'
import { adversaryType } from 'types/adversaries'
import { uiType } from 'types/ui'

import { Helmet } from 'react-helmet'
import { HEAD_INFO } from 'utils/definitions'

import Header from 'components/Header'
import Spinner from 'components/Spinner'

import styled from 'styled-components/macro'
import { baseSpacing, headerHeight } from 'styles/constants'

// const PCSummary = lazy(() => import('components/PCSummary')) // TODO: use adversary summary

const StyledWrapper = styled.div`
  width: 100vw;
  padding: ${baseSpacing}px ${baseSpacing * 2}px;
  padding-top: ${baseSpacing + headerHeight}px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-column-gap: ${baseSpacing}px;
  grid-row-gap: ${baseSpacing}px;
`

/** Summary of all adversaries. */
export const Adversaries = ({
  getAuthInfo,
  getAdversaries,
  adversaries,
  adversariesUi,
}) => {
  useEffect(() => {
    getAuthInfo()
  }, [getAuthInfo])
  useEffect(() => {
    getAdversaries()
  }, [getAdversaries])

  const AdversariesSummaries = adversaries.map((adversary) => (
    <p data-testid={`adversary-${adversary.id}`} key={adversary.id}>
      {adversary.name}
    </p>
  ))
  // const AdversariesSummaries = adversaries.map((adversary) => (
  //   <PCSummary key={adversary.id} {...adversary} />
  // ))

  return (
    <>
      <Helmet title={HEAD_INFO.ADVERSARIES_TITLE} />
      <StyledWrapper data-testid="adversaries">
        <Header>{HEAD_INFO.ADVERSARIES_TITLE}</Header>
        <Suspense fallback={<Spinner />}>{AdversariesSummaries}</Suspense>
      </StyledWrapper>
      {adversariesUi.loading && <Spinner />}
    </>
  )
}

Adversaries.propTypes = {
  /** Dispatched to get user data */
  getAuthInfo: PropTypes.func.isRequired,
  /** Dispatched to fetch adversaries data */
  getAdversaries: PropTypes.func.isRequired,
  /** Adversaries data */
  adversaries: PropTypes.arrayOf(adversaryType).isRequired,
  /** Adversaries loader and error information */
  adversariesUi: uiType.isRequired,
}

export default memo(Adversaries)
