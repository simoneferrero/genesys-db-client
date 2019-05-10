import styled from 'styled-components/macro'
import { baseSpacing, colours, fontFamilies } from 'styles/constants'
import rgbToRgba from 'utils/rgbToRgba'

export const StyledCriticalInjury = styled.div`
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: 'repeat(3, 1fr)';
  grid-gap: ${baseSpacing / 4}px;
  padding: ${baseSpacing / 2}px;

  h4 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    text-align: center;

    &:first-child {
      text-align: left;
    }
  }

  & > div:not(:last-child) {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  & > div:last-child {
    color: ${colours.teal};
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
