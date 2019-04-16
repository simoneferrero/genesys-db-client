import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { playerCharacter1SkillsAugmented } from 'mocks/playersCharacters'

import SkillRow from '../index'

const defaultProps = {
  onChange: action('onChange'),
  skill: playerCharacter1SkillsAugmented.toJS()[1],
}

const renderComponent = (props = {}) => (
  <SkillRow {...defaultProps} {...props} />
)

storiesOf('Components/SkillRow', module)
  .add('rank', () => renderComponent())
  .add('career', () => {
    const props = {
      skill: playerCharacter1SkillsAugmented.toJS()[0],
    }
    return renderComponent(props)
  })
  .add('editing', () => {
    const props = {
      editing: true,
    }
    return renderComponent(props)
  })
