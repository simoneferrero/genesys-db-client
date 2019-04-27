import React from 'react'

import { fromJS } from 'immutable'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { authInfoResponse, authInfoGmResponse } from 'mocks/authentication'
import { skillsById } from 'mocks/skills'
import { uiElement, uiElementLoading } from 'mocks/ui'
import { weaponsById } from 'mocks/weapons'

import { Weapons } from '../component'

const defaultProps = {
  addWeapon: action('addWeapon'),
  authInfo: authInfoResponse,
  getAuthInfo: action('getAuthInfo'),
  getSkills: action('getSkills'),
  getWeapons: action('getWeapons'),
  skills: fromJS(skillsById).toJS(),
  skillsUi: uiElement,
  weapons: fromJS(weaponsById).toJS(),
  weaponsUi: uiElement,
}

const renderComponent = (props = {}) => <Weapons {...defaultProps} {...props} />

storiesOf('Pages/Weapons', module)
  .add('default', () => renderComponent())
  .add('gm', () => renderComponent({ authInfo: authInfoGmResponse }))
  .add('loading', () => {
    const props = {
      weaponsUi: uiElementLoading,
    }
    return renderComponent(props)
  })
