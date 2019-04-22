import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { skillType } from 'types/skills'

import groupBy from 'lodash/groupBy'

import SkillRow from 'components/SkillRow'

import styled from 'styled-components/macro'
import { baseSpacing, borderRadius, colours } from 'styles/constants'
import mq from 'styles/mediaQueries'
import rgbToRgba from 'utils/rgbToRgba'

const StyledSkills = styled.div`
  padding: ${baseSpacing / 2}px;
  border: 2px solid ${colours.lightOrange};
  border-radius: ${borderRadius}px;
  background-color: ${rgbToRgba(colours.lightTeal, 0.1)};
  position: relative;

  h3 {
    margin: 0;
    text-transform: uppercase;
    color: ${colours.lightOrange};
    text-shadow: 1px 1px ${colours.veryLightOrange};
  }

  & > div {
    @media ${mq.laptop} {
      column-count: 2;
    }

    @media ${mq.desktop} {
      column-count: 3;
    }

    @media ${mq.bigDesktop} {
      column-count: 4;
    }

    &:not(:last-child) {
      margin-bottom: ${baseSpacing / 2}px;
    }
  }
`

export const Skills = ({
  className,
  editing,
  initialSkills,
  isSubmitting,
  onChange,
  skills,
}) => {
  const groupedBySkills = Object.entries(groupBy(skills, 'type')).map(
    ([type, skillsOfType]) => (
      <React.Fragment key={type}>
        <h3>{type}</h3>
        <div>
          {skillsOfType.map((skill) => (
            <SkillRow
              decreaseDisabled={
                isSubmitting ||
                skills[skill.id].rank <= initialSkills[skill.id].rank
              }
              editing={editing}
              increaseDisabled={isSubmitting || skills[skill.id].rank >= 5}
              key={skill.id}
              onChange={onChange}
              skill={skill}
            />
          ))}
        </div>
      </React.Fragment>
    ),
  )

  return (
    <StyledSkills className={className} data-testid="skills">
      {groupedBySkills}
    </StyledSkills>
  )
}

Skills.propTypes = {
  /** Custom styles */
  className: PropTypes.string,
  /** Whether to show the editing buttons */
  editing: PropTypes.bool,
  /** The initial values of skills */
  initialSkills: PropTypes.objectOf(skillType).isRequired,
  /** Whether the values are being submitted */
  isSubmitting: PropTypes.bool,
  /** Invoked upon changing skills values */
  onChange: PropTypes.func.isRequired,
  /** The player's character skill data */
  skills: PropTypes.objectOf(skillType).isRequired,
}

export default memo(Skills)
