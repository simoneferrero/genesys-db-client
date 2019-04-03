import React from 'react'

import { storiesOf } from '@storybook/react'

import { firstPlayerCharacter } from 'mocks/playerCharacters'

import PCSummary from '../index'

const defaultProps = {
  ...firstPlayerCharacter,
}

storiesOf('Components/PCSummary', module).add('default', () => (
  <PCSummary {...defaultProps} />
))
