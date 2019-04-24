import render from 'utils/customTestRenderers'
import Sidebar from '../index'

import { colours, menuCoverOpacity, menuWidth } from 'styles/constants'

import AuthenticationRecord from 'reducers/authentication/records'

import { emptyStore, store } from 'mocks'
import { authInfoGmResponse } from 'mocks/authentication'

jest.mock('actions/authentication', () => ({
  logout: jest.fn(() => ({ type: '' })),
}))
import { logout } from 'actions/authentication'

const renderComponent = (props = {}, initialState) =>
  render(<Sidebar {...props} />, { initialState })

const closedStyleAssertions = (sidebar, cover, icon) => {
  expect(sidebar).toHaveStyle(`left: -${menuWidth}px`)

  expect(cover).toHaveStyle('opacity: 0')
  expect(cover).toHaveStyle('pointer-events: none')

  expect(icon).toHaveStyle(`colour: ${colours.teal}`)
}
const openStyleAssertions = (sidebar, cover, icon) => {
  expect(sidebar).toHaveStyle('left: 0')

  expect(cover).toHaveStyle(`opacity: ${menuCoverOpacity}`)
  expect(cover).not.toHaveStyle('pointer-events: none')

  expect(icon).toHaveStyle(`colour: ${colours.veryLightBlue}`)
}

describe('<Sidebar />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should return nothing if role is undefined', () => {
    const { queryByTestId } = renderComponent(null, emptyStore)

    const sidebar = queryByTestId(/sidebar/i)
    expect(sidebar).not.toBeInTheDocument()
  })

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

    const logoutButton = getByText(/logout/gi)
    expect(logoutButton).toBeInTheDocument()

    // Closed menu
    closedStyleAssertions(sidebar, cover, icon)

    // Open menu
    fireEvent.click(icon)

    openStyleAssertions(sidebar, cover, icon)

    const iconClose = getByTestId(/icon-close/i)
    expect(iconClose).toBeInTheDocument()

    // Close menu
    fireEvent.click(icon)
    const rerenderedIconMenu = getByTestId(/icon-menu/i)
    expect(rerenderedIconMenu).toBeInTheDocument()

    closedStyleAssertions(sidebar, cover, icon)
  })

  it('should behave correctly on cover click', () => {
    const { getByTestId } = renderComponent()

    const cover = getByTestId(/cover/i)

    // Nothing happens when clicking on closed cover
    fireEvent.click(cover)

    const sidebar = getByTestId(/sidebar/i)
    const icon = getByTestId(/icon/i)
    closedStyleAssertions(sidebar, cover, icon)

    const iconMenu = getByTestId(/icon-menu/i)
    expect(iconMenu).toBeInTheDocument()

    // Open menu and close on cover click
    fireEvent.click(icon)
    fireEvent.click(cover)

    closedStyleAssertions(sidebar, cover, icon)

    const rerenderedIconMenu = getByTestId(/icon-menu/i)
    expect(rerenderedIconMenu).toBeInTheDocument()
  })

  it('should change routes correctly for player', async () => {
    const { getByTestId, getByText } = renderComponent()

    const sidebar = getByTestId(/sidebar/i)
    const icon = getByTestId(/icon/i)
    const cover = getByTestId(/cover/i)

    const playersCharactersMenuItem = getByTestId(/menu-item-player-character/i)
    fireEvent.click(playersCharactersMenuItem)

    const playersCharactersRoute = await waitForElement(() =>
      getByTestId(/player-character/i),
    )
    expect(playersCharactersRoute).toBeInTheDocument()

    const logoutButton = getByText(/logout/gi)
    fireEvent.click(logoutButton)
    expect(logout).toHaveBeenCalledTimes(1)
    closedStyleAssertions(sidebar, cover, icon)
  })

  it('should change routes correctly for gm', async () => {
    const modifiedStore = store.set(
      'authentication',
      AuthenticationRecord(authInfoGmResponse),
    )
    const { getByTestId, getByText } = renderComponent(null, modifiedStore)

    const sidebar = getByTestId(/sidebar/i)
    const icon = getByTestId(/icon/i)
    const cover = getByTestId(/cover/i)

    const playersCharactersMenuItem = getByTestId(
      /menu-item-players-characters/i,
    )
    fireEvent.click(playersCharactersMenuItem)

    const playersCharactersRoute = await waitForElement(() =>
      getByTestId(/players-characters/i),
    )
    expect(playersCharactersRoute).toBeInTheDocument()

    const logoutButton = getByText(/logout/gi)
    fireEvent.click(logoutButton)
    expect(logout).toHaveBeenCalledTimes(1)
    closedStyleAssertions(sidebar, cover, icon)
  })
})
