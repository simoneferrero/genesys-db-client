import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { archetypesById } from 'mocks/archetypes'
import { careersById } from 'mocks/careers'
import {
  playersCharactersAllIds,
  playersCharactersById,
} from 'mocks/playersCharacters'
import { uiElement, uiElementLoading } from 'mocks/ui'

import { PlayersCharacters } from '../component'

const defaultProps = {
  archetypesById,
  careersById,
  getArchetypes: action('getArchetypes'),
  getCareers: action('getCareers'),
  getPlayersCharacters: action('getPlayersCharacters'),
  playersCharactersAllIds,
  playersCharactersById,
  playersCharactersUi: uiElement,
}

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
