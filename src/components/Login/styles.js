import styled, { css } from 'styled-components/macro'
import { baseSpacing, colours } from 'styles/constants'
import mq from 'styles/mediaQueries'
import rgbToRgba from 'utils/rgbToRgba'

export const StyledForm = styled.form`
  padding: ${baseSpacing / 2}px;
  position: relative;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: ${baseSpacing / 4}px;
  width: 200px;

  @media ${mq.laptop}, ${mq.desktop}, ${mq.bigDesktop} {
    grid-template-columns: repeat(3, 1fr);

    width: 700px;

    & > p {
      grid-column: 1/4;
    }
  }

  * {
    width: 100%;
    box-sizing: border-box;
    font-size: 20px;

    @media ${mq.laptop}, ${mq.desktop}, ${mq.bigDesktop} {
      font-size: 14px;
    }
  }

  & > p {
    font-size: 14px;
    color: ${colours.orange};
    text-align: center;
    margin: 0;
  }
`

const errorStyles = css`
  border-color: ${colours.orange};
  color: ${colours.orange};
`
export const StyledField = styled.input`
  padding: ${baseSpacing / 4}px;
  border: 2px solid ${colours.lightOrange};
  border-radius: 5px;
  background: ${rgbToRgba(colours.lightTeal, 0.1)};
  color: ${colours.teal};

  &::placeholder {
    color: ${rgbToRgba(colours.teal, 0.7)};
  }

  ${({ hasError }) => hasError && errorStyles}
`

export const StyledButton = styled.button`
  padding: ${baseSpacing / 4}px;
  border: 2px solid ${colours.teal};
  border-radius: 5px;
  background: ${rgbToRgba(colours.veryLightBlue, 0.5)};
  cursor: pointer;
  color: ${colours.teal};
  text-transform: uppercase;

  & > h4 {
    margin: 0;
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
