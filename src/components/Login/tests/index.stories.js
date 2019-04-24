import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Login from '../index'

const defaultProps = {
  handleSubmit: action('handleSubmit'),
}

const renderComponent = (props = {}) => <Login {...defaultProps} {...props} />

storiesOf('Components/Login', module).add('default', () => renderComponent())
