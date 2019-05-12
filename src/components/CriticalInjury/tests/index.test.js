import CriticalInjury from '../index'

import { criticalInjury1, criticalInjury2 } from 'mocks/criticalInjuries'
import { playerCharacter1CriticalInjuriesAugmented } from 'mocks/playersCharacters'

const mockSetFieldValue = jest.fn()
const defaultProps = {
  criticalInjury: criticalInjury1,
  setFieldValue: mockSetFieldValue,
}

const renderComponent = (props = {}) =>
  render(<CriticalInjury {...defaultProps} {...props} />)

describe('<CriticalInjury />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render correctly when not editing and not in character sheet', () => {
    const { getByTestId, getByText, queryByTestId } = renderComponent()

    const criticalInjury = getByTestId(`criticalInjury-${criticalInjury1.id}`)
    expect(criticalInjury).toBeInTheDocument()

    const diceValue = getByText(criticalInjury1.dice_value)
    expect(diceValue).toBeInTheDocument()
    expect(diceValue).not.toHaveStyle('opacity: 0.5;')
    expect(diceValue).not.toHaveStyle('text-decoration: line-through;')

    const name = getByText(criticalInjury1.name)
    expect(name).toBeInTheDocument()
    expect(name).not.toHaveStyle('opacity: 0.5;')
    expect(name).not.toHaveStyle('text-decoration: line-through;')

    const severity = getByTestId(
      `criticalInjury-${criticalInjury1.id}-severity`,
    )
    expect(severity).toBeInTheDocument()
    expect(severity).not.toHaveStyle('opacity: 0.5;')
    expect(severity).not.toHaveStyle('text-decoration: line-through;')

    const severityText = [...Array(criticalInjury1.severity)]
      .map(() => 'k')
      .join(' ')
    const severityTextElement = getByText(severityText)
    expect(severityTextElement).toBeInTheDocument()

    const effects = getByText(criticalInjury1.effects)
    expect(effects).toBeInTheDocument()
    expect(effects).not.toHaveStyle('opacity: 0.5;')
    expect(effects).not.toHaveStyle('text-decoration: line-through;')

    const undoButton = queryByTestId(`undoButton-${criticalInjury1.id}`)
    expect(undoButton).not.toBeInTheDocument()

    const healButton = queryByTestId(`healButton-${criticalInjury1.id}`)
    expect(healButton).not.toBeInTheDocument()
  })

  it('should render correctly when severity is > 4', () => {
    const criticalInjury = {
      ...criticalInjury1,
      severity: 1000,
    }
    const props = {
      criticalInjury,
    }
    const { getByTestId, queryByText } = renderComponent(props)

    const severity = getByTestId(
      `criticalInjury-${criticalInjury1.id}-severity`,
    )
    expect(severity).toBeInTheDocument()
    expect(severity).not.toHaveStyle('opacity: 0.5;')
    expect(severity).not.toHaveStyle('text-decoration: line-through;')

    const severityText = [...Array(criticalInjury1.severity)]
      .map(() => 'k')
      .join(' ')
    const severityTextElement = queryByText(severityText)
    expect(severityTextElement).not.toBeInTheDocument()
  })

  it('should render correctly when not editing in character sheet', () => {
    const criticalInjury = playerCharacter1CriticalInjuriesAugmented['1']
    const props = {
      criticalInjury,
      isCharacter: true,
    }
    const { getByTestId, getByText, queryByTestId } = renderComponent(props)

    const renderedCriticalInjury = getByTestId(
      `criticalInjury-${criticalInjury.id}`,
    )
    expect(renderedCriticalInjury).toBeInTheDocument()

    const diceValue = getByText(criticalInjury.dice_value)
    expect(diceValue).toBeInTheDocument()
    expect(diceValue).not.toHaveStyle('opacity: 0.5;')
    expect(diceValue).not.toHaveStyle('text-decoration: line-through;')

    const name = getByText(criticalInjury.name)
    expect(name).toBeInTheDocument()
    expect(name).not.toHaveStyle('opacity: 0.5;')
    expect(name).not.toHaveStyle('text-decoration: line-through;')

    const severity = getByTestId(`criticalInjury-${criticalInjury.id}-severity`)
    expect(severity).toBeInTheDocument()
    expect(severity).not.toHaveStyle('opacity: 0.5;')
    expect(severity).not.toHaveStyle('text-decoration: line-through;')

    const severityText = [...Array(criticalInjury.severity)]
      .map(() => 'k')
      .join(' ')
    const severityTextElement = getByText(severityText)
    expect(severityTextElement).toBeInTheDocument()

    const effects = getByText(criticalInjury.effects)
    expect(effects).toBeInTheDocument()
    expect(effects).toHaveStyle('opacity: 0.5;')
    expect(effects).not.toHaveStyle('text-decoration: line-through;')

    const undoButton = queryByTestId(`undoButton-${criticalInjury.id}`)
    expect(undoButton).not.toBeInTheDocument()

    const healButton = queryByTestId(`healButton-${criticalInjury.id}`)
    expect(healButton).not.toBeInTheDocument()
  })

  it('should render correct styles when persistent injury', () => {
    const criticalInjury = playerCharacter1CriticalInjuriesAugmented['2']
    const props = {
      criticalInjury,
      isCharacter: true,
    }
    const { getByText } = renderComponent(props)
    const effects = getByText(criticalInjury2.effects)
    expect(effects).toBeInTheDocument()
    expect(effects).not.toHaveStyle('opacity: 0.5;')
    expect(effects).not.toHaveStyle('text-decoration: line-through;')
  })

  it('should render correctly when editing and not healed', () => {
    const criticalInjury = playerCharacter1CriticalInjuriesAugmented['1']
    const props = {
      criticalInjury,
      editing: true,
      isCharacter: true,
    }
    const { getByTestId, getByText, queryByTestId } = renderComponent(props)

    const renderedCriticalInjury = getByTestId(
      `criticalInjury-${criticalInjury.id}`,
    )
    expect(renderedCriticalInjury).toBeInTheDocument()

    const diceValue = getByText(criticalInjury.dice_value)
    expect(diceValue).toBeInTheDocument()
    expect(diceValue).not.toHaveStyle('opacity: 0.5;')
    expect(diceValue).not.toHaveStyle('text-decoration: line-through;')

    const name = getByText(criticalInjury.name)
    expect(name).toBeInTheDocument()
    expect(name).not.toHaveStyle('opacity: 0.5;')
    expect(name).not.toHaveStyle('text-decoration: line-through;')

    const severity = getByTestId(`criticalInjury-${criticalInjury.id}-severity`)
    expect(severity).toBeInTheDocument()
    expect(severity).not.toHaveStyle('opacity: 0.5;')
    expect(severity).not.toHaveStyle('text-decoration: line-through;')

    const severityText = [...Array(criticalInjury.severity)]
      .map(() => 'k')
      .join(' ')
    const severityTextElement = getByText(severityText)
    expect(severityTextElement).toBeInTheDocument()

    const effects = getByText(criticalInjury.effects)
    expect(effects).toBeInTheDocument()
    expect(effects).toHaveStyle('opacity: 0.5;')
    expect(effects).not.toHaveStyle('text-decoration: line-through;')

    const undoButton = queryByTestId(`undoButton-${criticalInjury.id}`)
    expect(undoButton).not.toBeInTheDocument()

    const healButton = getByTestId(`healButton-${criticalInjury.id}`)
    expect(healButton).toBeInTheDocument()

    fireEvent.click(healButton)
    expect(mockSetFieldValue).toHaveBeenCalledWith(
      `deletedCriticalInjuries.${criticalInjury.id}`,
      true,
    )
  })

  it('should render correctly when editing and healed', () => {
    const criticalInjury = playerCharacter1CriticalInjuriesAugmented['1']
    const props = {
      criticalInjury,
      deleting: true,
      editing: true,
      isCharacter: true,
    }
    const { getByTestId, getByText, queryByTestId } = renderComponent(props)

    const renderedCriticalInjury = getByTestId(
      `criticalInjury-${criticalInjury.id}`,
    )
    expect(renderedCriticalInjury).toBeInTheDocument()

    const diceValue = getByText(criticalInjury.dice_value)
    expect(diceValue).toBeInTheDocument()
    expect(diceValue).toHaveStyle('opacity: 0.5;')
    expect(diceValue).toHaveStyle('text-decoration: line-through;')

    const name = getByText(criticalInjury.name)
    expect(name).toBeInTheDocument()
    expect(name).toHaveStyle('opacity: 0.5;')
    expect(name).toHaveStyle('text-decoration: line-through;')

    const severity = getByTestId(`criticalInjury-${criticalInjury.id}-severity`)
    expect(severity).toBeInTheDocument()
    expect(severity).toHaveStyle('opacity: 0.5;')
    expect(severity).toHaveStyle('text-decoration: line-through;')

    const severityText = [...Array(criticalInjury.severity)]
      .map(() => 'k')
      .join(' ')
    const severityTextElement = getByText(severityText)
    expect(severityTextElement).toBeInTheDocument()

    const effects = getByText(criticalInjury.effects)
    expect(effects).toBeInTheDocument()
    expect(effects).toHaveStyle('opacity: 0.5;')
    expect(effects).toHaveStyle('text-decoration: line-through;')

    const undoButton = getByTestId(`undoButton-${criticalInjury.id}`)
    expect(undoButton).toBeInTheDocument()

    const healButton = queryByTestId(`healButton-${criticalInjury.id}`)
    expect(healButton).not.toBeInTheDocument()

    fireEvent.click(undoButton)
    expect(mockSetFieldValue).toHaveBeenCalledWith(
      `deletedCriticalInjuries.${criticalInjury.id}`,
      false,
    )
  })
})
