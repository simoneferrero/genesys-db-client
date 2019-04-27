import React from 'react'
import PropTypes from 'prop-types'
import { motivationsType } from 'types/motivations'

import Motivation from 'components/Motivation'

import styled from 'styled-components/macro'
import { borderRadius, colours } from 'styles/constants'
import mq from 'styles/mediaQueries'
import rgbToRgba from 'utils/rgbToRgba'

export const StyledMotivations = styled.div`
  border: 2px solid ${colours.lightOrange};
  border-radius: ${borderRadius}px;
  background-color: ${rgbToRgba(colours.lightTeal, 0.1)};
  position: relative;
  display: grid;
  grid-template-columns: repeat(1, 1fr);

  @media ${mq.laptop}, ${mq.desktop}, ${mq.bigDesktop} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${mq.bigDesktop} {
    grid-template-columns: repeat(4, 1fr);
  }
`

const Motivations = ({
  className,
  editing,
  motivations,
  isSubmitting,
  setFieldValue,
}) => (
  <StyledMotivations className={className} data-testid="motivations">
    {Object.entries(motivations).map(([id, motivation]) => (
      <Motivation
        editing={editing}
        isPCSubmitting={isSubmitting}
        key={id}
        motivation={motivation}
        setFieldValue={setFieldValue}
        title={id}
      />
    ))}
  </StyledMotivations>
)

Motivations.propTypes = {
  /** Custom styles */
  className: PropTypes.string,
  /** Whether motivations can be edited */
  editing: PropTypes.bool,
  /** Motivations data */
  motivations: motivationsType.isRequired,
  /** Whether the player character form is submitting */
  isSubmitting: PropTypes.bool,
  /** Function invoked to change existing favor data */
  setFieldValue: PropTypes.func.isRequired,
}

export default Motivations
