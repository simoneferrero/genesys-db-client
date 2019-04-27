import Motivations from '../index'

import { playerCharacter1Response } from 'mocks/playersCharacters'

const { motivations } = playerCharacter1Response
const mockHandleSubmit = jest.fn()
const mockSetFieldValue = jest.fn()
const defaultProps = {
  motivations,
  handleSubmit: mockHandleSubmit,
  setFieldValue: mockSetFieldValue,
}

const renderComponent = (props = {}) =>
  render(<Motivations {...defaultProps} {...props} />)

describe('<Motivations />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render correctly', () => {
    const { getByTestId } = renderComponent()

    const motivationsWrapper = getByTestId(/motivations/gi)
    expect(motivationsWrapper).toBeInTheDocument()

    Object.keys(motivations).forEach((motivation) => {
      const renderedMotivation = getByTestId(`motivation-${motivation}`)
      expect(renderedMotivation).toBeInTheDocument()
    })
  })

  it('should render correctly when editing', () => {
    const props = {
      editing: true,
    }
    const { getByDisplayValue, getByTestId } = renderComponent(props)
    Object.entries(motivations).forEach(([key, { type, description }]) => {
      const renderedMotivation = getByTestId(`motivation-${key}`)
      expect(renderedMotivation).toBeInTheDocument()

      const motivationType = getByDisplayValue(type)

      const newType = `${type}-changed`
      fireEvent.change(motivationType, { target: { value: newType } })

      expect(mockSetFieldValue).toHaveBeenCalledWith(
        `motivations.${key}.type`,
        newType,
      )

      mockSetFieldValue.mockClear()

      const motivationDescription = getByDisplayValue(description)

      const newDescription = `${description}-changed`
      fireEvent.change(motivationDescription, {
        target: { value: newDescription },
      })

      expect(mockSetFieldValue).toHaveBeenCalledWith(
        `motivations.${key}.description`,
        newDescription,
      )

      mockSetFieldValue.mockClear()
    })
  })
})
