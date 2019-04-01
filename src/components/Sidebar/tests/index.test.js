import Sidebar from '../index'

import { menuCoverOpacity, menuWidth } from 'styles/constants'

const childrenText = 'ROUTE 1'
const defaultProps = {
  children: <span>{childrenText}</span>,
}
const renderComponent = (props = {}) =>
  render(<Sidebar {...defaultProps} {...props} />)

const closedStyleAssertions = (sidebar, cover) => {
  expect(sidebar).toHaveStyle(`left: -${menuWidth}px`)

  expect(cover).toHaveStyle('opacity: 0')
  expect(cover).toHaveStyle('pointer-events: none')
}
const openStyleAssertions = (sidebar, cover) => {
  expect(sidebar).toHaveStyle('left: 0')

  expect(cover).toHaveStyle(`opacity: ${menuCoverOpacity}`)
  expect(cover).not.toHaveStyle('pointer-events: none')
}

describe('<Sidebar />', () => {
  it('should open, close and render correctly on icon click', () => {
    const { getByTestId, getByText } = renderComponent()

    const sidebar = getByTestId(/sidebar/i)
    expect(sidebar).toBeInTheDocument()

    const icon = getByTestId(/icon/i)
    expect(icon).toBeInTheDocument()

    const iconMenu = getByTestId(/icon-menu/i)
    expect(iconMenu).toBeInTheDocument()

    const cover = getByTestId(/cover/i)
    expect(cover).toBeInTheDocument()

    const renderedChildren = getByText(childrenText)
    expect(renderedChildren).toBeInTheDocument()

    // Closed menu
    closedStyleAssertions(sidebar, cover)

    // Open menu
    fireEvent.click(icon)

    openStyleAssertions(sidebar, cover)

    const iconClose = getByTestId(/icon-close/i)
    expect(iconClose).toBeInTheDocument()

    // Close menu
    fireEvent.click(icon)
    const rerenderedIconMenu = getByTestId(/icon-menu/i)
    expect(rerenderedIconMenu).toBeInTheDocument()

    closedStyleAssertions(sidebar, cover)
  })

  it('should behave correctly on cover click', () => {
    const { getByTestId } = renderComponent()

    const cover = getByTestId(/cover/i)

    // Nothing happens when clicking on closed cover
    fireEvent.click(cover)

    const sidebar = getByTestId(/sidebar/i)
    closedStyleAssertions(sidebar, cover)

    const iconMenu = getByTestId(/icon-menu/i)
    expect(iconMenu).toBeInTheDocument()

    // Open menu and close on cover click
    const icon = getByTestId(/icon/i)
    fireEvent.click(icon)
    fireEvent.click(cover)

    closedStyleAssertions(sidebar, cover)

    const rerenderedIconMenu = getByTestId(/icon-menu/i)
    expect(rerenderedIconMenu).toBeInTheDocument()
  })

  it('should behave correctly on children click', () => {
    const { getByTestId, getByText } = renderComponent()

    const renderedChildren = getByText(childrenText)

    // Open menu and close on children click
    const icon = getByTestId(/icon/i)
    fireEvent.click(icon)
    fireEvent.click(renderedChildren)

    const sidebar = getByTestId(/sidebar/i)
    const cover = getByTestId(/cover/i)

    closedStyleAssertions(sidebar, cover)

    const rerenderedIconMenu = getByTestId(/icon-menu/i)
    expect(rerenderedIconMenu).toBeInTheDocument()
  })
})
