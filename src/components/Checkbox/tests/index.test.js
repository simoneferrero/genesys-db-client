import Checkbox from '../index'

import { colours } from 'styles/constants'

const id = 'test'
const label = 'text'
const mockOnChange = jest.fn()
const name = 'test.test'
const defaultProps = {
  checked: true,
  id,
  label,
  name,
  onChange: mockOnChange,
}

const renderComponent = (props = {}) =>
  render(<Checkbox {...defaultProps} {...props} />)

describe('<Checkbox />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render correctly', () => {
    const { getByTestId, getByText } = renderComponent()

    const wrapper = getByTestId(id)
    expect(wrapper).toBeInTheDocument()
    expect(wrapper).toHaveStyle(`color: ${colours.veryLightBlue}`)
    expect(wrapper).toHaveStyle(`cursor: pointer`)

    const labelText = getByText(label)
    expect(labelText).toBeInTheDocument()
    expect(labelText).not.toBeDisabled()

    fireEvent.click(wrapper)

    expect(mockOnChange).toHaveBeenCalledWith(name, false)
  })

  it('should render correctly when unchecked', () => {
    const props = {
      checked: false,
    }
    const { getByTestId } = renderComponent(props)

    const wrapper = getByTestId(id)
    expect(wrapper).toBeInTheDocument()
    expect(wrapper).not.toHaveStyle(`color: ${colours.veryLightBlue}`)
  })

  it('should render correctly when disabled', () => {
    const props = {
      disabled: true,
    }
    const { getByTestId, getByText, getByLabelText } = renderComponent(props)

    const wrapper = getByTestId(id)
    expect(wrapper).toBeInTheDocument()
    expect(wrapper).toHaveStyle('cursor: default')

    const input = getByLabelText(label)
    expect(input).toBeDisabled()

    const labelText = getByText(label)
    expect(labelText).toBeInTheDocument()

    fireEvent.click(wrapper)

    expect(mockOnChange).not.toHaveBeenCalled()
  })

  it('should not break if onChange is undefined', () => {
    const props = {
      onChange: undefined,
    }
    const { getByTestId } = renderComponent(props)

    const wrapper = getByTestId(id)
    expect(wrapper).toBeInTheDocument()

    fireEvent.click(wrapper)

    expect(wrapper).toBeInTheDocument()
  })
})
