import styled, { css } from 'styled-components/macro'
import { baseSpacing, colours, fontFamilies } from 'styles/constants'
import mq from 'styles/mediaQueries'
import rgbToRgba from 'utils/rgbToRgba'

const healedStyles = css`
  opacity: 0.5;
  text-decoration: line-through;
`
export const StyledCriticalInjury = styled.div`
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${baseSpacing / 2}px;
  padding: ${baseSpacing / 2}px;

  @media ${mq.tablet}, ${mq.laptop}, ${mq.desktop}, ${mq.bigDesktop} {
    grid-template-columns: 1fr 2fr 1fr;
  }

  & > * {
    ${({ deleting, editing }) => deleting && editing && healedStyles}
  }

  & > h4 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    text-align: left;

    &:first-child {
      color: ${colours.lightOrange};
    }

    span {
      font-family: "${fontFamilies.GenesysSymbols}", Times New Roman, serif;
      color: ${colours.darkPurple};
      height: 100%;
      display: flex;
      align-items: center;
    }
  }

  p {
    margin: 0;
    color: ${colours.teal};
    text-align: justify;
    opacity: ${({ isCharacter, persistent }) =>
      isCharacter && !persistent && '0.5'};

    @media ${mq.tablet}, ${mq.laptop}, ${mq.desktop}, ${mq.bigDesktop} {
      grid-column: 1/4;
    }
  }

  button {
    grid-column: 1/4;
  }
`

export const StyledButton = styled.button`
  width: 100%;
  padding: ${baseSpacing / 4}px;
  border: 1px solid ${colours.teal};
  border-radius: 5px;
  background: ${rgbToRgba(colours.veryLightBlue, 0.5)};
  cursor: pointer;
  text-transform: uppercase;
  opacity: 1;
  text-decoration: none;

  & > h4 {
    width: 100%;
    text-decoration: none;
    opacity: 1;
    margin: 0;
    text-align: center;
  }

  &:hover {
    background-color: ${colours.teal};

    h4 {
      color: ${colours.veryLightBlue};
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
