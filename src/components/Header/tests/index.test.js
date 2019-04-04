import Header from '../index'

const children = 'Header title'
const defaultProps = {
  children,
}
const renderComponent = (props = {}) =>
  render(<Header {...defaultProps} {...props} />)

describe('<Header />', () => {
  it('should render correctly', () => {
    const { getByTestId, getByText } = renderComponent()

    const header = getByTestId(/header/i)
    expect(header).toBeInTheDocument()

    const renderedChildren = getByText(children)
    expect(renderedChildren).toBeInTheDocument()
  })
})
