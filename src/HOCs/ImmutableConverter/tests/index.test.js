import { fromJS } from 'immutable'

import ImmutableConverter from '../index'

/* eslint-disable react/prop-types */
const Component = ({ regular, immutable }) => (
  <div>
    <span>{regular.name}</span>
    <span>{immutable.name}</span>
  </div>
)
/* eslint-enable react/prop-types */

const WrappedComponent = ImmutableConverter(Component)

const regularName = 'Regular'
const immutableName = 'Immutable'
const defaultProps = {
  regular: {
    name: regularName,
  },
  immutable: fromJS({
    name: immutableName,
  }),
}

const renderComponent = (props = {}) =>
  render(<WrappedComponent {...defaultProps} {...props} />)

describe('<ImmutableConverter />', () => {
  it('should only convert immutable props to regular js', () => {
    const { getByText } = renderComponent()
    const regularProp = getByText(regularName)
    expect(regularProp).toBeInTheDocument()

    const immutableProp = getByText(immutableName)
    expect(immutableProp).toBeInTheDocument()
  })
})
