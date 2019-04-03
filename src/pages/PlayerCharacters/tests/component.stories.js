import React from 'react'

import { storiesOf } from '@storybook/react'

import {
  playerCharactersAllIds,
  playerCharactersById,
} from 'mocks/playerCharacters'

import PlayerCharacters from '../component'

const defaultProps = {
  getPlayerCharacters: () => {},
  playerCharactersAllIds,
  playerCharactersById,
}

storiesOf('Pages/PlayerCharacters', module).add('default', () => (
  <PlayerCharacters {...defaultProps} />
))
