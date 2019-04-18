import Select from '../index'

const mockOnChange = jest.fn()
const options = [
  {
    label: 'Option one',
    value: 'optionOne',
  },
  {
    label: 'Option two',
    value: 'optionTwo',
  },
  {
    label: 'Option three',
    value: 'optionThree',
  },
]
const name = 'test'
const defaultProps = {
  config: {
    // simplifies testing
    menuIsOpen: true,
  },
  name,
  onChange: mockOnChange,
  options,
  value: options[0],
}

const renderComponent = (props = {}) =>
  render(
    <>
      <Select {...defaultProps} {...props} />
      <button>Submit</button>
    </>,
  )

describe('<Select />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render correctly', () => {
    const { getAllByText, getByText } = renderComponent()

    const select = document.getElementById(name)
    expect(select).toBeInTheDocument()

    const [currentValue, firstValue] = getAllByText(defaultProps.value.label)
    expect(currentValue).toBeInTheDocument()
    expect(firstValue).toBeInTheDocument()

    const secondValue = getByText(options[1].label)
    expect(secondValue).toBeInTheDocument()

    const thirdValue = getByText(options[2].label)
    expect(thirdValue).toBeInTheDocument()

    fireEvent.click(secondValue)

    expect(mockOnChange).toHaveBeenCalledWith(name, options[1].value)
  })
})
