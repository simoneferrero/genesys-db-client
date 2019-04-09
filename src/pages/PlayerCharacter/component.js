import React, { memo, Suspense, useEffect } from 'react'
import PropTypes from 'prop-types'
import { playerCharacterType } from 'types/playersCharacters'
import { uiType } from 'types/ui'

import { Helmet } from 'react-helmet'

import Header from 'components/Header'
import Spinner from 'components/Spinner'

import styled from 'styled-components/macro'
import { baseSpacing, headerHeight } from 'styles/constants'

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
export const PlayerCharacter = ({
  getArchetypes,
  getCareers,
  getPlayerCharacter,
  playerCharacter,
  playerCharacterId,
  playersCharactersUi,
}) => {
  useEffect(() => {
    getArchetypes()
    getCareers()
    getPlayerCharacter(playerCharacterId)
  }, [])

  return (
    <>
      <Helmet title={playerCharacter.name} />
      <StyledWrapper data-testid="player-character">
        {playerCharacter.name && <Header>{playerCharacter.name}</Header>}
        <Suspense fallback={<Spinner />}>
          <div>Hello!</div>
        </Suspense>
      </StyledWrapper>
      {playersCharactersUi.loading && <Spinner />}
    </>
  )
}

PlayerCharacter.propTypes = {
  /** Dispatched to fetch a list of archetypes */
  getArchetypes: PropTypes.func.isRequired,
  /** Dispatched to fetch a list of careers */
  getCareers: PropTypes.func.isRequired,
  /** Dispatched to fetch player character data */
  getPlayerCharacter: PropTypes.func.isRequired,
  /** Player character data */
  playerCharacter: playerCharacterType.isRequired,
  /** Current player character ID */
  playerCharacterId: PropTypes.string.isRequired,
  /** Players' characters loader and error information */
  playersCharactersUi: uiType.isRequired,
}

export default memo(PlayerCharacter)
