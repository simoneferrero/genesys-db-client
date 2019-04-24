import React, { lazy, memo, Suspense, useEffect } from 'react'
import PropTypes from 'prop-types'
import { playerCharacterType } from 'types/playersCharacters'
import { uiType } from 'types/ui'

import { Helmet } from 'react-helmet'
import { HEAD_INFO } from 'utils/definitions'

import Header from 'components/Header'
import Spinner from 'components/Spinner'

import styled from 'styled-components/macro'
import { baseSpacing, headerHeight } from 'styles/constants'

const PCSummary = lazy(() => import('components/PCSummary'))

const StyledWrapper = styled.div`
  width: 100vw;
  padding: ${baseSpacing}px ${baseSpacing * 2}px;
  padding-top: ${baseSpacing + headerHeight}px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-column-gap: ${baseSpacing}px;
  grid-row-gap: ${baseSpacing}px;
`

/** Summary of all players' characters. */
export const PlayersCharacters = ({
  getArchetypes,
  getAuthInfo,
  getCareers,
  getPlayersCharacters,
  playersCharacters,
  playersCharactersUi,
}) => {
  useEffect(() => {
    getAuthInfo()
  }, [getAuthInfo])
  useEffect(() => {
    getArchetypes()
  }, [getArchetypes])
  useEffect(() => {
    getCareers()
  }, [getCareers])
  useEffect(() => {
    getPlayersCharacters()
  }, [getPlayersCharacters])

  const PCSummaries = playersCharacters.map((playerCharacter) => (
    <PCSummary key={playerCharacter.id} {...playerCharacter} />
  ))

  return (
    <>
      <Helmet title={HEAD_INFO.PLAYERS_CHARACTERS_TITLE} />
      <StyledWrapper data-testid="players-characters">
        <Header>{HEAD_INFO.PLAYERS_CHARACTERS_TITLE}</Header>
        <Suspense fallback={<Spinner />}>{PCSummaries}</Suspense>
      </StyledWrapper>
      {playersCharactersUi.loading && <Spinner />}
    </>
  )
}

PlayersCharacters.propTypes = {
  /** Dispatched to fetch a list of archetypes */
  getArchetypes: PropTypes.func.isRequired,
  /** Dispatched to get user data */
  getAuthInfo: PropTypes.func.isRequired,
  /** Dispatched to fetch a list of careers */
  getCareers: PropTypes.func.isRequired,
  /** Dispatched to fetch players' characters data */
  getPlayersCharacters: PropTypes.func.isRequired,
  /** Players' characters data */
  playersCharacters: PropTypes.arrayOf(playerCharacterType).isRequired,
  /** Players' characters loader and error information */
  playersCharactersUi: uiType.isRequired,
}

export default memo(PlayersCharacters)
