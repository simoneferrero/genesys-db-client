import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { playerCharacterType } from 'types/playerCharacters'

import { Helmet } from 'react-helmet'
import { HEAD_INFO } from 'utils/definitions'

import PCSummary from 'components/PCSummary'

import styled from 'styled-components/macro'
import { baseSpacing } from 'styles/constants'
import mq from 'styles/mediaQueries'

const StyledWrapper = styled.div`
  width: 100vw;
  padding: ${baseSpacing}px ${baseSpacing * 2}px;
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

/** Summary of all players' characters. */
const PlayerCharacters = ({
  getPlayerCharacters,
  playerCharactersAllIds,
  playerCharactersById,
}) => {
  useEffect(() => {
    getPlayerCharacters()
  }, [])

  const playerCharacters = playerCharactersAllIds.map((id) => (
    <PCSummary key={id} {...playerCharactersById[id]} />
  ))

  return (
    <>
      <Helmet title={HEAD_INFO.PLAYER_CHARACTERS_TITLE} />
      <StyledWrapper data-testid="player-characters">
        {playerCharacters}
      </StyledWrapper>
    </>
  )
}

PlayerCharacters.propTypes = {
  /** Dispatched to fetch players' characters data */
  getPlayerCharacters: PropTypes.func.isRequired,
  /** Players' characters ordered ids */
  playerCharactersAllIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  /** Players' characters data */
  playerCharactersById: PropTypes.objectOf(playerCharacterType).isRequired,
}

export default PlayerCharacters
