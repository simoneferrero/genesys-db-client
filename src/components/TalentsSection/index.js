import React from 'react'
import PropTypes from 'prop-types'
import { talentType } from 'types/talents'

import groupBy from 'lodash/groupBy'
import keyBy from 'lodash/keyBy'

import TalentsTier from 'components/TalentsTier'

import styled from 'styled-components/macro'
import { borderRadius, colours } from 'styles/constants'
import rgbToRgba from 'utils/rgbToRgba'

export const StyledTalentsSection = styled.div`
  border: 2px solid ${colours.lightOrange};
  border-radius: ${borderRadius}px;
  background-color: ${rgbToRgba(colours.lightTeal, 0.1)};
  position: relative;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
`

const TalentsSection = ({
  characterTalents,
  className,
  editing,
  handleSubmit,
  isCharacter,
  isSubmitting,
  setFieldValue,
  showAdd,
  talents,
}) => {
  const tiers = [...Array(5).keys()]
  const groupedByTalents = groupBy(talents, 'tier')
  const groupedByCharacterTalents = groupBy(characterTalents, 'tier')

  return (
    <StyledTalentsSection className={className} data-testid="talents-section">
      {tiers.map((index) => {
        const tier = index + 1

        return (
          <TalentsTier
            characterTalents={keyBy(groupedByCharacterTalents[tier], 'id')}
            editing={editing}
            handleSubmit={handleSubmit}
            isCharacter={isCharacter}
            isPCSubmitting={isSubmitting}
            key={tier}
            onTalentChange={setFieldValue}
            showAdd={showAdd}
            talents={keyBy(groupedByTalents[tier], 'id')}
            tier={tier}
          />
        )
      })}
    </StyledTalentsSection>
  )
}

TalentsSection.propTypes = {
  /** Character talents data */
  characterTalents: PropTypes.objectOf(talentType),
  /** Custom styles */
  className: PropTypes.string,
  /** Whether talents can be edited */
  editing: PropTypes.bool,
  /** Function invoked upon form submission */
  handleSubmit: PropTypes.func.isRequired,
  /** Whether the section is in a character sheet */
  isCharacter: PropTypes.bool,
  /** Whether the player character form is submitting */
  isSubmitting: PropTypes.bool,
  /** Function invoked to change existing talent data */
  setFieldValue: PropTypes.func.isRequired,
  /** Whether to show the Add Talent button */
  showAdd: PropTypes.bool,
  /** Talents data */
  talents: PropTypes.objectOf(talentType).isRequired,
}

TalentsSection.defaultProps = {
  characterTalents: {},
  setFieldValue: () => {},
}

export default TalentsSection
