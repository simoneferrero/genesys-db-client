import PCSheet from '../index'

import {
  playerCharacter1Id,
  playerCharacter1Augmented,
} from 'mocks/playersCharacters'

import { colours } from 'styles/constants'

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

    // Skills
    const skills = getByTestId(/skills/i)
    expect(skills).toBeInTheDocument()

    // Change form state
    fireEvent.click(editButton)

    // Check attributes change
    const increaseWoundsButton = getByTestId(
      'increase-attributes.wounds.current',
    )
    fireEvent.click(increaseWoundsButton)
    const newWoundsValue = getByText('12')
    expect(newWoundsValue).toBeInTheDocument()

    // Check skills change
    const athleticsRank = getByTestId('athletics-1')
    expect(athleticsRank).toBeInTheDocument()
    expect(athleticsRank).toHaveStyle(
      `background-color: ${colours.veryLightBlue}`,
    )
    const increaseAthleticsButton = getByTestId('increase-athletics-rank')
    expect(increaseAthleticsButton).toBeInTheDocument()
    fireEvent.click(increaseAthleticsButton)
    expect(athleticsRank).toHaveStyle(`background-color: ${colours.teal}`)

    // Form buttons
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
