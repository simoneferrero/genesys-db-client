import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import FormButtons from '../index'

const defaultProps = {
  disabled: false,
  editing: false,
  setEditing: action('setEditing'),
}

const renderComponent = (props = {}) => (
  <FormButtons {...defaultProps} {...props} />
)

storiesOf('Components/FormButtons', module)
  .add('default', () => renderComponent())
  .add('editing', () => {
    const props = {
      editing: true,
    }
    return renderComponent(props)
  })
  .add('disabled', () => {
    const props = {
      disabled: true,
      editing: true,
    }
    return renderComponent(props)
  })
