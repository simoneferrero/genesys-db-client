import SkillRank from '../index'

import { colours } from 'styles/constants'

const mockOnChange = jest.fn()
const id = 'test'
const defaultProps = {
  id,
  onChange: mockOnChange,
  rank: 3,
}

const renderComponent = (props = {}) =>
  render(<SkillRank {...defaultProps} {...props} />)

describe('<SkillRank />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render correctly when not editing', () => {
    const { getByTestId, queryByTestId } = renderComponent()

    const wrapper = getByTestId(`skill-rank-${id}`)
    expect(wrapper).toBeInTheDocument()

    const decreaseButton = queryByTestId(`decrease-${id}-rank`)
    expect(decreaseButton).not.toBeInTheDocument()

    const increaseButton = queryByTestId(`increase-${id}-rank`)
    expect(increaseButton).not.toBeInTheDocument()

    const testCases = [...Array(5).keys()].map((key) => key + 1)
    testCases.forEach((testCase) => {
      const rank = getByTestId(`${id}-${testCase}`)
      expect(rank).toBeInTheDocument()

      if (testCase <= defaultProps.rank) {
        expect(rank).toHaveStyle(`background-color: ${colours.teal}`)
      } else {
        expect(rank).toHaveStyle(`background-color: ${colours.veryLightBlue}`)
      }
    })
  })

  it('should render correctly when editing', () => {
    const props = {
      editing: true,
    }
    const { getByTestId } = renderComponent(props)

    const wrapper = getByTestId(`skill-rank-${id}`)
    expect(wrapper).toBeInTheDocument()

    const decreaseButton = getByTestId(`decrease-${id}-rank`)
    expect(decreaseButton).toBeInTheDocument()

    const increaseButton = getByTestId(`increase-${id}-rank`)
    expect(increaseButton).toBeInTheDocument()

    fireEvent.click(decreaseButton)
    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(mockOnChange).toHaveBeenCalledWith(defaultProps.rank - 1)

    fireEvent.click(increaseButton)
    expect(mockOnChange).toHaveBeenCalledTimes(2)
    expect(mockOnChange).toHaveBeenCalledWith(defaultProps.rank + 1)
  })

  it('should not fire events if buttons are disabled', () => {
    const props = {
      editing: true,
      decreaseDisabled: true,
      increaseDisabled: true,
    }
    const { getByTestId } = renderComponent(props)

    const wrapper = getByTestId(`skill-rank-${id}`)
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
