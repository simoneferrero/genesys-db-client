import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { archetypeType } from 'types/archetypes'
import { careerType } from 'types/careers'
import { playerCharacterType } from 'types/playersCharacters'
import { uiType } from 'types/ui'

import { Helmet } from 'react-helmet'
import { HEAD_INFO } from 'utils/definitions'

import Header from 'components/Header'
import PCSummary from 'components/PCSummary'
import Spinner from 'components/Spinner'

import styled, { css } from 'styled-components/macro'
import { baseSpacing, headerHeight } from 'styles/constants'
import mq from 'styles/mediaQueries'

const StyledWrapper = styled.div`
  width: 100vw;
  padding: ${baseSpacing}px ${baseSpacing * 2}px;
  padding-top: ${baseSpacing + headerHeight}px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-column-gap: ${baseSpacing}px;
  grid-row-gap: ${baseSpacing}px;

  @media ${mq.laptop}, ${mq.desktop} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${mq.bigDesktop} {
    grid-template-columns: repeat(3, 1fr);
  }
`

const spinnerWithDataStyles = css`
  position: fixed;
  bottom: 0 !important;
  right: 0 !important;
  padding: ${baseSpacing / 2}px;
`
const StyledSpinner = styled(Spinner)`
  ${({ cover }) => !cover && spinnerWithDataStyles}
`

/** Summary of all players' characters. */
const PlayersCharacters = ({
  archetypesById,
  careersById,
  getArchetypes,
  getCareers,
  getPlayersCharacters,
  playersCharactersAllIds,
  playersCharactersById,
  playersCharactersUi,
}) => {
  useEffect(() => {
    getArchetypes()
    getCareers()
    getPlayersCharacters()
  }, [])

  const playersCharacters = playersCharactersAllIds.map((id) => {
    const playerCharacter = playersCharactersById[id]
    const pcSummaryProps = {
      ...playerCharacter,
      archetype: archetypesById[playerCharacter.archetype],
      career: careersById[playerCharacter.career],
    }
    return <PCSummary key={id} {...pcSummaryProps} />
  })

  // Logic for spinner
  const cover = playersCharactersAllIds.length === 0

  return (
    <>
      <Helmet title={HEAD_INFO.PLAYERS_CHARACTERS_TITLE} />
      <StyledWrapper data-testid="players-characters">
        <Header>{HEAD_INFO.PLAYERS_CHARACTERS_TITLE}</Header>
        {playersCharacters}
      </StyledWrapper>
      {playersCharactersUi.loading && (
        <StyledSpinner cover={cover} size={cover ? 80 : 40} />
      )}
    </>
  )
}

PlayersCharacters.propTypes = {
  /** Archetype data */
  archetypesById: PropTypes.objectOf(archetypeType).isRequired,
  /** Career data */
  careersById: PropTypes.objectOf(careerType).isRequired,
  /** Dispatched to fetch a list of archetypes */
  getArchetypes: PropTypes.func.isRequired,
  /** Dispatched to fetch a list of careers */
  getCareers: PropTypes.func.isRequired,
  /** Dispatched to fetch players' characters data */
  getPlayersCharacters: PropTypes.func.isRequired,
  /** Players' characters ordered ids */
  playersCharactersAllIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  /** Players' characters data */
  playersCharactersById: PropTypes.objectOf(playerCharacterType).isRequired,
  /** Players' characters loader and error information */
  playersCharactersUi: uiType.isRequired,
}

export default PlayersCharacters
