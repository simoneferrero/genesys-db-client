import React from 'react'

import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { addDecorator, storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { adversariesAugmented } from 'mocks/adversaries'
import { uiElement, uiElementLoading } from 'mocks/ui'

import { Adversaries } from '../component'

const defaultProps = {
  getAuthInfo: action('getAuthInfo'),
  getAdversaries: action('getAdversaries'),
  adversaries: adversariesAugmented.toJS(),
  adversariesUi: uiElement,
}

// Mock the router
const RouterDecorator = (storyFn) => (
  <Router history={createBrowserHistory()}>{storyFn()}</Router>
)
addDecorator(RouterDecorator)

const renderComponent = (props = {}) => (
  <Adversaries {...defaultProps} {...props} />
)

storiesOf('Pages/Adversaries', module)
  .add('default', () => renderComponent())
  .add('loading', () => {
    const props = {
      adversariesUi: uiElementLoading,
    }
    return renderComponent(props)
  })
