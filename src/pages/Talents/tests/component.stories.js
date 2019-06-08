import React from 'react'

import { fromJS } from 'immutable'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { authInfoResponse, authInfoGmResponse } from 'mocks/authentication'
import { talentsById } from 'mocks/talents'
import { uiElement, uiElementLoading } from 'mocks/ui'

import { Talents } from '../component'

const defaultProps = {
  addTalent: action('addTalent'),
  authInfo: authInfoResponse,
  getAuthInfo: action('getAuthInfo'),
  getSkills: action('getSkills'),
  getTalents: action('getTalents'),
  talents: fromJS(talentsById).toJS(),
  talentsUi: uiElement,
}

const renderComponent = (props = {}) => <Talents {...defaultProps} {...props} />

storiesOf('Pages/Talents', module)
  .add('default', () => renderComponent())
  .add('gm', () => renderComponent({ authInfo: authInfoGmResponse }))
  .add('loading', () => {
    const props = {
      talentsUi: uiElementLoading,
    }
    return renderComponent(props)
  })
