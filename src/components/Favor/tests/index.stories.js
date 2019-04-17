import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { favor1, favor2 } from 'mocks/favors'

import Favor from '../index'

const defaultProps = {
  handleSubmit: action('handleSubmit'),
  favor: favor1,
  setEditing: action('setEditing'),
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
      favor: {
        type: 'small',
        faction: '',
        description: '',
      },
    }
    return renderComponent(props)
  })
