import Login from '../index'

import { colours } from 'styles/constants'

const mockHandleSubmit = jest.fn()
const username = 'testUsername'
const password = 'testPassword'
const mainError = 'There was an error'
const defaultProps = {
  handleSubmit: mockHandleSubmit,
}

const renderComponent = (props = {}) =>
  render(<Login {...defaultProps} {...props} />)

describe('<Login />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render correctly', async () => {
    const {
      getByPlaceholderText,
      getByTestId,
      queryByTestId,
    } = renderComponent()

    const form = getByTestId(/login/gi)
    expect(form).toBeInTheDocument()

    const usernameField = getByPlaceholderText(/username/gi)
    expect(usernameField).toBeInTheDocument()
    expect(usernameField).not.toHaveStyle(`
      border-color: ${colours.orange};
      color: ${colours.orange};
    `)

    const passwordField = getByPlaceholderText(/password/gi)
    expect(passwordField).toBeInTheDocument()
    expect(passwordField).not.toHaveStyle(`
      border-color: ${colours.orange};
      color: ${colours.orange};
    `)

    const submitButton = getByTestId(/login-button/gi)
    expect(submitButton).toBeInTheDocument()

    const error = queryByTestId(/login-error/gi)
    expect(error).not.toBeInTheDocument()

    fireEvent.click(submitButton)

    await wait(async () => {
      expect(mockHandleSubmit).not.toHaveBeenCalled()
      expect(usernameField).toHaveStyle(`
        color: ${colours.orange};
      `)
      expect(passwordField).toHaveStyle(`
        color: ${colours.orange};
      `)

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.change(passwordField, { target: { value: password } })
      expect(usernameField).not.toHaveStyle(`
        border-color: ${colours.orange};
        color: ${colours.orange};
      `)
      expect(passwordField).not.toHaveStyle(`
        border-color: ${colours.orange};
        color: ${colours.orange};
      `)

      fireEvent.click(submitButton)

      await wait(() => {
        expect(mockHandleSubmit).toHaveBeenCalled()
      })
    })
  })

  it('should display mainError', async () => {
    mockHandleSubmit.mockImplementation((values, actions) => {
      actions.setErrors({ mainError })
    })

    const { getByPlaceholderText, getByTestId, getByText } = renderComponent()

    const usernameField = getByPlaceholderText(/username/gi)

    const passwordField = getByPlaceholderText(/password/gi)

    const submitButton = getByTestId(/login-button/gi)

    fireEvent.change(usernameField, { target: { value: username } })
    fireEvent.change(passwordField, { target: { value: password } })

    fireEvent.click(submitButton)

    await wait(() => {
      expect(mockHandleSubmit).toHaveBeenCalled()
      const error = getByText(mainError)
      expect(error).toBeInTheDocument()
    })
  })
})
