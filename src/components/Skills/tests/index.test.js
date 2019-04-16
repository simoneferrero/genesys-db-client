import Skills from '../index'

import keyBy from 'lodash/keyBy'

import { playerCharacter1SkillsAugmented } from 'mocks/playersCharacters'

const skills = keyBy(playerCharacter1SkillsAugmented.toJS(), 'id')
const initialSkills = {
  ...skills,
  stealth: {
    ...skills.stealth,
    rank: 4,
  },
}
const mockOnChange = jest.fn()
const defaultProps = {
  initialSkills,
  onChange: mockOnChange,
  skills,
}

const renderComponent = (props = {}) =>
  render(<Skills {...defaultProps} {...props} />)

describe('<Skills />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render correctly when not editing', () => {
    const { getByTestId, getByText, queryByTestId } = renderComponent()

    const wrapper = getByTestId(/skills/i)
    expect(wrapper).toBeInTheDocument()

    const generalTitle = getByText(/general/i)
    expect(generalTitle).toBeInTheDocument()

    const combatTitle = getByText(/combat/i)
    expect(combatTitle).toBeInTheDocument()

    Object.keys(defaultProps.skills).forEach((id) => {
      const skillRow = getByTestId(`skill-${id}`)
      expect(skillRow).toBeInTheDocument()

      const decreaseButton = queryByTestId(`decrease-${id}-rank`)
      expect(decreaseButton).not.toBeInTheDocument()

      const increaseButton = queryByTestId(`increase-${id}-rank`)
      expect(increaseButton).not.toBeInTheDocument()
    })
  })

  it('should render correctly when editing', () => {
    const props = {
      editing: true,
    }

    const { getByTestId } = renderComponent(props)

    const wrapper = getByTestId(/skills/i)
    expect(wrapper).toBeInTheDocument()

    Object.keys(defaultProps.skills).forEach((id) => {
      const skillRow = getByTestId(`skill-${id}`)
      expect(skillRow).toBeInTheDocument()

      const decreaseButton = getByTestId(`decrease-${id}-rank`)
      expect(decreaseButton).toBeInTheDocument()

      fireEvent.click(decreaseButton)

      if (id === 'stealth') {
        expect(mockOnChange).toHaveBeenCalledTimes(1)
        expect(mockOnChange).toHaveBeenCalledWith(
          `skill.${id}.rank`,
          skills[id].rank - 1,
        )
      } else {
        expect(mockOnChange).not.toHaveBeenCalled()
      }

      const increaseButton = getByTestId(`increase-${id}-rank`)
      expect(increaseButton).toBeInTheDocument()

      fireEvent.click(increaseButton)

      expect(mockOnChange).toHaveBeenCalledTimes(1)
      if (id !== 'stealth') {
        expect(mockOnChange).toHaveBeenCalledWith(
          `skill.${id}.rank`,
          skills[id].rank + 1,
        )
      }

      jest.clearAllMocks()
    })
  })

  it('should not fire events if submitting', () => {
    const props = {
      editing: true,
      isSubmitting: true,
    }

    const { getByTestId } = renderComponent(props)

    const wrapper = getByTestId(/skills/i)
    expect(wrapper).toBeInTheDocument()

    Object.keys(defaultProps.skills).forEach((id) => {
      const skillRow = getByTestId(`skill-${id}`)
      expect(skillRow).toBeInTheDocument()

      const decreaseButton = getByTestId(`decrease-${id}-rank`)
      expect(decreaseButton).toBeInTheDocument()

      fireEvent.click(decreaseButton)

      const increaseButton = getByTestId(`increase-${id}-rank`)
      expect(increaseButton).toBeInTheDocument()

      fireEvent.click(increaseButton)

      expect(mockOnChange).not.toHaveBeenCalled()
    })
  })
})
