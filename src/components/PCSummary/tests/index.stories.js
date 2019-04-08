import React from 'react'

import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { addDecorator, storiesOf } from '@storybook/react'

import { playerCharacterSummary1Augmented } from 'mocks/playersCharacters'

import { PCSummary } from '../index'

// Mock the router
const RouterDecorator = (storyFn) => (
  <Router history={createBrowserHistory()}>{storyFn()}</Router>
)
addDecorator(RouterDecorator)

const defaultProps = {
  ...playerCharacterSummary1Augmented.toJS(),
}

storiesOf('Components/PCSummary', module).add('default', () => (
  <PCSummary {...defaultProps} />
))
