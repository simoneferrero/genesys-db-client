import SkillRow from '../index'

import { colours } from 'styles/constants'
import rgbToRgba from 'utils/rgbToRgba'

import { playerCharacter1Skills } from 'mocks/playersCharacters'
import { skill1 } from 'mocks/skills'

const mockDecrease = jest.fn()
const mockIncrease = jest.fn()
const defaultProps = {
  decrease: mockDecrease,
  increase: mockIncrease,
  skill: { ...playerCharacter1Skills[0], ...skill1 },
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

  const { id } = skill1

  it('should render correctly when not editing with no career', () => {
    const { characteristic, name } = skill1
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
    expect(mockDecrease).toHaveBeenCalled()

    fireEvent.click(increaseButton)
    expect(mockIncrease).toHaveBeenCalled()
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
    expect(mockDecrease).not.toHaveBeenCalled()

    fireEvent.click(increaseButton)
    expect(mockIncrease).not.toHaveBeenCalled()
  })
})
