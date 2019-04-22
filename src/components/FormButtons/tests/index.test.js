import FormButtons from '../index'

import { MdAdd, MdThumbDown, MdThumbUp } from 'react-icons/md'

const name = 'test'
const mockSetShowButtons = jest.fn()
const defaultProps = {
  name,
  setShowButtons: mockSetShowButtons,
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

    const editButton = getByTestId(`edit-${name}`)
    expect(editButton).toBeInTheDocument()
    expect(editButton).not.toBeDisabled()

    fireEvent.click(editButton)
    expect(mockSetShowButtons).toHaveBeenCalledWith(true)

    const cancelButton = queryByTestId(`cancel-${name}`)
    expect(cancelButton).not.toBeInTheDocument()

    const submitButton = queryByTestId(`submit-${name}`)
    expect(submitButton).not.toBeInTheDocument()
  })

  it('should render correctly when provided with custom icons', () => {
    const props = {
      icons: {
        cancel: <MdThumbDown data-testid="thumb-down" />,
        edit: <MdAdd data-testid="add" />,
        submit: <MdThumbUp data-testid="thumb-up" />,
      },
    }
    const { getByTestId, rerender } = renderComponent(props)

    const editButton = getByTestId(/add/i)
    expect(editButton).toBeInTheDocument()

    rerender(<FormButtons {...defaultProps} {...props} showButtons />)

    const cancelButton = getByTestId(/thumb-down/i)
    expect(cancelButton).toBeInTheDocument()

    const submitButton = getByTestId(/thumb-up/i)
    expect(submitButton).toBeInTheDocument()
  })

  it('should render correctly when showButtons', () => {
    const props = {
      showButtons: true,
    }
    const { getByTestId, queryByTestId } = renderComponent(props)

    const editButton = queryByTestId(`edit-${name}`)
    expect(editButton).not.toBeInTheDocument()

    const cancelButton = getByTestId(`cancel-${name}`)
    expect(cancelButton).toBeInTheDocument()
    expect(cancelButton).not.toBeDisabled()

    fireEvent.click(cancelButton)
    expect(mockSetShowButtons).toHaveBeenCalledWith(false)

    const submitButton = getByTestId(`submit-${name}`)
    expect(submitButton).toBeInTheDocument()
    expect(submitButton).not.toBeDisabled()
  })

  it('should render correctly when disabled', () => {
    const props = {
      disabled: true,
      showButtons: true,
    }
    const { getByTestId, queryByTestId } = renderComponent(props)

    const editButton = queryByTestId(`edit-${name}`)
    expect(editButton).not.toBeInTheDocument()

    const cancelButton = getByTestId(`cancel-${name}`)
    expect(cancelButton).toBeInTheDocument()
    expect(cancelButton).toBeDisabled()

    fireEvent.click(cancelButton)
    expect(mockSetShowButtons).not.toHaveBeenCalled()

    const submitButton = getByTestId(`submit-${name}`)
    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toBeDisabled()
  })

  it('should correctly call handleSubmit when provided and clicked', () => {
    const mockHandleSubmit = jest.fn()
    const props = {
      handleSubmit: mockHandleSubmit,
      showButtons: true,
    }
    const { getByTestId } = renderComponent(props)
    const submitButton = getByTestId(`submit-${name}`)

    fireEvent.click(submitButton)

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1)
  })
})
