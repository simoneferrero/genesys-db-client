import BadgeModifiers from '../index'

const mockDecrease = jest.fn()
const mockIncrease = jest.fn()
const name = 'Test'
const defaultProps = {
  decrease: mockDecrease,
  increase: mockIncrease,
  name,
}

const renderComponent = (props = {}) =>
  render(<BadgeModifiers {...defaultProps} {...props} />)

describe('<BadgeModifiers />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render correctly', () => {
    const { getByTestId } = renderComponent()

    const wrapper = getByTestId(`badge-modifiers-${name}`)
    expect(wrapper).toBeInTheDocument()

    const decreaseButton = getByTestId(`decrease-${name}`)
    expect(decreaseButton).toBeInTheDocument()

    fireEvent.click(decreaseButton)
    expect(mockDecrease).toHaveBeenCalledTimes(1)

    const increaseButton = getByTestId(`increase-${name}`)
    expect(increaseButton).toBeInTheDocument()

    fireEvent.click(increaseButton)
    expect(mockIncrease).toHaveBeenCalledTimes(1)
  })

  it('should render correctly when disabled', () => {
    const props = {
      decreaseDisabled: true,
      increaseDisabled: true,
    }
    const { getByTestId } = renderComponent(props)

    const wrapper = getByTestId(`badge-modifiers-${name}`)
    expect(wrapper).toBeInTheDocument()

    const decreaseButton = getByTestId(`decrease-${name}`)
    expect(decreaseButton).toBeDisabled()

    fireEvent.click(decreaseButton)
    expect(mockDecrease).not.toHaveBeenCalled()

    const increaseButton = getByTestId(`increase-${name}`)
    expect(increaseButton).toBeDisabled()

    fireEvent.click(increaseButton)
    expect(mockIncrease).not.toHaveBeenCalled()
  })
})
