import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import XPBadges from '../index'

const setFieldValue = action('setFieldValue')
const defaultProps = {
  xp_available: 100,
  xp_total: 200,
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
