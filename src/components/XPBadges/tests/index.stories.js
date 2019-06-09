import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import XPBadges from '../index'

const setFieldValue = action('setFieldValue')
const defaultProps = {
  xpAvailable: 100,
  xpTotal: 200,
}

const renderComponent = (props = {}) => (
  <XPBadges {...defaultProps} {...props} />
)

storiesOf('Components/XPBadges', module)
  .add('default', () => renderComponent())
  .add('editing', () => {
    const props = {
      editing: true,
      setFieldValue,
    }
    return renderComponent(props)
  })
