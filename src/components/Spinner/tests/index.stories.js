import React from 'react'

import { storiesOf } from '@storybook/react'

import Spinner from '../index'

storiesOf('Components/Spinner', module)
  .add('cover', () => <Spinner cover size={60} />)
  .add('not cover', () => <Spinner />)
