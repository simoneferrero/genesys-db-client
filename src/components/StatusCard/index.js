import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components/macro'
import { baseSpacing, colours } from 'styles/constants'

const StyledStatusCard = styled.div`
  padding: ${baseSpacing / 2}px;
  color: ${colours.white};
  background-color: ${({ isGoodService }) =>
    isGoodService ? colours.green : colours.red};
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: ${baseSpacing / 4}px;

  hr {
    width: 80%;
    margin: ${baseSpacing / 2}px 0;
  }
`

/** Element showing the status of a tube line */
const StatusCard = ({ name, statusSeverity, statusSeverityDescription }) => (
  <StyledStatusCard
    data-testid="statusCard"
    isGoodService={statusSeverity === 10}
  >
    <span>{name}</span>
    <hr />
    <span>{statusSeverityDescription}</span>
  </StyledStatusCard>
)

StatusCard.propTypes = {
  /** The name of the line */
  name: PropTypes.string.isRequired,
  /** An integer indicating the status severity level */
  statusSeverity: PropTypes.number.isRequired,
  /** A text description of the line status */
  statusSeverityDescription: PropTypes.string.isRequired,
}

export default StatusCard
