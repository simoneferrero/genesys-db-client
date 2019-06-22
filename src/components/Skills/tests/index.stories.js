import React from 'react'

import keyBy from 'lodash/keyBy'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { playerCharacter1SkillsAugmented } from 'mocks/playersCharacters'

import { Skills } from '../index'

const skills = keyBy(playerCharacter1SkillsAugmented.toJS(), 'id')
const defaultProps = {
  onChange: action('onChange'),
  skills,
}

const renderComponent = (props = {}) => <Skills {...defaultProps} {...props} />

storiesOf('Components/Skills', module)
  .add('default', () => renderComponent())
  .add('editing', () => {
    const props = {
      editing: true,
    }
    return renderComponent(props)
  })
