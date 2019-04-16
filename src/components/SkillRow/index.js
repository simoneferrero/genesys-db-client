import React from 'react'
import PropTypes from 'prop-types'
import { skillType } from 'types/skills'

import SkillRank from 'components/SkillRank'

import styled, { css } from 'styled-components/macro'
import { baseSpacing, colours } from 'styles/constants'
import rgbToRgba from 'utils/rgbToRgba'

const StyledWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr 4fr;
  align-items: center;
  justify-items: center;
  padding: ${baseSpacing / 2}px;
  grid-gap: ${baseSpacing / 2}px;

  & > h4 {
    margin: 0;
    color: ${colours.teal};
    width: 100%;
    text-shadow: 1px 1px ${colours.veryLightBlue};
  }
`

const checkedStyles = css`
  color: ${colours.veryLightBlue};
  background-color: ${colours.teal};
  border-color: ${colours.teal};
`
const uncheckedStyles = css`
  color: ${rgbToRgba(colours.veryDarkGrey, 0.4)};
  border-color: ${rgbToRgba(colours.veryDarkGrey, 0.4)};
`
const StyledCheckbox = styled.label`
  position: relative;
  ${'' /* TODO: change cursor when creating character */}
  cursor: default;
  font-size: 10px;
  user-select: none;
  display: flex;
  border: 1px solid;
  padding: ${baseSpacing / 6}px;
  padding-top: ${baseSpacing / 4}px;
  border-radius: 3px;
  font-weight: 700;
  ${({ checked }) => (checked ? checkedStyles : uncheckedStyles)};

  & > input {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
  }
`

const SkillRow = ({
  decrease,
  decreaseDisabled,
  editing,
  increase,
  increaseDisabled,
  skill: { career, characteristic, id, name, rank },
}) => (
  <StyledWrapper data-testid={`skill-${id}`}>
    <h4>{`${name} (${characteristic.substring(0, 2).toUpperCase()})`}</h4>
    <StyledCheckbox
      data-testid={`skill-career-${id}`}
      name={`skill-career-${id}`}
      checked={career}
    >
      <input disabled name={`skill-career-${id}`} type="checkbox" />
      <span>CAREER</span>
    </StyledCheckbox>
    <SkillRank
      // TODO: pass unique onchange function
      decrease={decrease}
      decreaseDisabled={decreaseDisabled}
      editing={editing}
      id={id}
      increase={increase}
      increaseDisabled={increaseDisabled}
      rank={rank}
    />
  </StyledWrapper>
)

SkillRow.propTypes = {
  /** Invoked upon clicking on decrease button */
  decrease: PropTypes.func.isRequired,
  /** Whether decrease button should be disabled */
  decreaseDisabled: PropTypes.bool,
  /** Whether to show the editing buttons */
  editing: PropTypes.bool,
  /** Invoked upon clicking on increase button */
  increase: PropTypes.func.isRequired,
  /** Whether increase button should be disabled */
  increaseDisabled: PropTypes.bool,
  /** The skill to visualize */
  skill: skillType.isRequired,
}

export default SkillRow
