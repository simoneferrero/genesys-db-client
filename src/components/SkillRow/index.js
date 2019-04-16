import React from 'react'
import PropTypes from 'prop-types'
import { skillType } from 'types/skills'

import SkillRank from 'components/SkillRank'

import styled, { css } from 'styled-components/macro'
import { baseSpacing, colours } from 'styles/constants'
import mq from 'styles/mediaQueries'
import rgbToRgba from 'utils/rgbToRgba'

const StyledWrapper = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  justify-items: center;
  padding: ${baseSpacing / 3}px;
  grid-gap: ${baseSpacing / 4}px;
  page-break-inside: avoid;
  grid-template-columns: 5fr 1fr 6fr;

  @media ${mq.phone} {
    grid-template-columns: 5fr 1fr;
  }

  & > h5 {
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
  font-size: 6px;
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
  decreaseDisabled,
  editing,
  increaseDisabled,
  onChange,
  skill: { career, characteristic, id, name, rank },
}) => (
  <StyledWrapper data-testid={`skill-${id}`}>
    <h5>{`${name} (${characteristic.substring(0, 2).toUpperCase()})`}</h5>
    <StyledCheckbox
      data-testid={`skill-career-${id}`}
      name={`skill.${id}.career`}
      checked={career}
      // onChange={(value) => onChange(`skills.${id}.career`, value)}
    >
      <input disabled name={`skills.${id}.career`} type="checkbox" />
      <span>CAREER</span>
    </StyledCheckbox>
    <SkillRank
      decreaseDisabled={decreaseDisabled}
      editing={editing}
      id={id}
      increaseDisabled={increaseDisabled}
      onChange={(value) => onChange(`skills.${id}.rank`, value)}
      rank={rank}
    />
  </StyledWrapper>
)

SkillRow.propTypes = {
  /** Whether decrease button should be disabled */
  decreaseDisabled: PropTypes.bool,
  /** Whether to show the editing buttons */
  editing: PropTypes.bool,
  /** Whether increase button should be disabled */
  increaseDisabled: PropTypes.bool,
  /** Invoked upon changing skill values */
  onChange: PropTypes.func.isRequired,
  /** The skill to visualize */
  skill: skillType.isRequired,
}

export default SkillRow
