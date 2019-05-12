import React from 'react'

import { fromJS } from 'immutable'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { criticalInjuries } from 'mocks/criticalInjuries'
import { uiElement, uiElementLoading } from 'mocks/ui'

import { CriticalInjuries } from '../component'

const defaultProps = {
  getAuthInfo: action('getAuthInfo'),
  getCriticalInjuries: action('getCriticalInjuries'),
  criticalInjuries: fromJS(criticalInjuries).toJS(),
  criticalInjuriesUi: uiElement,
}

const renderComponent = (props = {}) => (
  <CriticalInjuries {...defaultProps} {...props} />
)

storiesOf('Pages/CriticalInjuries', module)
  .add('default', () => renderComponent())
  .add('loading', () => {
    const props = {
      criticalInjuriesUi: uiElementLoading,
    }
    return renderComponent(props)
  })
