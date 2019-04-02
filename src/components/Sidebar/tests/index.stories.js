import React from 'react'

import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { addDecorator, storiesOf } from '@storybook/react'

import Sidebar from '../index'
import MenuItem from 'components/MenuItem'

// Mock the router
const RouterDecorator = (storyFn) => (
  <Router history={createBrowserHistory()}>{storyFn()}</Router>
)
addDecorator(RouterDecorator)

const location = {
  pathname: '/route-1',
}

storiesOf('Sidebar', module).add('default', () => (
  <Sidebar>
    <MenuItem id="route1" location={location} to="/route-1">
      ROUTE 1
    </MenuItem>
    <MenuItem id="route2" location={location} to="/route-2">
      ROUTE 2
    </MenuItem>
  </Sidebar>
))
