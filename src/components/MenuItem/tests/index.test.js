import MenuItem from '../index'

import render from 'utils/customTestRenderers'

const childrenText = 'ROUTE 1'
const defaultProps = {
  children: <span>{childrenText}</span>,
  to: '/route-1',
}
const renderComponent = (props = {}) =>
  render(<MenuItem {...defaultProps} {...props} />)

describe('<MenuItem />', () => {
  it('should render children and call onClick correctly', () => {
    const mockOnClick = jest.fn()
    const { getByText } = renderComponent({
      onClick: mockOnClick,
    })

    const children = getByText(childrenText)

    expect(children).toBeInTheDocument()

    fireEvent.click(children)
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('should not break if onClick is not passed', () => {
    const { getByText } = renderComponent()

    const children = getByText(childrenText)

    fireEvent.click(children)

    expect(children).toBeInTheDocument()
  })
})
