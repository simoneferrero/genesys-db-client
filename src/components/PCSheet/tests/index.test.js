import PCSheet from '../index'

import { fromJS } from 'immutable'

import { factionsById } from 'mocks/factions'
import {
  playerCharacter1Response,
  playerCharacter1Id,
  playerCharacter1Augmented,
} from 'mocks/playersCharacters'
import { weaponsById } from 'mocks/weapons'

import { colours } from 'styles/constants'

const playerCharacter = playerCharacter1Augmented.toJS()
const mockAddFavor = jest.fn()
const mockAddPlayerCharacterWeapon = jest.fn()
const mockHandleSubmit = jest.fn()
const defaultProps = {
  addFavor: mockAddFavor,
  addPlayerCharacterWeapon: mockAddPlayerCharacterWeapon,
  factions: fromJS(factionsById).toJS(),
  handleSubmit: mockHandleSubmit,
  playerCharacter,
  weapons: fromJS(weaponsById).toJS(),
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
    const {
      getByDisplayValue,
      getByTestId,
      getByText,
      queryByText,
    } = renderComponent()

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

    // Weapons
    const weapons = getByTestId(/weapons-section/i)
    expect(weapons).toBeInTheDocument()

    // Motivations
    const motivations = getByTestId(/motivations/i)
    expect(motivations).toBeInTheDocument()

    // Favors
    const favors = getByTestId(/favors/i)
    expect(favors).toBeInTheDocument()

    // Notes
    const notes = getByTestId(/notes/i)
    expect(notes).toBeInTheDocument()

    // Equipment
    const equipment = getByTestId(/equipment/i)
    expect(equipment).toBeInTheDocument()

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

    // Check weapons change
    const deleteWeaponButton = getByTestId('deleteWeaponButton-1')
    expect(deleteWeaponButton).toBeInTheDocument()
    fireEvent.click(deleteWeaponButton)
    const undoButton = getByText(/undo/gi)
    expect(undoButton).toBeInTheDocument()

    // Check motivations change
    const strengthTypeInput = getByDisplayValue(
      playerCharacter1Response.motivations.strength.type,
    )
    expect(strengthTypeInput).toBeInTheDocument()
    const newStrengthType = 'Super strength'
    fireEvent.change(strengthTypeInput, { target: { value: newStrengthType } })
    const newStrengthTypeValue = getByDisplayValue(newStrengthType)
    expect(newStrengthTypeValue).toBeInTheDocument()

    // Check favors change
    const completeFavorButton = getByTestId('completeButton-1')
    expect(completeFavorButton).toBeInTheDocument()
    fireEvent.click(completeFavorButton)
    const revertFavorButton = getByTestId('revertButton-1')
    expect(revertFavorButton).toBeInTheDocument()

    // Check notes change
    const noteInput = getByDisplayValue(playerCharacter1Response.notes)
    expect(noteInput).toBeInTheDocument()
    const newNotes = 'These are new notes'
    fireEvent.change(noteInput, { target: { value: newNotes } })
    const newNotesValue = getByDisplayValue(newNotes)
    expect(newNotesValue).toBeInTheDocument()

    // Check equipment change
    const armorInput = getByDisplayValue(
      playerCharacter1Response.equipment.armor,
    )
    expect(armorInput).toBeInTheDocument()
    const newArmor = 'These is new armor info'
    fireEvent.change(armorInput, { target: { value: newArmor } })
    const newArmorValue = getByDisplayValue(newArmor)
    expect(newArmorValue).toBeInTheDocument()

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

  it('should reset the form on cancel', () => {
    const {
      getByDisplayValue,
      getByTestId,
      getByText,
      queryByDisplayValue,
      queryByTestId,
      queryByText,
    } = renderComponent()

    const editButton = getByTestId(/edit-pc-sheet/i)
    fireEvent.click(editButton)

    const increaseWoundsButton = getByTestId(
      'increase-attributes.wounds.current',
    )
    fireEvent.click(increaseWoundsButton)
    const newWoundsValue = getByText('12')
    expect(newWoundsValue).toBeInTheDocument()

    const athleticsRank = getByTestId('athletics-1')
    const increaseAthleticsButton = getByTestId('increase-athletics-rank')
    fireEvent.click(increaseAthleticsButton)
    expect(athleticsRank).toHaveStyle(`background-color: ${colours.teal}`)

    const deleteWeaponButton = getByTestId('deleteWeaponButton-1')
    fireEvent.click(deleteWeaponButton)
    const undoButton = getByText(/undo/gi)
    expect(undoButton).toBeInTheDocument()

    const strengthTypeInput = getByDisplayValue(
      playerCharacter1Response.motivations.strength.type,
    )
    const newStrengthType = 'Super strength'
    fireEvent.change(strengthTypeInput, { target: { value: newStrengthType } })
    const newStrengthTypeValue = getByDisplayValue(newStrengthType)
    expect(newStrengthTypeValue).toBeInTheDocument()

    const completeFavorButton = getByTestId('completeButton-1')
    fireEvent.click(completeFavorButton)
    const revertFavorButton = getByTestId('revertButton-1')
    expect(revertFavorButton).toBeInTheDocument()

    const noteInput = getByDisplayValue(playerCharacter1Response.notes)
    const newNotes = 'These are new notes'
    fireEvent.change(noteInput, { target: { value: newNotes } })
    const newNotesValue = getByDisplayValue(newNotes)
    expect(newNotesValue).toBeInTheDocument()

    const armorInput = getByDisplayValue(
      playerCharacter1Response.equipment.armor,
    )
    const newArmor = 'These is new armor info'
    fireEvent.change(armorInput, { target: { value: newArmor } })
    const newArmorValue = getByDisplayValue(newArmor)
    expect(newArmorValue).toBeInTheDocument()

    // Cancel form and check values revert
    const cancelButton = getByTestId(/cancel-pc-sheet/i)
    expect(cancelButton).toBeInTheDocument()
    fireEvent.click(cancelButton)

    const previousWoundsValue = queryByText('12')
    expect(previousWoundsValue).not.toBeInTheDocument()

    expect(athleticsRank).not.toHaveStyle(`background-color: ${colours.teal}`)

    const previousStrengthType = queryByText(newStrengthType)
    expect(previousStrengthType).not.toBeInTheDocument()

    const previousNotes = queryByText(newNotes)
    expect(previousNotes).not.toBeInTheDocument()

    const previousArmor = queryByText(newArmor)
    expect(previousArmor).not.toBeInTheDocument()

    // Open form and check values are default
    fireEvent.click(editButton)

    const previousFormWoundsValue = queryByText('12')
    expect(previousFormWoundsValue).not.toBeInTheDocument()

    expect(athleticsRank).not.toHaveStyle(`background-color: ${colours.teal}`)

    const previousFormUndoButton = queryByText(/undo/gi)
    expect(previousFormUndoButton).not.toBeInTheDocument()

    const previousFormStrengthType = queryByDisplayValue(newStrengthType)
    expect(previousFormStrengthType).not.toBeInTheDocument()

    const previousFormRevertButton = queryByTestId('revertButton-1')
    expect(previousFormRevertButton).not.toBeInTheDocument()

    const previousFormNotes = queryByDisplayValue(newNotes)
    expect(previousFormNotes).not.toBeInTheDocument()

    const previousFormArmor = queryByDisplayValue(newArmor)
    expect(previousFormArmor).not.toBeInTheDocument()
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

  it('should call addPlayerCharacterWeapon on weapon submit', async () => {
    const { getByTestId } = renderComponent()

    const editButton = getByTestId(/edit-weapon/i)
    fireEvent.click(editButton)

    const submitButton = getByTestId(/submit-weapon/i)
    fireEvent.click(submitButton)

    await wait(() => {
      expect(mockAddPlayerCharacterWeapon).toHaveBeenCalled()
    })
  })
})
