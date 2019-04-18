import React from 'react'

import { fromJS } from 'immutable'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { factionsById } from 'mocks/factions'
import { favor1, favor2 } from 'mocks/favors'

import Favor from '../index'

const defaultProps = {
  factions: fromJS(factionsById).toJS(),
  favor: favor1,
  setFieldValue: action('setFieldValue'),
}

const renderComponent = (props = {}) => <Favor {...defaultProps} {...props} />

storiesOf('Components/Favor', module)
  .add('default', () => renderComponent())
  .add('completed', () => {
    const props = {
      favor: favor2,
    }
    return renderComponent(props)
  })
  .add('editing', () => {
    const props = {
      editing: true,
    }
    return renderComponent(props)
  })
  .add('editing completed', () => {
    const props = {
      editing: true,
      favor: favor2,
    }
    return renderComponent(props)
  })
  .add('new', () => {
    const props = {
      isNew: true,
      favor: {
        type: 'small',
        faction: defaultProps.factions[0].id,
        description: '',
        owed: true,
      },
    }
    return renderComponent(props)
  })
