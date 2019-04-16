import SkillRow from '../index'

import { colours } from 'styles/constants'
import rgbToRgba from 'utils/rgbToRgba'

import { playerCharacter1SkillsAugmented } from 'mocks/playersCharacters'

const mockOnChange = jest.fn()
const defaultProps = {
  onChange: mockOnChange,
  skill: playerCharacter1SkillsAugmented.toJS()[1],
}

const renderComponent = (props = {}) =>
  render(<SkillRow {...defaultProps} {...props} />)

describe('<SkillRow />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  const { id } = defaultProps.skill

  it('should render correctly when not editing with no career', () => {
    const { characteristic, name } = defaultProps.skill
    const {
      getByLabelText,
      getByTestId,
      getByText,
      queryByTestId,
    } = renderComponent()

    const wrapper = getByTestId(`skill-${id}`)
    expect(wrapper).toBeInTheDocument()

    const skillName = getByText(
      `${name} (${characteristic.substring(0, 2).toUpperCase()})`,
    )
    expect(skillName).toBeInTheDocument()

    const careerLabel = getByTestId(`skill-career-${id}`)
    expect(careerLabel).toBeInTheDocument()
    expect(careerLabel).toHaveStyle(`
      color: ${rgbToRgba(colours.veryDarkGrey, 0.4)};
      border-color: ${rgbToRgba(colours.veryDarkGrey, 0.4)};
    `)

    const career = getByLabelText(/career/i)
    expect(career).toBeInTheDocument()
    expect(career).toBeDisabled()

    const rank = getByTestId(`skill-rank-${id}`)
    expect(rank).toBeInTheDocument()

    const decreaseButton = queryByTestId(`decrease-${id}-rank`)
    expect(decreaseButton).not.toBeInTheDocument()

    const increaseButton = queryByTestId(`increase-${id}-rank`)
    expect(increaseButton).not.toBeInTheDocument()

    const testCases = [...Array(5).keys()].map((key) => key + 1)
    testCases.forEach((testCase) => {
      const rank = getByTestId(`${id}-${testCase}`)
      expect(rank).toBeInTheDocument()

      if (testCase <= defaultProps.skill.rank) {
        expect(rank).toHaveStyle(`background-color: ${colours.teal}`)
      } else {
        expect(rank).toHaveStyle(`background-color: ${colours.veryLightBlue}`)
      }
    })
  })

  it('should render correctly when not editing with career', () => {
    const props = {
      ...defaultProps,
      skill: {
        ...defaultProps.skill,
        career: true,
      },
    }
    const { getByLabelText, getByTestId } = renderComponent(props)

    const wrapper = getByTestId(`skill-${id}`)
    expect(wrapper).toBeInTheDocument()

    const careerLabel = getByTestId(`skill-career-${id}`)
    expect(careerLabel).toBeInTheDocument()
    expect(careerLabel).toHaveStyle(`
      color: ${colours.veryLightBlue};
      background-color: ${colours.teal};
    `)
    const career = getByLabelText(/career/i)
    expect(career).toBeInTheDocument()
    expect(career).toBeDisabled()
  })

  it('should render correctly when editing', () => {
    const { rank } = defaultProps.skill
    const props = {
      editing: true,
    }
    const { getByTestId } = renderComponent(props)

    const wrapper = getByTestId(`skill-${id}`)
    expect(wrapper).toBeInTheDocument()

    const decreaseButton = getByTestId(`decrease-${id}-rank`)
    expect(decreaseButton).toBeInTheDocument()

    const increaseButton = getByTestId(`increase-${id}-rank`)
    expect(increaseButton).toBeInTheDocument()

    fireEvent.click(decreaseButton)
    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(mockOnChange).toHaveBeenCalledWith(`skill.${id}.rank`, rank - 1)

    fireEvent.click(increaseButton)
    expect(mockOnChange).toHaveBeenCalledTimes(2)
    expect(mockOnChange).toHaveBeenCalledWith(`skill.${id}.rank`, rank + 1)
  })

  it('should not fire events if buttons are disabled', () => {
    const props = {
      editing: true,
      decreaseDisabled: true,
      increaseDisabled: true,
    }
    const { getByTestId } = renderComponent(props)

    const wrapper = getByTestId(`skill-${id}`)
    expect(wrapper).toBeInTheDocument()

    const decreaseButton = getByTestId(`decrease-${id}-rank`)
    expect(decreaseButton).toBeInTheDocument()
    expect(decreaseButton).toBeDisabled()

    const increaseButton = getByTestId(`increase-${id}-rank`)
    expect(increaseButton).toBeInTheDocument()
    expect(increaseButton).toBeDisabled()

    fireEvent.click(decreaseButton)
    fireEvent.click(increaseButton)

    expect(mockOnChange).not.toHaveBeenCalled()
  })
})
