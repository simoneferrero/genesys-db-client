import StatusCard from '../index'

import { goodServiceStatus, severeDelaysStatus } from 'mocks/statuses'

import { colours } from 'styles/constants'

const {
  lineStatuses: [{ statusSeverity, statusSeverityDescription }],
  name,
} = goodServiceStatus

const defaultProps = {
  name,
  statusSeverity,
  statusSeverityDescription,
}

const renderComponent = (props = {}) =>
  render(<StatusCard {...defaultProps} {...props} />)

describe('<StatusCard />', () => {
  it('should render the line name', () => {
    const { getByText } = renderComponent()
    const result = getByText(name)
    expect(result).toBeInTheDocument()
  })

  it('should render the line status', () => {
    const { getByText } = renderComponent()
    const result = getByText(statusSeverityDescription)
    expect(result).toBeInTheDocument()
  })

  it('should render a green background if good status', () => {
    const { container } = renderComponent()
    expect(container.firstChild).toHaveStyle(
      `background-color: ${colours.green}`,
    )
    expect(container.firstChild).not.toHaveStyle(
      `background-color: ${colours.red}`,
    )
  })

  it('should render a red background if severe delays', () => {
    const { container } = renderComponent({
      statusSeverity: severeDelaysStatus.lineStatuses[0].statusSeverity,
    })
    expect(container.firstChild).toHaveStyle(`background-color: ${colours.red}`)
    expect(container.firstChild).not.toHaveStyle(
      `background-color: ${colours.green}`,
    )
  })
})
