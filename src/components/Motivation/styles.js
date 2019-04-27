import styled from 'styled-components/macro'
import { baseSpacing, colours, fontFamilies } from 'styles/constants'
import mq from 'styles/mediaQueries'

export const StyledMotivation = styled.div`
  width: 100%;
  height: fit-content;
  grid-gap: ${baseSpacing / 4}px;
  padding: ${baseSpacing / 2}px;

  div {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: ${baseSpacing / 4}px;
    align-items: center;
  }

  h3 {
    margin: 0;
    color: ${colours.lightOrange};
    text-shadow: 1px 1px ${colours.veryLightOrange};
    text-transform: uppercase;
  }

  h4 {
    margin: 0;
    text-shadow: 1px 1px ${colours.veryLightBlue};
  }

  p, input, textarea {
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
    height: 5em;

    @media ${mq.tablet}, ${mq.desktop} {
      height: 4em;
    }
  }
`
