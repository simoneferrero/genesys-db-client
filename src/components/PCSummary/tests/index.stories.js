import React from 'react'

import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { addDecorator, storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { playerCharacterSummary1Augmented } from 'mocks/playersCharacters'

import { PCSummary } from '../index'

// Mock the router
const RouterDecorator = (storyFn) => (
  <Router history={createBrowserHistory()}>{storyFn()}</Router>
)
addDecorator(RouterDecorator)

const defaultProps = {
  ...playerCharacterSummary1Augmented.toJS(),
  setFieldValue: action('setFieldValue'),
}

const renderComponent = (props = {}) => (
  <PCSummary {...defaultProps} {...props} />
)

storiesOf('Components/PCSummary', module)
  .add('default', () => renderComponent())
  .add('editing', () => renderComponent({ editing: true }))
