import styled, { css } from 'styled-components/macro'
import { baseSpacing, colours, fontFamilies } from 'styles/constants'
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
    grid-template-columns: ${({ adding }) =>
      adding ? '3fr 10fr 1fr' : '3fr 10fr'};
    grid-template-rows: ${({ editing }) =>
      editing ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)'};
  }

  & > label {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    align-items: flex-end;

    &:first-child {
      align-items: flex-start;
    }

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
    border-radius: 5px;
    background-color: ${colours.veryLightBlue};
    border: 1px solid ${colours.teal};
    color: ${colours.teal};
    text-align: justify;
    font-family: "${fontFamilies.MinionPro}", Times New Roman, serif;
    font-size: 16px;
    padding: ${baseSpacing / 4}px;
  }

  & > h4 {
    display: flex;
    margin: 0;
    text-transform: uppercase;
    align-items: center;

    &:first-child {
      align-items: flex-start;
    }
  }

  ${({ adding }) => !adding && 'div,'}
  label[for='description'] {
    grid-column: 1/3;
    text-align: justify;

    @media ${mq.tablet}, ${mq.laptop}, ${mq.bigDesktop} {
      grid-column: 2;
      grid-row: ${({ editing }) => (editing ? '1/4' : '1/3')};
    }
  }
`

export const StyledButtons = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${baseSpacing / 2}px;
  grid-column: 1/3;
  z-index: auto;

  svg {
    font-size: 20px;
  }

  @media ${mq.tablet}, ${mq.laptop}, ${mq.bigDesktop} {
    grid-template-columns: 1fr;
    grid-column: 3;
    grid-row: 1/3;
  }
`

export const StyledButton = styled.button`
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${colours.teal};
  font-size: 20px;
  text-decoration: none;
  grid-column: 1/3;

  @media ${mq.tablet}, ${mq.laptop}, ${mq.bigDesktop} {
    text-align: left;
    grid-column: 1;
  }

  &:disabled {
    color: ${colours.lightTeal};
    cursor: not-allowed;
  }
`
