import render from 'utils/customTestRenderers'

import Home from '../index'

import { password, username } from 'mocks/authentication'
import { emptyStore } from 'mocks'

jest.mock('redux-saga', () => () => {})

jest.mock('actions/authentication', () => ({
  login: jest.fn(() => ({ type: '' })),
  loginSuccess: jest.fn(() => ({ type: '' })),
  loginError: jest.fn(() => ({ type: '' })),
  logout: jest.fn(() => ({ type: '' })),
  getAuthInfo: jest.fn(() => ({ type: '' })),
  getAuthInfoSuccess: jest.fn(() => ({ type: '' })),
  getAuthInfoError: jest.fn(() => ({ type: '' })),
}))
import { login, getAuthInfo } from 'actions/authentication'

const renderComponent = (props = {}, initialState) =>
  render(<Home {...props} />, { initialState })

describe('<Home />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render the page correctly when authenticated', () => {
    const { getByTestId, getByText, queryByTestId } = renderComponent()

    const home = getByTestId(/home/i)
    expect(home).toBeInTheDocument()

    const genesysLogo = getByTestId(/genesys-logo/i)
    expect(genesysLogo).toBeInTheDocument()

    const title = getByText(/genesys db/i)
    expect(title).toBeInTheDocument()

    const loginForm = queryByTestId(/login/gi)
    expect(loginForm).not.toBeInTheDocument()

    const greeting = getByText(`Hello, ${username}!`)
    expect(greeting).toBeInTheDocument()
  })

  it('should render the page correctly when not authenticated', async () => {
    const {
      getByPlaceholderText,
      getByTestId,
      getByText,
      queryByTestId,
    } = renderComponent(null, emptyStore)

    const home = getByTestId(/home/i)
    expect(home).toBeInTheDocument()

    const genesysLogo = getByTestId(/genesys-logo/i)
    expect(genesysLogo).toBeInTheDocument()

    const title = getByText(/genesys db/i)
    expect(title).toBeInTheDocument()

    const greeting = queryByTestId(`Hello, ${username}!`)
    expect(greeting).not.toBeInTheDocument()

    const loginForm = getByTestId(/login/gi)
    expect(loginForm).toBeInTheDocument()

    const usernameField = getByPlaceholderText(/username/gi)

    const passwordField = getByPlaceholderText(/password/gi)

    const submitButton = getByTestId(/login-button/gi)

    fireEvent.change(usernameField, { target: { value: username } })
    fireEvent.change(passwordField, { target: { value: password } })

    fireEvent.click(submitButton)

    await wait(() => {
      expect(login).toHaveBeenCalledTimes(1)
    })
  })

  it('should dispatch fetch actions on mount', () => {
    renderComponent()
    expect(getAuthInfo).toHaveBeenCalledTimes(1)
  })
})
