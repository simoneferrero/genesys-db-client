import PCSheet from '../index'

import { fromJS } from 'immutable'

import {
  criticalInjuries,
  criticalInjury1,
  criticalInjury3,
} from 'mocks/criticalInjuries'
import { factionsById } from 'mocks/factions'
import {
  playerCharacter1Response,
  playerCharacter1Id,
  playerCharacter1Augmented,
} from 'mocks/playersCharacters'
import { talentsById } from 'mocks/talents'
import { weaponsById } from 'mocks/weapons'

import { colours } from 'styles/constants'

const playerCharacter = playerCharacter1Augmented.toJS()
const mockAddFavor = jest.fn()
const mockAddPlayerCharacterCriticalInjury = jest.fn()
const mockAddPlayerCharacterTalent = jest.fn()
const mockAddPlayerCharacterWeapon = jest.fn()
const mockHandleSubmit = jest.fn()
const defaultProps = {
  addFavor: mockAddFavor,
  addPlayerCharacterCriticalInjury: mockAddPlayerCharacterCriticalInjury,
  addPlayerCharacterTalent: mockAddPlayerCharacterTalent,
  addPlayerCharacterWeapon: mockAddPlayerCharacterWeapon,
  criticalInjuries: [...criticalInjuries, criticalInjury3],
  factions: fromJS(factionsById).toJS(),
  handleSubmit: mockHandleSubmit,
  playerCharacter,
  talents: fromJS(talentsById).toJS(),
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
      getAllByText,
      getByDisplayValue,
      getByTestId,
      getByText,
      queryByText,
    } = renderComponent()

    // Buttons
    const buttons = getByTestId('form-buttons-pc-sheet')
    expect(buttons).toBeInTheDocument()
    const editButton = getByTestId('edit-pc-sheet')
    expect(editButton).toBeInTheDocument()

    // General
    const pcSummary = getByTestId(`pc-summary-${playerCharacter1Id}`)
    expect(pcSummary).toBeInTheDocument()

    // Skills
    const skills = getByTestId('skills')
    expect(skills).toBeInTheDocument()

    // Weapons
    const weapons = getByTestId('weapons-section')
    expect(weapons).toBeInTheDocument()

    // Talents
    const talents = getByTestId('talents-section')
    expect(talents).toBeInTheDocument()

    // Critical injuries
    const criticalInjuries = getByTestId('criticalInjuries-section')
    expect(criticalInjuries).toBeInTheDocument()

    // Motivations
    const motivations = getByTestId('motivations')
    expect(motivations).toBeInTheDocument()

    // Favors
    const favors = getByTestId('favors')
    expect(favors).toBeInTheDocument()

    // Notes
    const notes = getByTestId('notes')
    expect(notes).toBeInTheDocument()

    // Equipment
    const equipment = getByTestId('equipment')
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
    const undoButtons = getAllByText(/undo/gi)
    expect(undoButtons.length).toBe(1)

    // Check talents change
    const talentNotes = getByTestId(`talent-1-notes`)
    expect(talentNotes).toBeInTheDocument()

    const notesText = 'New notes'

    fireEvent.change(talentNotes, {
      target: {
        value: notesText,
      },
    })

    const changedTalentNotes = getByDisplayValue(notesText)
    expect(changedTalentNotes).toBeInTheDocument()

    // Check critical injuries change
    const healButton = getByTestId('healButton-1')
    expect(healButton).toBeInTheDocument()
    fireEvent.click(healButton)
    const updatedUndoButtons = getAllByText(/undo/gi)
    expect(updatedUndoButtons.length).toBe(2)

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
    const cancelButton = getByTestId('cancel-pc-sheet')
    expect(cancelButton).toBeInTheDocument()
    const submitButton = getByTestId('submit-pc-sheet')
    expect(submitButton).toBeInTheDocument()

    fireEvent.click(cancelButton)
    expect(editButton).toBeInTheDocument()

    const previousWoundsValue = queryByText('12')
    expect(previousWoundsValue).not.toBeInTheDocument()
  })

  it('should reset the form on cancel', () => {
    const {
      getAllByText,
      getByDisplayValue,
      getByTestId,
      getByText,
      queryAllByText,
      queryByDisplayValue,
      queryByTestId,
      queryByText,
    } = renderComponent()

    const editButton = getByTestId('edit-pc-sheet')
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
    const undoButtons = getAllByText(/undo/gi)
    expect(undoButtons.length).toBe(1)

    const talentNotes = getByTestId(`talent-1-notes`)
    const notesText = 'New notes'
    fireEvent.change(talentNotes, {
      target: {
        value: notesText,
      },
    })
    const changedTalentNotes = getByDisplayValue(notesText)
    expect(changedTalentNotes).toBeInTheDocument()

    const healButton = getByTestId('healButton-1')
    expect(healButton).toBeInTheDocument()
    fireEvent.click(healButton)
    const updatedUndoButtons = getAllByText(/undo/gi)
    expect(updatedUndoButtons.length).toBe(2)

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
    const cancelButton = getByTestId('cancel-pc-sheet')
    expect(cancelButton).toBeInTheDocument()
    fireEvent.click(cancelButton)

    const previousWoundsValue = queryByText('12')
    expect(previousWoundsValue).not.toBeInTheDocument()

    const diceValue = getByText(criticalInjury1.dice_value)
    expect(diceValue).not.toHaveStyle('text-decoration: line-through;')

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

    const revertedTalentNotes = queryByDisplayValue(notesText)
    expect(revertedTalentNotes).not.toBeInTheDocument()

    const previousFormUndoButton = queryAllByText(/undo/gi)
    expect(previousFormUndoButton.length).toBe(0)

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

    const editButton = getByTestId('edit-pc-sheet')
    fireEvent.click(editButton)

    const submitButton = getByTestId('submit-pc-sheet')
    fireEvent.click(submitButton)

    await wait(() => {
      expect(mockHandleSubmit).toHaveBeenCalled()
    })
  })

  it('should call addFavor on favor submit', async () => {
    const { getByPlaceholderText, getByTestId } = renderComponent()

    const editButton = getByTestId('edit-favor-owed')
    fireEvent.click(editButton)

    const description = getByPlaceholderText(/add description.../i)
    fireEvent.change(description, {
      target: { value: 'This is a new description' },
    })

    const submitButton = getByTestId('submit-favor-owed')
    fireEvent.click(submitButton)

    await wait(() => {
      expect(mockAddFavor).toHaveBeenCalled()
    })
  })

  it('should call addPlayerCharacterWeapon on weapon submit', async () => {
    const { getByTestId } = renderComponent()

    const editButton = getByTestId('edit-weapon')
    fireEvent.click(editButton)

    const submitButton = getByTestId('submit-weapon')
    fireEvent.click(submitButton)

    await wait(() => {
      expect(mockAddPlayerCharacterWeapon).toHaveBeenCalled()
    })
  })

  it('should call addPlayerCharacterTalent on weapon submit', async () => {
    const { getByTestId } = renderComponent()

    const editButton = getByTestId('edit-tier-1-talents')
    fireEvent.click(editButton)

    const submitButton = getByTestId('submit-tier-1-talents')
    fireEvent.click(submitButton)

    await wait(() => {
      expect(mockAddPlayerCharacterTalent).toHaveBeenCalled()
    })
  })

  it('should call addPlayerCharacterCriticalInjury on critical injury submit', async () => {
    const { getByTestId } = renderComponent()

    const editButton = getByTestId('edit-criticalInjury')
    fireEvent.click(editButton)

    const submitButton = getByTestId('submit-criticalInjury')
    fireEvent.click(submitButton)

    await wait(() => {
      expect(mockAddPlayerCharacterCriticalInjury).toHaveBeenCalled()
    })
  })
})
