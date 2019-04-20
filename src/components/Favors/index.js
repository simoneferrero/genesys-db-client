import React from 'react'
import PropTypes from 'prop-types'
import { factionType } from 'types/factions'
import { favorType } from 'types/favors'

import groupBy from 'lodash/groupBy'

import FavorsSection from 'components/FavorsSection'

import styled from 'styled-components/macro'
import { borderRadius, colours } from 'styles/constants'
import rgbToRgba from 'utils/rgbToRgba'

export const StyledFavors = styled.div`
  border: 2px solid ${colours.lightOrange};
  border-radius: ${borderRadius}px;
  background-color: ${rgbToRgba(colours.lightTeal, 0.1)};
  position: relative;
`

const Favors = ({
  className,
  editing,
  factions,
  favors,
  handleSubmit,
  isSubmitting,
  setFieldValue,
}) => {
  const typesOfFavors = ['owed', 'given']
  const groupedByFavors = groupBy(favors, 'type')
  return (
    <StyledFavors className={className} data-testid="favors">
      {typesOfFavors.map((type) => (
        <FavorsSection
          editing={editing}
          factions={factions}
          favors={Object.values(groupedByFavors[type] || {})}
          handleSubmit={handleSubmit}
          isPCSubmitting={isSubmitting}
          onFavorChange={setFieldValue}
          key={type}
          type={type}
        />
      ))}
    </StyledFavors>
  )
}

Favors.propTypes = {
  /** Custom styles */
  className: PropTypes.string,
  /** Whether favors can be edited */
  editing: PropTypes.bool,
  /** Factions data */
  factions: PropTypes.objectOf(factionType).isRequired,
  /** Favors data */
  favors: PropTypes.objectOf(favorType).isRequired,
  /** Function invoked upon form submission */
  handleSubmit: PropTypes.func.isRequired,
  /** Whether the player character form is submitting */
  isSubmitting: PropTypes.bool,
  /** Function invoked to change existing favor data */
  setFieldValue: PropTypes.func.isRequired,
}

export default Favors
