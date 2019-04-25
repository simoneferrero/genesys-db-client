import React from 'react'

import styled, { css } from 'styled-components/macro'
import { baseSpacing, colours } from 'styles/constants'
import mq from 'styles/mediaQueries'
import rgbToRgba from 'utils/rgbToRgba'

/* eslint-disable no-unused-vars  */
/* eslint-disable react/prop-types  */
const FilteredWeapon = ({ deleting, editing, isNew, ...otherProps }) => (
  <div {...otherProps} />
)
/* eslint-enable */

const deletingStyles = css`
  text-decoration: line-through;
  opacity: 0.5;
`
export const StyledWeapon = styled(FilteredWeapon)`
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-row-gap: ${baseSpacing / 4}px;
  grid-column-gap: ${baseSpacing / 2}px;
  padding: ${baseSpacing / 2}px;

  @media ${mq.desktop}, ${mq.bigDesktop} {
    grid-template-columns: repeat(2, 1fr);
  }

  div > span,
  div > h4 {
    ${({ deleting }) => deleting && deletingStyles}
  }
`

export const StyledSection = styled.section`
  display: grid;
  grid-row-gap: ${baseSpacing / 4}px;
  grid-column-gap: ${baseSpacing / 2}px;
  grid-template-columns: repeat(1, 1fr);

  @media ${mq.tablet}, ${mq.laptop} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${mq.desktop}, ${mq.bigDesktop} {
    grid-template-columns: repeat(4, 1fr);

    &:first-child {
      grid-column: 1/3;
    }
  }

  & > div,
  label {
    display: grid;
    align-items: center;

    span {
      padding-top: 4px;
      color: ${colours.lightOrange};
      text-shadow: 1px 1px ${colours.veryLightOrange};
    }

    h4 {
      text-shadow: 1px 1px ${colours.veryLightBlue};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0;
      text-align: left;
    }

    input {
      background-color: ${colours.veryLightBlue};
      border: 1px solid ${colours.teal};
      border-radius: 5px;
      padding: ${baseSpacing / 3}px;
      color: ${colours.teal};
      font-size: 17px;
      width: 100%;

      &::placeholder {
        color: ${rgbToRgba(colours.teal, 0.7)};
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
`

export const StyledTextProperty = styled.div`
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: ${baseSpacing / 4} px;

  @media ${mq.desktop}, ${mq.bigDesktop} {
    grid-template-columns: 1fr 2fr;
  }
`

export const StyledNumberProperty = styled.div`
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: ${baseSpacing / 4} px;
  cursor: ${({ editing }) => (editing ? 'pointer' : 'default')};
`

export const StyledCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`

export const StyledButton = styled.button`
  padding: ${baseSpacing / 6}px;
  border: 2px solid ${colours.orange};
  border-radius: 5px;
  background: ${rgbToRgba(colours.veryLightOrange, 0.5)};
  cursor: pointer;
  text-transform: uppercase;
  opacity: 1;

  & > h4 {
    margin: 0;
    color: ${colours.orange};
    text-align: center;
  }

  &:hover {
    background-color: ${colours.orange};

    h4 {
      color: ${colours.veryLightOrange};
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
