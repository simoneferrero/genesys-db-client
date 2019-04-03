import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
  playerCharactersAllIds,
  playerCharactersById,
} from 'mocks/playerCharacters'

import PlayerCharacters from '../component'

const defaultProps = {
  getPlayerCharacters: action('getPlayerCharacters'),
  playerCharactersAllIds,
  playerCharactersById,
}

storiesOf('Pages/PlayerCharacters', module).add('default', () => (
  <PlayerCharacters {...defaultProps} />
))
