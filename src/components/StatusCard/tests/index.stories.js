import React from 'react'

import { storiesOf } from '@storybook/react'

import { goodServiceStatus, severeDelaysStatus } from 'mocks/statuses'

import StatusCard from '../index'

const {
  lineStatuses: [
    {
      statusSeverity: goodServiceStatusSeverity,
      statusSeverityDescription: goodServiceStatusSeverityDescription,
    },
  ],
  name: goodServiceName,
} = goodServiceStatus
const {
  lineStatuses: [
    {
      statusSeverity: severeDelaysStatusSeverity,
      statusSeverityDescription: severeDelaysStatusSeverityDescription,
    },
  ],
  name: severeDelaysName,
} = severeDelaysStatus

storiesOf('StatusCard', module)
  .add('good service', () => (
    <StatusCard
      name={goodServiceName}
      statusSeverity={goodServiceStatusSeverity}
      statusSeverityDescription={goodServiceStatusSeverityDescription}
    />
  ))
  .add('severe delays', () => (
    <StatusCard
      name={severeDelaysName}
      statusSeverity={severeDelaysStatusSeverity}
      statusSeverityDescription={severeDelaysStatusSeverityDescription}
    />
  ))
