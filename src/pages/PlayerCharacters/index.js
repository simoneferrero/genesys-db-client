import React from 'react'

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
const Home = () => (
  <StyledWrapper data-testid="player-characters">
    <h1>Player characters</h1>
  </StyledWrapper>
)

export default Home
