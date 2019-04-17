import styled, { css } from 'styled-components/macro'
import { baseSpacing } from 'styles/constants'
import mq from 'styles/mediaQueries'

const completedStyles = css`
  text-decoration: line-through;
  opacity: 0.5;
`
export const StyledForm = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${baseSpacing / 2}px;
  ${({ completed }) => completed && completedStyles};

  @media ${mq.tablet}, ${mq.laptop}, ${mq.bigDesktop} {
    grid-template-columns: ${({ editing }) =>
      editing ? '2fr 10fr 1fr' : '2fr 10fr'};
    grid-template-rows: repeat(2, 1fr);
  }

  & > label {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    @media ${mq.tablet}, ${mq.laptop}, ${mq.bigDesktop} {
      grid-column: 1/2;
    }

    & > input {
      width: 100%;
    }
  }

  textarea {
    width: 100%;
    height: 100%;
  }

  & > h4 {
    margin: 0;
    text-transform: uppercase;
  }

  ${({ editing }) => !editing && 'div,'}
  label[for='description'] {
    grid-column: 1/3;
    text-align: justify;

    @media ${mq.tablet}, ${mq.laptop}, ${mq.bigDesktop} {
      grid-column: 2;
      grid-row: 1/3;
    }
  }
`

export const StyledButtons = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${baseSpacing / 2}px;
  grid-column: 1/3;

  svg {
    font-size: 20px;
  }

  @media ${mq.tablet}, ${mq.laptop}, ${mq.bigDesktop} {
    grid-template-columns: 1fr;
    grid-column: 3;
    grid-row: 1/3;
  }
`
