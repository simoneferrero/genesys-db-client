import React from 'react'

import styled from 'styled-components/macro'
import { baseSpacing, colours } from 'styles/constants'

export const StyledWrapper = styled.div`
  display: flex;
  width: fit-content;

  & > div {
    margin: 0 ${baseSpacing / 4}px;
    display: flex;
    width: fit-content;
  }
`

const radius = 4

// We don't want to pass fill prop to the dom element
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars  */
const FilteredStyledRank = ({ fill, ...otherProps }) => <div {...otherProps} />
/* eslint-enable */

export const StyledRank = styled(FilteredStyledRank)`
  position: relative;
  overflow: visible;
  height: 20px;
  width: 30px;
  background-color: ${({ fill }) =>
    fill ? colours.teal : colours.veryLightBlue};
  border: solid ${colours.veryDarkGrey};
  border-width: 1px 0;

  &:first-child {
    border-left-width: 1px;
    border-top-left-radius: ${radius}px;
    border-bottom-left-radius: ${radius}px;
  }

  &:last-child {
    border-right-width: 1px;
    border-top-right-radius: ${radius}px;
    border-bottom-right-radius: ${radius}px;
  }

  &:not(:last-child)::after {
    content: '';
    height: 13px;
    width: 13px;
    border: solid ${colours.veryDarkGrey};
    border-width: 0 1px 1px 0;
    background-color: ${({ fill }) =>
      fill ? colours.teal : colours.veryLightBlue};
    left: 72%;
    top: 2px;
    transform: rotate(-45deg);
    z-index: 899;
    position: absolute;
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

  &:disabled {
    color: ${colours.veryLightOrange};
    cursor: not-allowed;
  }
`
