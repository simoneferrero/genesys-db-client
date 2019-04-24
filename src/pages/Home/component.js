import React, { memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { authInfoType } from 'types/authentication'

import Login from 'components/Login'
import GenesysLogo from 'vectors/GenesysLogo'

import styled from 'styled-components/macro'

const StyledWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > h1 {
    text-transform: uppercase;
  }
`

export const Home = ({ authInfo: { username }, getAuthInfo, login }) => {
  useEffect(() => {
    getAuthInfo()
  }, [getAuthInfo])

  return (
    <StyledWrapper data-testid="home">
      <GenesysLogo width={300} />
      <h1>Genesys DB</h1>
      {username ? <h4>Hello, {username}!</h4> : <Login handleSubmit={login} />}
    </StyledWrapper>
  )
}

Home.propTypes = {
  /** Data about the user */
  authInfo: authInfoType.isRequired,
  /** Dispatched to get a user's info */
  getAuthInfo: PropTypes.func.isRequired,
  /** Dispatched on login */
  login: PropTypes.func.isRequired,
}

export default memo(Home)
