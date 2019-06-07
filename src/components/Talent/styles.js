import React from 'react'

import styled from 'styled-components/macro'
import { baseSpacing, colours, fontFamilies } from 'styles/constants'
import mq from 'styles/mediaQueries'
import rgbToRgba from 'utils/rgbToRgba'

/* eslint-disable no-unused-vars  */
/* eslint-disable react/prop-types  */
const FilteredTalent = ({ editing, isNew, ...otherProps }) => (
  <div {...otherProps} />
)
/* eslint-enable */

export const StyledTalent = styled(FilteredTalent)`
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${baseSpacing / 2}px;
  padding: ${baseSpacing / 2}px;

  & > div {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
  }

  @media ${mq.tablet}, ${mq.laptop}, ${mq.desktop}, ${mq.bigDesktop} {
    grid-template-columns: ${({ isNew }) =>
      isNew ? '4fr 3fr 3fr' : '4fr 3fr 2fr'};

    p,
    label[for="notes"],
    label[for="description"] {
      grid-column: 1/4;
    }
  }

  h4,
  p {
    margin: 0;
    color: ${colours.teal};
  }

  p,
  textarea {
    text-align: justify;
  }

  h4 {
    text-shadow: 1px 1px ${colours.veryLightBlue};

    &:nth-child(2) {
      color: ${colours.lightOrange};
      text-shadow: 1px 1px ${colours.veryLightOrange};
    }

    &:nth-child(3) {
      display: inline-flex;
    }
  }

  p > span {
    font-family: "${fontFamilies.GenesysSymbols}", Times New Roman, serif;
    color: ${colours.black};

    &[type=boost] {
      color: ${colours.lightBlue};
    }
    &[type=ability] {
      color: ${colours.green};
    }
    &[type=proficiency] {
      color: ${colours.yellow};
    }
    &[type=difficulty] {
      color: ${colours.darkPurple};
    }
    &[type=challenge] {
      color: ${colours.brown};
    }
  }

  input,
  textarea {
    background-color: ${colours.veryLightBlue};
    border: 1px solid ${colours.teal};
    border-radius: 5px;
    padding: 10px;
    color: ${colours.teal};
    font-size: 13px;
    width: 100%;

    &::placeholder {
      color: ${rgbToRgba(colours.teal, 0.7)};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  textarea {
    width: 100%;
    height: 5em;
  }
`

export const StyledButton = styled.button`
  background: transparent;
  border: none;
  color: ${colours.lightOrange};
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0 ${baseSpacing / 4}px;

  &:disabled {
    color: ${colours.veryLightOrange};
    cursor: not-allowed;
  }
`
