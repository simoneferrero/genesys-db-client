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

storiesOf('Components/CriticalInjury', module)
  .add('default', () => renderComponent())
  .add('default character', () => {
    const props = {
      isCharacter: true,
    }
    return renderComponent(props)
  })
  .add('editing heal', () => {
    const props = {
      editing: true,
      isCharacter: true,
    }
    return renderComponent(props)
  })
  .add('editing undo', () => {
    const props = {
      editing: true,
      isCharacter: true,
      deleting: true,
    }
    return renderComponent(props)
  })
