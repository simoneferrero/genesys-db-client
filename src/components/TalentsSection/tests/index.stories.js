import React from 'react'

import { fromJS } from 'immutable'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { playerCharacter1TalentsAugmented } from 'mocks/playersCharacters'
import { talentsById } from 'mocks/talents'

import TalentsSection from '../index'

const defaultProps = {
  characterTalents: fromJS(playerCharacter1TalentsAugmented).toJS(),
  handleSubmit: action('handleSubmit'),
  setFieldValue: action('setFieldValue'),
  talents: fromJS(talentsById).toJS(),
}

const renderComponent = (props = {}) => (
  <TalentsSection {...defaultProps} {...props} />
)

storiesOf('Components/TalentsSection', module)
  .add('default', () => renderComponent())
  .add('showAdd new talent', () => renderComponent({ showAdd: true }))
  .add('showAdd character talent', () => {
    const props = {
      isCharacter: true,
      showAdd: true,
    }
    return renderComponent(props)
  })
  .add('editing', () =>
    renderComponent({
      isCharacter: true,
      editing: true,
    }),
  )
