import Notes from '../index'

import { playerCharacter1Response } from 'mocks/playersCharacters'

const { notes } = playerCharacter1Response
const mockHandleSubmit = jest.fn()
const mockSetFieldValue = jest.fn()
const defaultProps = {
  notes,
  handleSubmit: mockHandleSubmit,
  setFieldValue: mockSetFieldValue,
}

const renderComponent = (props = {}) =>
  render(<Notes {...defaultProps} {...props} />)

describe('<Notes />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render correctly', () => {
    const { getByTestId, getByText } = renderComponent()

    const notesWrapper = getByTestId(/notes/gi)
    expect(notesWrapper).toBeInTheDocument()

    const renderedNote = getByText(notes)
    expect(renderedNote).toBeInTheDocument()
  })

  it('should render correctly when editing', () => {
    const props = {
      editing: true,
    }
    const { getByDisplayValue, queryByTestId } = renderComponent(props)

    const renderedNote = queryByTestId(/notes-paragraph/i)
    expect(renderedNote).not.toBeInTheDocument()

    const noteInput = getByDisplayValue(notes)
    expect(noteInput).toBeInTheDocument()

    const newNote = 'This is a new note'
    fireEvent.change(noteInput, { target: { value: newNote } })

    expect(mockSetFieldValue).toHaveBeenCalledWith('notes', newNote)
  })

  it('should render correctly when submitting', () => {
    const props = {
      editing: true,
      isSubmitting: true,
    }
    const { getByDisplayValue } = renderComponent(props)

    const noteInput = getByDisplayValue(notes)
    expect(noteInput).toBeInTheDocument()
    expect(noteInput).toBeDisabled()
  })
})
