import React from 'react'

import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { addDecorator, storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { playersCharactersAugmented } from 'mocks/playersCharacters'
import { uiElement, uiElementLoading } from 'mocks/ui'

import { PlayersCharacters } from '../component'

const defaultProps = {
  getArchetypes: action('getArchetypes'),
  getAuthInfo: action('getAuthInfo'),
  getCareers: action('getCareers'),
  getPlayersCharacters: action('getPlayersCharacters'),
  playersCharacters: playersCharactersAugmented.toJS(),
  playersCharactersUi: uiElement,
}

// Mock the router
const RouterDecorator = (storyFn) => (
  <Router history={createBrowserHistory()}>{storyFn()}</Router>
)
addDecorator(RouterDecorator)

const renderComponent = (props = {}) => (
  <PlayersCharacters {...defaultProps} {...props} />
)

storiesOf('Pages/PlayersCharacters', module)
  .add('default', () => renderComponent())
  .add('loading', () => {
    const props = {
      playersCharactersUi: uiElementLoading,
    }
    return renderComponent(props)
  })
