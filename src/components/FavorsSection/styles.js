import styled from 'styled-components/macro'
import { baseSpacing, colours } from 'styles/constants'
import mq from 'styles/mediaQueries'

export const StyledForm = styled.div`
  padding: ${baseSpacing / 2}px;
  position: relative;
`

export const StyledSubHeader = styled.div`
  display: flex;
  justify-content: space-between;

  h3 {
    width: 100%;
    margin: 0;
    text-transform: uppercase;
    color: ${colours.lightOrange};
    text-shadow: 1px 1px ${colours.veryLightOrange};
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  div {
    display: flex;

    & > button {
      font-size: 25px;
      padding: ${baseSpacing / 4}px;
    }
  }
`

export const StyledContainer = styled.div`
  grid-column: 1/3;
  display: grid;
  grid-gap: 24px;
  grid-template-columns: 1fr;

  @media ${mq.bigDesktop} {
    grid-template-columns: repeat(2, 1fr);
  }

  & > form:not(:last-child) {
    margin-bottom: ${baseSpacing / 2}px;
  }
`
