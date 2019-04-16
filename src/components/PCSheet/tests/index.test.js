import PCSheet from '../index'

import {
  playerCharacter1Id,
  playerCharacter1Augmented,
} from 'mocks/playersCharacters'

const playerCharacter = playerCharacter1Augmented.toJS()
const mockHandleSubmit = jest.fn()
const defaultProps = {
  handleSubmit: mockHandleSubmit,
  playerCharacter: playerCharacter,
}

const renderComponent = (props = {}) =>
  render(<PCSheet {...defaultProps} {...props} />)

describe('<PCSheet />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  beforeAll(() => {
    jest.resetAllMocks()
  })

  it('should render correctly', () => {
    const { getByTestId, getByText, queryByText } = renderComponent()

    // Buttons
    const buttons = getByTestId(/form-buttons/i)
    expect(buttons).toBeInTheDocument()
    const editButton = getByTestId(/edit/i)
    expect(editButton).toBeInTheDocument()

    // General
    const pcSummary = getByTestId(`pc-summary-${playerCharacter1Id}`)
    expect(pcSummary).toBeInTheDocument()

    // Change form state
    fireEvent.click(editButton)

    const increaseWoundsButton = getByTestId(
      'increase-attributes.wounds.current',
    )
    fireEvent.click(increaseWoundsButton)
    const newWoundsValue = getByText('12')
    expect(newWoundsValue).toBeInTheDocument()

    const cancelButton = getByTestId(/cancel/i)
    expect(cancelButton).toBeInTheDocument()
    const submitButton = getByTestId(/submit/i)
    expect(submitButton).toBeInTheDocument()

    fireEvent.click(cancelButton)
    expect(editButton).toBeInTheDocument()

    const previousWoundsValue = queryByText('12')
    expect(previousWoundsValue).not.toBeInTheDocument()
  })

  it('should call handleSubmit on submit', async () => {
    const { getByTestId } = renderComponent()

    const editButton = getByTestId(/edit/i)
    fireEvent.click(editButton)

    const submitButton = getByTestId(/submit/i)
    fireEvent.click(submitButton)

    await wait(() => {
      expect(mockHandleSubmit).toHaveBeenCalled()
    })
  })
})
