import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { playerCharacterType } from 'types/playerCharacters'

import styled from 'styled-components/macro'

const StyledWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

/** The page with a summary of all player characters. */
const PlayerCharacters = ({
  getPlayerCharacters,
  // playerCharactersAllIds,
  // playerCharactersById,
}) => {
  useEffect(() => {
    getPlayerCharacters()
  }, [])

  return (
    <StyledWrapper data-testid="player-characters">
      <h1>Player characters</h1>
    </StyledWrapper>
  )
}

PlayerCharacters.propTypes = {
  getPlayerCharacters: PropTypes.func.isRequired,
  playerCharactersAllIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  playerCharactersById: PropTypes.objectOf(playerCharacterType).isRequired,
}

export default PlayerCharacters
