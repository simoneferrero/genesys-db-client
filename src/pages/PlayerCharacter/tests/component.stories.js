import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { playerCharacter1Augmented } from 'mocks/playersCharacters'
import { uiElement, uiElementLoading } from 'mocks/ui'

import { PlayerCharacter } from '../component'

const defaultProps = {
  getArchetypes: action('getArchetypes'),
  getCareers: action('getCareers'),
  getPlayerCharacter: action('getPlayerCharacter'),
  playerCharacter: playerCharacter1Augmented,
  playerCharacterId: `${playerCharacter1Augmented.id}`,
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
