import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { playerCharacter1Skills } from 'mocks/playersCharacters'
import { skill1, skill2 } from 'mocks/skills'

import SkillRow from '../index'

const defaultProps = {
  decrease: action('decrease'),
  increase: action('increase'),
  skill: { ...playerCharacter1Skills[0], ...skill1 },
}

const renderComponent = (props = {}) => (
  <SkillRow {...defaultProps} {...props} />
)

storiesOf('Components/SkillRow', module)
  .add('rank', () => renderComponent())
  .add('career', () => {
    const props = {
      skill: { ...playerCharacter1Skills[1], ...skill2 },
    }
    return renderComponent(props)
  })
  .add('editing', () => {
    const props = {
      editing: true,
    }
    return renderComponent(props)
  })
