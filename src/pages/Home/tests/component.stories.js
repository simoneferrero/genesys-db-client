import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Home } from '../component'

import { authInfoResponse } from 'mocks/authentication'

const defaultProps = {
  authInfo: {},
  getAuthInfo: action('getAuthInfo'),
  login: action('login'),
}

const renderComponent = (props = {}) => <Home {...defaultProps} {...props} />

storiesOf('Pages/Home', module)
  .add('default', () => renderComponent())
  .add('logged in', () => renderComponent({ authInfo: authInfoResponse }))
