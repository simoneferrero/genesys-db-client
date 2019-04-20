import PCSheet from '../index'

import { fromJS } from 'immutable'

import { factionsById } from 'mocks/factions'
import {
  playerCharacter1Id,
  playerCharacter1Augmented,
} from 'mocks/playersCharacters'

import { colours } from 'styles/constants'

const playerCharacter = playerCharacter1Augmented.toJS()
const mockAddFavor = jest.fn()
const mockHandleSubmit = jest.fn()
const defaultProps = {
  addFavor: mockAddFavor,
  factions: fromJS(factionsById).toJS(),
  handleSubmit: mockHandleSubmit,
  playerCharacter,
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
    const buttons = getByTestId(/form-buttons-pc-sheet/i)
    expect(buttons).toBeInTheDocument()
    const editButton = getByTestId(/edit-pc-sheet/i)
    expect(editButton).toBeInTheDocument()

    // General
    const pcSummary = getByTestId(`pc-summary-${playerCharacter1Id}`)
    expect(pcSummary).toBeInTheDocument()

    // Skills
    const skills = getByTestId(/skills/i)
    expect(skills).toBeInTheDocument()

    // Favors
    const favors = getByTestId(/favors/i)
    expect(favors).toBeInTheDocument()

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
    expect(athleticsRank).toHaveStyle('background-color: transparent')
    const increaseAthleticsButton = getByTestId('increase-athletics-rank')
    expect(increaseAthleticsButton).toBeInTheDocument()
    fireEvent.click(increaseAthleticsButton)
    expect(athleticsRank).toHaveStyle(`background-color: ${colours.teal}`)

    // Check favors change
    const completeFavorButton = getByTestId('completeButton-1')
    expect(completeFavorButton).toBeInTheDocument()
    fireEvent.click(completeFavorButton)
    const revertFavorButton = getByTestId('revertButton-1')
    expect(revertFavorButton).toBeInTheDocument()

    // Form buttons
    const cancelButton = getByTestId(/cancel-pc-sheet/i)
    expect(cancelButton).toBeInTheDocument()
    const submitButton = getByTestId(/submit-pc-sheet/i)
    expect(submitButton).toBeInTheDocument()

    fireEvent.click(cancelButton)
    expect(editButton).toBeInTheDocument()

    const previousWoundsValue = queryByText('12')
    expect(previousWoundsValue).not.toBeInTheDocument()
  })

  it('should call handleSubmit on submit', async () => {
    const { getByTestId } = renderComponent()

    const editButton = getByTestId(/edit-pc-sheet/i)
    fireEvent.click(editButton)

    const submitButton = getByTestId(/submit-pc-sheet/i)
    fireEvent.click(submitButton)

    await wait(() => {
      expect(mockHandleSubmit).toHaveBeenCalled()
    })
  })

  it('should call addFavor on favor submit', async () => {
    const { getByPlaceholderText, getByTestId } = renderComponent()

    const editButton = getByTestId(/edit-favor-owed/i)
    fireEvent.click(editButton)

    const description = getByPlaceholderText(/add description.../i)
    fireEvent.change(description, {
      target: { value: 'This is a new description' },
    })

    const submitButton = getByTestId(/submit-favor-owed/i)
    fireEvent.click(submitButton)

    await wait(() => {
      expect(mockAddFavor).toHaveBeenCalled()
    })
  })
})
