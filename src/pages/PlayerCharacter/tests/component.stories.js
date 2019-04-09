import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
  playerCharacter1Id,
  playerCharacterSummary1Augmented,
} from 'mocks/playersCharacters'
import { uiElement, uiElementLoading } from 'mocks/ui'

import { PlayerCharacter } from '../component'

// TODO: import full character mock
const defaultProps = {
  getArchetypes: action('getArchetypes'),
  getCareers: action('getCareers'),
  getPlayerCharacter: action('getPlayerCharacter'),
  playerCharacter: playerCharacterSummary1Augmented.toJS(),
  playerCharacterId: `${playerCharacter1Id}`,
  playersCharactersUi: uiElement,
}

const renderComponent = (props = {}) => (
  <PlayerCharacter {...defaultProps} {...props} />
)

storiesOf('Pages/PlayerCharacter', module)
  .add('default', () => renderComponent())
  .add('loading', () => {
    const props = {
      playersCharactersUi: uiElementLoading,
    }
    return renderComponent(props)
  })
