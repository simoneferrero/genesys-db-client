import styled, { css } from 'styled-components/macro'
import { baseSpacing, colours, fontFamilies } from 'styles/constants'
import rgbToRgba from 'utils/rgbToRgba'

const completedStyles = css`
  text-decoration: line-through;
  opacity: 0.5;
`
const descriptionStyles = css`
  grid-column: 1/4;
  text-align: justify;
`
export const StyledFavor = styled.div`
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: ${({ isNew }) =>
    isNew ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'};
  grid-gap: ${baseSpacing / 4}px;
  padding: ${baseSpacing / 2}px;

  /* ExistingFavor */
  h4 {
    ${({ isComplete }) => isComplete && completedStyles};
    display: flex;
    margin: 0;
    align-items: center;
    justify-content: center;

    &:first-child {
      justify-content: flex-start;
    }
  }

  & > div:not(:last-child) {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  & > div:last-child {
    ${({ isComplete }) => isComplete && completedStyles};
    ${({ isNew }) => !isNew && descriptionStyles}
  }

  /* NewFavor */
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
    text-align: justify;
  }

  label[for='description'] {
    grid-column: 1/3;
  }
`

export const StyledButton = styled.button`
  padding: ${baseSpacing / 4}px;
  border: 1px solid ${colours.teal};
  border-radius: 5px;
  background: ${rgbToRgba(colours.veryLightBlue, 0.5)};
  cursor: pointer;
  color: ${colours.teal};
  text-transform: uppercase;

  & > h4 {
    text-decoration: none;
    opacity: 1;
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
