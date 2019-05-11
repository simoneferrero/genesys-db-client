import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
  criticalInjury1,
  criticalInjury2,
  criticalInjury3,
} from 'mocks/criticalInjuries'

import CriticalInjuriesSection from '../index'

const defaultProps = {
  criticalInjuries: [criticalInjury1, criticalInjury2, criticalInjury3],
  handleSubmit: action('handleSubmit'),
  onCriticalInjuryChange: action('onCriticalInjuryChange'),
}

const renderComponent = (props = {}) => (
  <CriticalInjuriesSection {...defaultProps} {...props} />
)

storiesOf('Components/CriticalInjuriesSection', module)
  .add('default', () => renderComponent())
  .add('isCharacter', () => {
    const props = {
      characterCriticalInjuries: {
        [criticalInjury1.id]: criticalInjury1,
        [criticalInjury2.id]: criticalInjury2,
      },
      isCharacter: true,
    }
    return renderComponent(props)
  })
  .add('editing', () => {
    const props = {
      characterCriticalInjuries: {
        [criticalInjury1.id]: criticalInjury1,
        [criticalInjury2.id]: criticalInjury2,
      },
      deletedCriticalInjuries: {
        [criticalInjury1.id]: true,
      },
      editing: true,
      isCharacter: true,
    }
    return renderComponent(props)
  })
