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

  & > button > h3,
  div > span,
  div > h4 {
    ${({ deleting }) => deleting && deletingStyles}
  }
`

const openDropdownButtonStyles = css`
  background: transparent;

  & > h3 {
    color: ${colours.teal};
  }
`
export const StyledDropdownButton = styled.button`
  width: 100%;
  padding: ${baseSpacing / 4}px;
  border: 2px solid ${colours.teal};
  border-radius: 5px;
  cursor: pointer;
  text-transform: uppercase;
  background: ${colours.teal};

  & > h3 {
    margin: 0;
    color: ${colours.veryLightBlue};
  }

  ${({ isOpen }) => isOpen && openDropdownButtonStyles}
`

export const StyledContent = styled.div`
  padding: ${baseSpacing / 2}px;
  display: ${({ isOpen }) => (isOpen ? 'grid' : 'none')};
  grid-row-gap: ${baseSpacing / 4}px;
  grid-column-gap: ${baseSpacing / 2}px;
  grid-template-columns: repeat(1, 1fr);

  @media ${mq.tablet}, ${mq.laptop}, ${mq.desktop} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${mq.bigDesktop} {
    grid-template-columns: repeat(3, 1fr);
  }

  & > div,
  label {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: ${baseSpacing / 4} px;

    @media ${mq.tablet} {
      grid-template-columns: repeat(1, 1fr);
    }

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
  }
`

export const StyledCheckboxLabel = styled.label`
  cursor: ${({ editing }) => (editing ? 'pointer' : 'default')};

  & > input {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
  }
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

  @media ${mq.tablet}, ${mq.laptop}, ${mq.desktop} {
    grid-column: 1/3;
  }

  @media ${mq.bigDesktop} {
    grid-column: 1/4;
  }

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
