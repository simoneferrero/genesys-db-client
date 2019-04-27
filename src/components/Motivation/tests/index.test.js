import Motivation from '../index'

import { playerCharacter1Response } from 'mocks/playersCharacters'

const title = 'strength'
const motivation = playerCharacter1Response.motivations[title]
const mockSetFieldValue = jest.fn()
const defaultProps = {
  motivation,
  setFieldValue: mockSetFieldValue,
  title,
}

const renderComponent = (props = {}) =>
  render(<Motivation {...defaultProps} {...props} />)

describe('<Motivation />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render correctly', () => {
    const { getByTestId, getByText, queryByDisplayValue } = renderComponent()

    const motivationElement = getByTestId(`motivation-${title}`)
    expect(motivationElement).toBeInTheDocument()

    const titleText = getByText(title)
    expect(titleText).toBeInTheDocument()

    const type = getByText(motivation.type)
    expect(type).toBeInTheDocument()

    const typeInput = queryByDisplayValue(new RegExp(motivation.type, 'i'))
    expect(typeInput).not.toBeInTheDocument()

    const description = getByText(motivation.description)
    expect(description).toBeInTheDocument()

    const descriptionInput = queryByDisplayValue(
      new RegExp(motivation.description, 'i'),
    )
    expect(descriptionInput).not.toBeInTheDocument()
  })

  it('should render correctly when editing', () => {
    const props = {
      editing: true,
    }
    const {
      getByTestId,
      getByText,
      getByDisplayValue,
      queryByTestId,
      queryByText,
    } = renderComponent(props)

    const motivationElement = getByTestId(`motivation-${title}`)
    expect(motivationElement).toBeInTheDocument()

    const titleText = getByText(title)
    expect(titleText).toBeInTheDocument()

    const type = queryByText(motivation.type)
    expect(type).not.toBeInTheDocument()

    const typeInput = getByDisplayValue(new RegExp(motivation.type, 'i'))
    expect(typeInput).toBeInTheDocument()

    const newType = 'New type'
    fireEvent.change(typeInput, { target: { value: newType } })

    expect(mockSetFieldValue).toHaveBeenCalledWith(
      `motivations.${title}.type`,
      newType,
    )

    mockSetFieldValue.mockClear()

    const description = queryByTestId(`${title}-description`)
    expect(description).not.toBeInTheDocument()

    const descriptionInput = getByDisplayValue(
      new RegExp(motivation.description, 'i'),
    )
    expect(descriptionInput).toBeInTheDocument()

    const newDescription = 'New description'
    fireEvent.change(descriptionInput, { target: { value: newDescription } })
    expect(mockSetFieldValue).toHaveBeenCalledWith(
      `motivations.${title}.description`,
      newDescription,
    )
  })

  it('should disable fields when submitting', () => {
    const props = {
      editing: true,
      isSubmitting: true,
    }
    const { getByTestId, getByDisplayValue } = renderComponent(props)

    const motivationElement = getByTestId(`motivation-${title}`)
    expect(motivationElement).toBeInTheDocument()

    const typeInput = getByDisplayValue(new RegExp(motivation.type, 'i'))
    expect(typeInput).toBeInTheDocument()
    expect(typeInput).toBeDisabled()

    const descriptionInput = getByDisplayValue(
      new RegExp(motivation.description, 'i'),
    )
    expect(descriptionInput).toBeInTheDocument()
    expect(descriptionInput).toBeDisabled()
  })
})
