import React from 'react'

import { fromJS } from 'immutable'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { skillsById } from 'mocks/skills'
import { weapon1, weaponsById, newWeaponResponse } from 'mocks/weapons'

import WeaponsSection from '../index'

const defaultProps = {
  handleSubmit: action('handleSubmit'),
  onWeaponChange: action('onWeaponChange'),
  skills: fromJS(skillsById).toJS(),
  weapons: {
    ...fromJS(weaponsById).toJS(),
    [newWeaponResponse.id]: newWeaponResponse,
  },
}

const renderComponent = (props = {}) => (
  <WeaponsSection {...defaultProps} {...props} />
)

storiesOf('Components/WeaponsSection', module)
  .add('default', () => renderComponent())
  .add('showAdd new weapon', () => renderComponent({ showAdd: true }))
  .add('showAdd character weapon', () => {
    const props = {
      isCharacter: true,
      showAdd: true,
      characterWeapons: { [weapon1.id]: weapon1 },
    }
    return renderComponent(props)
  })
  .add('editing', () =>
    renderComponent({
      deletedWeapons: { [newWeaponResponse.id]: true },
      editing: true,
    }),
  )
