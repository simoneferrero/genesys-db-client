import styled from 'styled-components/macro'
import { baseSpacing, borderRadius, colours } from 'styles/constants'
import mq from 'styles/mediaQueries'
import rgbToRgba from 'utils/rgbToRgba'

export const StyledFavors = styled.div`
  display: grid;
  grid-template-columns: 1;
  grid-gap: ${baseSpacing}px;

  @media ${mq.bigDesktop} {
    grid-template-columns: 2;
  }
`

export const StyledSection = styled.section`
  padding: ${baseSpacing / 2}px;
  border: 2px solid ${colours.lightOrange};
  border-radius: ${borderRadius}px;
  background-color: ${rgbToRgba(colours.lightTeal, 0.1)};
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
    justify-content: flex-end;
  }
`

export const StyledButton = styled.button`
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${colours.lightOrange};
  font-size: 30px;
  text-decoration: none;

  @media ${mq.tablet}, ${mq.laptop}, ${mq.bigDesktop} {
    text-align: left;
    grid-column: 1;
  }

  &:disabled {
    color: ${colours.lightTeal};
    cursor: not-allowed;
  }
`

export const StyledContainer = styled.div`
  grid-column: 1/3;
  @media ${mq.bigDesktop} {
    column-count: 2;
  }

  & > form:not(:last-child) {
    margin-bottom: ${baseSpacing / 2}px;
  }
`
