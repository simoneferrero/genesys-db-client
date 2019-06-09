import React from 'react'
import PropTypes from 'prop-types'

import { XP } from 'utils/definitions'

// Badges
import AvailableXP from 'images/AvailableXP.png'
import TotalXP from 'images/TotalXP.png'

import styled from 'styled-components/macro'
import { baseSpacing, colours, fontFamilies } from 'styles/constants'

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  & > div {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;

    h2,
    input {
      margin: 0;
      color: ${colours.lightOrange};
      position: absolute;
      margin-left: 1px;
      top: 19px;
      display: grid;
      grid-template-columns: 1fr;
      grid-column-gap: ${(baseSpacing * 2) / 3}px;
      text-align: right;
    }

    input {
      border: none;
      background: transparent;
      width: 90%;
      text-align: center;
      font-size: 1.5em;
      font-family: "${fontFamilies.Monkirta}", Helvetica, sans-serif;
      top: 18px;

      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }

    img {
      height: 50px;
    }
  }
`

const XPBadges = ({ editing, setFieldValue, xpAvailable, xpTotal }) => {
  const onXPAvailableChange = ({ target: { value } }) =>
    setFieldValue('xp.available', Number(value))
  const onXPTotalChange = ({ target: { value } }) =>
    setFieldValue('xp.total', Number(value))
  return (
    <StyledContainer data-testid="xpBadges">
      <div>
        <img alt={XP.AVAILABLE} src={AvailableXP} />
        {editing ? (
          <input
            min={0}
            onChange={onXPAvailableChange}
            type="number"
            value={xpAvailable}
          />
        ) : (
          <h2>{xpAvailable}</h2>
        )}
      </div>
      <div>
        <img alt={XP.TOTAL} src={TotalXP} />
        {editing ? (
          <input
            min={0}
            onChange={onXPTotalChange}
            type="number"
            value={xpTotal}
          />
        ) : (
          <h2>{xpTotal}</h2>
        )}
      </div>
    </StyledContainer>
  )
}

XPBadges.propTypes = {
  /** Whether to show the input fields*/
  editing: PropTypes.bool,
  /** Invoked when editing the fields */
  setFieldValue: PropTypes.func,
  /** Experience available to the character */
  xpAvailable: PropTypes.number,
  /** Total experience accumulated by the character */
  xpTotal: PropTypes.number,
}

XPBadges.defaultProps = {
  xpAvailable: 0,
  xpTotal: 0,
}

export default XPBadges
