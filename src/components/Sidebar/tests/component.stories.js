import React from 'react'

import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Sidebar } from '../component'

import { authInfoResponse } from 'mocks/authentication'

// Mock the router
const RouterDecorator = (storyFn) => (
  <Router history={createBrowserHistory()}>{storyFn()}</Router>
)

const defaultProps = {
  authInfo: authInfoResponse,
  logout: action('logout'),
}

const renderComponent = (props = {}) => <Sidebar {...defaultProps} {...props} />

storiesOf('Components/Sidebar', module)
  .addDecorator(RouterDecorator)
  .add('default', () => renderComponent())
