import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { statusType } from 'types/statuses'

import StatusCard from 'components/StatusCard'

import styled from 'styled-components/macro'
import { baseSpacing } from 'styles/constants'

const StyledStatusCardsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: ${baseSpacing / 2}px;
  box-sizing: border-box;
`

/** The container of the statuses of each line */
const StatusCardsContainer = ({
  getTubeStatuses,
  statusesAllIds,
  statusesById,
}) => {
  useEffect(() => {
    getTubeStatuses()
  }, [])

  const statuses = statusesAllIds.map((id) => {
    const {
      lineStatuses: [{ statusSeverity, statusSeverityDescription }],
      name,
    } = statusesById[id]

    return (
      <StatusCard
        key={id}
        name={name}
        statusSeverity={statusSeverity}
        statusSeverityDescription={statusSeverityDescription}
      />
    )
  })

  return (
    <StyledStatusCardsContainer data-testid="statusCardsContainer">
      {statuses}
    </StyledStatusCardsContainer>
  )
}

StatusCardsContainer.propTypes = {
  /** An action dispatched on mount to fetch the statuses */
  getTubeStatuses: PropTypes.func.isRequired,
  /** An array with the ordered list of line IDs */
  statusesAllIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** The object containing line status data */
  statusesById: PropTypes.objectOf(statusType).isRequired,
}

export default StatusCardsContainer
