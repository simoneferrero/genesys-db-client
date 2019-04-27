import styled from 'styled-components/macro'
import {
  baseSpacing,
  borderRadius,
  colours,
  fontFamilies,
} from 'styles/constants'
import mq from 'styles/mediaQueries'
import rgbToRgba from 'utils/rgbToRgba'

export const StyledEquipment = styled.div`
  border: 2px solid ${colours.lightOrange};
  border-radius: ${borderRadius}px;
  background-color: ${rgbToRgba(colours.lightTeal, 0.1)};
  position: relative;
  padding: ${baseSpacing / 2}px;
  display: grid;
  grid-gap: ${baseSpacing / 2}px;
  grid-template-columns: 1fr;

  grid-template-areas:
    "money"
    "armor"
    "gear";

  @media ${mq.tablet} {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      "money ."
      "armor armor"
      "gear gear";
  }

  @media ${mq.laptop} {
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
      "money . . ."
      "armor armor gear gear";
  }

  @media ${mq.desktop}, ${mq.bigDesktop} {
    grid-template-columns: repeat(6, 1fr);
    grid-template-areas:
      "money . . . . ."
      "armor armor armor gear gear gear"
  }

  h3 {
    margin: 0;
    color: ${colours.lightOrange};
    text-shadow: 1px 1px ${colours.veryLightOrange};
  }

  div, label {
    width: 100%;
    align-items: baseline;

    &:nth-child(1) {
      grid-area: money;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: ${baseSpacing / 4}px;
    }

    &:nth-child(2) {
      grid-area: armor;
    }

    &:nth-child(3) {
      grid-area: gear;
    }
  }

  div:nth-child(1) {
    grid-template-columns: repeat(2, 1fr);
  }

  p, input, textarea {
    margin: 0;
    width: 100%;
    height: 100%;
    padding: ${baseSpacing / 4}px;
    font-family: "${fontFamilies.MinionPro}", Times New Roman, serif;
    color: ${colours.teal};
    text-align: justify;
    font-size: 16px;
  }

  input, textarea {
    border-radius: 5px;
    background-color: ${colours.veryLightBlue};
    border: 1px solid ${colours.teal};
  }

  textarea {
    height: 6em;
  }
`
