import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import FormButtons from '../index'

const defaultProps = {
  disabled: false,
  handleSubmit: action('handleSubmit'),
  name: 'test',
  showButtons: false,
  setShowButtons: action('setShowButtons'),
}

const renderComponent = (props = {}) => (
  <FormButtons {...defaultProps} {...props} />
)

storiesOf('Components/FormButtons', module)
  .add('default', () => renderComponent())
  .add('showButtons', () => {
    const props = {
      showButtons: true,
    }
    return renderComponent(props)
  })
  .add('disabled', () => {
    const props = {
      disabled: true,
      showButtons: true,
    }
    return renderComponent(props)
  })
