import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { statusesAllIds, statusesById } from 'mocks/statuses'

import StatusCardsContainer from '../component'

storiesOf('StatusCardsContainer', module)
  .add('without statuses', () => (
    <StatusCardsContainer
      getTubeStatuses={action('getTubeStatuses')}
      statusesAllIds={[]}
      statusesById={{}}
    />
  ))
  .add('with statuses', () => (
    <StatusCardsContainer
      getTubeStatuses={action('getTubeStatuses')}
      statusesAllIds={statusesAllIds}
      statusesById={statusesById}
    />
  ))
