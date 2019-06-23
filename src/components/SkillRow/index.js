import React from 'react'
import PropTypes from 'prop-types'
import { skillType } from 'types/skills'

import Checkbox from 'components/Checkbox'
import SkillRank from 'components/SkillRank'

import styled from 'styled-components/macro'
import { baseSpacing, colours } from 'styles/constants'
import mq from 'styles/mediaQueries'

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

const SkillRow = ({
  decreaseDisabled,
  editing,
  increaseDisabled,
  onChange,
  skill: { career, characteristic, id, name, rank },
}) => (
  <StyledWrapper data-testid={`skill-${id}`}>
    <h5>{`${name} (${characteristic.substring(0, 2).toUpperCase()})`}</h5>
    <Checkbox
      checked={career}
      disabled={!editing}
      id={`skill-career-${id}`}
      label="career"
      name={`skills.${id}.career`}
      onChange={onChange}
    />
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
