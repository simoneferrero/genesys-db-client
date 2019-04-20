import Favors from '../index'

import { fromJS } from 'immutable'

import { factionsById } from 'mocks/factions'
import { favor1, favor2, newFavorResponse } from 'mocks/favors'

const mockHandleSubmit = jest.fn()
const mockSetFieldValue = jest.fn()
const favors = {
  [favor1.id]: favor1,
  [favor2.id]: favor2,
  [newFavorResponse.id]: newFavorResponse,
}
const defaultProps = {
  factions: fromJS(factionsById).toJS(),
  favors,
  handleSubmit: mockHandleSubmit,
  setFieldValue: mockSetFieldValue,
}

const renderComponent = (props = {}) =>
  render(<Favors {...defaultProps} {...props} />)

describe('<Favors />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render correctly', () => {
    const { getByTestId } = renderComponent()

    const favors = getByTestId(/favors/gi)
    expect(favors).toBeInTheDocument()

    const favorsSectionOwed = getByTestId(/favors-owed/gi)
    expect(favorsSectionOwed).toBeInTheDocument()

    const favorsSectionGiven = getByTestId(/favors-given/gi)
    expect(favorsSectionGiven).toBeInTheDocument()
  })

  it('should not break if favors are empty', () => {
    const props = {
      favors: {},
    }

    const { getByTestId } = renderComponent(props)

    const favors = getByTestId(/favors/gi)
    expect(favors).toBeInTheDocument()

    const favorsSectionOwed = getByTestId(/favors-owed/gi)
    expect(favorsSectionOwed).toBeInTheDocument()

    const favorsSectionGiven = getByTestId(/favors-given/gi)
    expect(favorsSectionGiven).toBeInTheDocument()
  })

  it('should render correctly when editing', () => {
    const props = {
      editing: true,
    }
    const { getByTestId } = renderComponent(props)

    Object.values(favors).forEach(({ id, status }) => {
      const favor = getByTestId(new RegExp(`favor-${id}`, 'gi'))
      expect(favor).toBeInTheDocument()

      const editFavorButton = getByTestId(
        status === 'complete' ? `revertButton-${id}` : `completeButton-${id}`,
      )
      expect(editFavorButton).toBeInTheDocument()

      fireEvent.click(editFavorButton)

      expect(mockSetFieldValue).toHaveBeenCalledWith(
        `favors.${id}.status`,
        status === 'complete' ? 'incomplete' : 'complete',
      )

      mockSetFieldValue.mockClear()
    })
  })

  it('should correctly submit new favor', async () => {
    const { getByTestId, getByPlaceholderText } = renderComponent()

    const editButton = getByTestId(/edit/i)
    fireEvent.click(editButton)

    const description = getByPlaceholderText(/add description.../i)
    fireEvent.change(description, {
      target: { value: 'This is a new description' },
    })

    const submitButton = getByTestId(/submit/i)
    fireEvent.click(submitButton)

    await wait(() => {
      expect(mockHandleSubmit).toHaveBeenCalledTimes(1)
    })
  })
})
