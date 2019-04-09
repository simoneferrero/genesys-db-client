import FormButtons from '../index'

const mockSetEditing = jest.fn()
const defaultProps = {
  disabled: false,
  editing: false,
  setEditing: mockSetEditing,
}

const renderComponent = (props = {}) =>
  render(<FormButtons {...defaultProps} {...props} />)

describe('<FormButtons />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render correctly when static', () => {
    const { getByTestId, queryByTestId } = renderComponent()

    const editButton = getByTestId(/edit/i)
    expect(editButton).toBeInTheDocument()
    expect(editButton).not.toBeDisabled()

    fireEvent.click(editButton)
    expect(mockSetEditing).toHaveBeenCalledWith(true)

    const cancelButton = queryByTestId(/cancel/i)
    expect(cancelButton).not.toBeInTheDocument()

    const submitButton = queryByTestId(/submit/i)
    expect(submitButton).not.toBeInTheDocument()
  })

  it('should render correctly when editing', () => {
    const props = {
      editing: true,
    }
    const { getByTestId, queryByTestId } = renderComponent(props)

    const editButton = queryByTestId(/edit/i)
    expect(editButton).not.toBeInTheDocument()

    const cancelButton = getByTestId(/cancel/i)
    expect(cancelButton).toBeInTheDocument()
    expect(cancelButton).not.toBeDisabled()

    fireEvent.click(cancelButton)
    expect(mockSetEditing).toHaveBeenCalledWith(false)

    const submitButton = getByTestId(/submit/i)
    expect(submitButton).toBeInTheDocument()
    expect(submitButton).not.toBeDisabled()
  })

  it('should render correctly when disabled', () => {
    const props = {
      disabled: true,
      editing: true,
    }
    const { getByTestId, queryByTestId } = renderComponent(props)

    const editButton = queryByTestId(/edit/i)
    expect(editButton).not.toBeInTheDocument()

    const cancelButton = getByTestId(/cancel/i)
    expect(cancelButton).toBeInTheDocument()
    expect(cancelButton).toBeDisabled()

    fireEvent.click(cancelButton)
    expect(mockSetEditing).not.toHaveBeenCalled()

    const submitButton = getByTestId(/submit/i)
    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toBeDisabled()
  })
})
