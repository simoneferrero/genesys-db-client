import React from 'react'

import { fromJS } from 'immutable'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { playerCharacterTalent1, talent1, talentsById } from 'mocks/talents'

import TalentsTier from '../index'

const defaultProps = {
  characterTalents: {
    [talent1.id]: {
      ...talent1,
      ...playerCharacterTalent1,
    },
  },
  handleSubmit: action('handleSubmit'),
  onTalentChange: action('onTalentChange'),
  talents: fromJS(talentsById).toJS(),
  tier: 1,
}

const renderComponent = (props = {}) => (
  <TalentsTier {...defaultProps} {...props} />
)

storiesOf('Components/TalentsTier', module)
  .add('default', () => renderComponent())
  .add('showAdd new talent', () => renderComponent({ showAdd: true }))
  .add('showAdd character talent', () => {
    const props = {
      isCharacter: true,
      showAdd: true,
      characterTalents: { [talent1.id]: talent1 },
    }
    return renderComponent(props)
  })
  .add('editing', () =>
    renderComponent({
      isCharacter: true,
      editing: true,
    }),
  )
