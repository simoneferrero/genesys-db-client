import React from 'react'

import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { addDecorator, storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import MenuItem from '../index'

// Mock the router
const RouterDecorator = (storyFn) => (
  <Router history={createBrowserHistory()}>{storyFn()}</Router>
)
addDecorator(RouterDecorator)

const location = {
  pathname: '/route-1',
}

storiesOf('MenuItem', module)
  .add('selected', () => (
    <MenuItem location={location} onClick={action('onClick')} to="/route-1">
      ROUTE 1
    </MenuItem>
  ))
  .add('not selected', () => (
    <MenuItem location={location} onClick={action('onClick')} to="/route-2">
      ROUTE 2
    </MenuItem>
  ))
