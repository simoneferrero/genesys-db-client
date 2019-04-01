import MenuItem from '../index'

import render from 'utils/customTestRenderers'

import { colours } from 'styles/constants'

const childrenText = 'ROUTE 1'
const defaultProps = {
  children: <span>{childrenText}</span>,
  id: 'route1',
  to: '/route-1',
}
const renderComponent = (props = {}) =>
  render(<MenuItem {...defaultProps} {...props} />)

describe('<MenuItem />', () => {
  it('should render children and call onClick correctly', () => {
    const mockOnClick = jest.fn()
    const props = {
      onClick: mockOnClick,
    }
    const { getByTestId, getByText } = renderComponent(props)

    const menuItem = getByTestId(`menu-item-${defaultProps.id}`)
    expect(menuItem).toBeInTheDocument()

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

  it('should show active styles if showActive is true', () => {
    const props = {
      location: {
        pathname: defaultProps.to,
      },
    }
    const { getByTestId } = renderComponent(props)

    const menuItem = getByTestId(`menu-item-${defaultProps.id}`)
    expect(menuItem).toHaveStyle(`background-color: ${colours.veryLightBlue}`)
    expect(menuItem).toHaveStyle(`color: ${colours.teal}`)
  })

  it('should not show active styles if showActive is false', () => {
    const props = {
      location: {
        pathname: defaultProps.to,
      },
      showActive: false,
    }
    const { getByTestId } = renderComponent(props)

    const menuItem = getByTestId(`menu-item-${defaultProps.id}`)
    expect(menuItem).not.toHaveStyle(
      `background-color: ${colours.veryLightBlue}`,
    )
    expect(menuItem).not.toHaveStyle(`color: ${colours.teal}`)
  })
})
