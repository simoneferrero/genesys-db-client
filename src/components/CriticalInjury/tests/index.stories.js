import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { criticalInjury1 } from 'mocks/criticalInjuries'

import CriticalInjury from '../index'

const defaultProps = {
  criticalInjury: criticalInjury1,
  setFieldValue: action('setFieldValue'),
}

const renderComponent = (props = {}) => (
  <CriticalInjury {...defaultProps} {...props} />
)

storiesOf('Components/CriticalInjury', module).add('default', () =>
  renderComponent(),
)
