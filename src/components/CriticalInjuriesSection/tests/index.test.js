import CriticalInjuriesSection from '../index'

import {
  criticalInjury1,
  criticalInjury2,
  criticalInjury3,
} from 'mocks/criticalInjuries'
import { playerCharacter1CriticalInjuriesAugmented as characterCriticalInjuries } from 'mocks/playersCharacters'

const mockHandleSubmit = jest.fn()
const mockOnCriticalInjuryChange = jest.fn()
const criticalInjuries = [criticalInjury1, criticalInjury2, criticalInjury3]
const defaultProps = {
  criticalInjuries,
  handleSubmit: mockHandleSubmit,
  onCriticalInjuryChange: mockOnCriticalInjuryChange,
}

const renderComponent = (props = {}) =>
  render(<CriticalInjuriesSection {...defaultProps} {...props} />)

describe('<CriticalInjuriesSection />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render correctly', () => {
    const { getByTestId, queryByTestId } = renderComponent()

    const criticalInjuriesSection = getByTestId('criticalInjuries-section')
    expect(criticalInjuriesSection).toBeInTheDocument()

    const editButton = queryByTestId(/edit/i)
    expect(editButton).not.toBeInTheDocument()

    const newCriticalInjuryId = queryByTestId('criticalInjuryId')
    expect(newCriticalInjuryId).not.toBeInTheDocument()

    Object.values(criticalInjuries).forEach(({ id }) => {
      const criticalInjury = getByTestId(`criticalInjury-${id}`)
      expect(criticalInjury).toBeInTheDocument()

      const editCriticalInjuryButton = queryByTestId(`healButton-${id}`)
      expect(editCriticalInjuryButton).not.toBeInTheDocument()
    })
  })

  it('should render correctly when isCharacter', () => {
    const props = {
      characterCriticalInjuries,
      isCharacter: true,
    }
    const { getByDisplayValue, getByTestId, queryByTestId } = renderComponent(
      props,
    )

    const criticalInjuriesSection = getByTestId('criticalInjuries-section')
    expect(criticalInjuriesSection).toBeInTheDocument()

    const editButton = getByTestId(/edit/i)
    expect(editButton).toBeInTheDocument()

    const newCriticalInjuryId = queryByTestId('criticalInjuryId')
    expect(newCriticalInjuryId).not.toBeInTheDocument()

    Object.values(characterCriticalInjuries).forEach(({ id }) => {
      const criticalInjury = getByTestId(`criticalInjury-${id}`)
      expect(criticalInjury).toBeInTheDocument()

      const editCriticalInjuryButton = queryByTestId(`healButton-${id}`)
      expect(editCriticalInjuryButton).not.toBeInTheDocument()
    })

    fireEvent.click(editButton)

    const criticalInjuryIdSelect = getByTestId('criticalInjuryId')
    expect(criticalInjuryIdSelect).toBeInTheDocument()
    const criticalInjuryIdValue = getByDisplayValue(`${criticalInjuries[0].id}`)
    expect(criticalInjuryIdValue).toBeInTheDocument()

    const cancelButton = getByTestId(/cancel/i)
    expect(cancelButton).toBeInTheDocument()

    const submitButton = getByTestId(/submit/i)
    expect(submitButton).toBeInTheDocument()

    fireEvent.click(cancelButton)

    const unmountedCriticalInjuryIdSelect = queryByTestId('criticalInjuryId')
    expect(unmountedCriticalInjuryIdSelect).not.toBeInTheDocument()

    expect(editButton).toBeInTheDocument()
  })

  it('should reset the form on cancel', () => {
    const props = {
      isCharacter: true,
    }

    const {
      getByDisplayValue,
      getByTestId,
      queryByDisplayValue,
    } = renderComponent(props)

    const editButton = getByTestId(/edit/i)
    fireEvent.click(editButton)

    const cancelButton = getByTestId(/cancel/i)
    expect(cancelButton).toBeInTheDocument()

    const criticalInjuryIdValue = getByDisplayValue(`${criticalInjuries[0].id}`)
    expect(criticalInjuryIdValue).toBeInTheDocument()
    fireEvent.change(criticalInjuryIdValue, {
      target: {
        value: criticalInjury2.id,
      },
    })
    const populatedName = getByDisplayValue(`${criticalInjuries[1].id}`)
    expect(populatedName).toBeInTheDocument()

    fireEvent.click(cancelButton)

    fireEvent.click(editButton)

    const resetName = queryByDisplayValue(`${criticalInjuries[1].id}`)
    expect(resetName).not.toBeInTheDocument()

    expect(editButton).toBeInTheDocument()
  })

  it('should not break if criticalInjuries are empty', () => {
    const props = {
      criticalInjuries: [],
    }

    const { getByTestId } = renderComponent(props)

    const criticalInjuriesSection = getByTestId('criticalInjuries-section')
    expect(criticalInjuriesSection).toBeInTheDocument()
  })

  it('should render correctly when editing', () => {
    const props = {
      characterCriticalInjuries,
      deletedCriticalInjuries: { ['1']: true },
      editing: true,
      isCharacter: true,
    }
    const { getByTestId } = renderComponent(props)

    Object.values(characterCriticalInjuries).forEach(({ id }) => {
      const criticalInjury = getByTestId(`criticalInjury-${id}`)
      expect(criticalInjury).toBeInTheDocument()

      const healButton = getByTestId(
        id !== 1 ? `healButton-${id}` : `undoButton-${id}`,
      )
      expect(healButton).toBeInTheDocument()

      fireEvent.click(healButton)

      expect(mockOnCriticalInjuryChange).toHaveBeenCalledWith(
        `deletedCriticalInjuries.${id}`,
        id !== 1,
      )
    })
  })

  it('should correctly submit new critical injury', async () => {
    const props = {
      isCharacter: true,
    }
    const { getByTestId } = renderComponent(props)

    const editButton = getByTestId(/edit/i)
    fireEvent.click(editButton)

    const submitButton = getByTestId(/submit/i)
    fireEvent.click(submitButton)

    await wait(() => {
      expect(mockHandleSubmit).toHaveBeenCalledTimes(1)
    })
  })
})
