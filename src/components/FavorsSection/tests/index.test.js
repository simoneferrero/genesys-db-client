import FavorsSection from '../index'

import { fromJS } from 'immutable'

import { factionsById } from 'mocks/factions'
import { favor1, newFavorResponse } from 'mocks/favors'

const mockHandleSubmit = jest.fn()
const mockOnFavorChange = jest.fn()
const type = 'owed'
const favors = [favor1, { ...newFavorResponse, status: 'complete' }]
const defaultProps = {
  factions: fromJS(factionsById).toJS(),
  favors,
  handleSubmit: mockHandleSubmit,
  onFavorChange: mockOnFavorChange,
  type,
}

const renderComponent = (props = {}) =>
  render(<FavorsSection {...defaultProps} {...props} />)

describe('<FavorsSection />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render correctly', () => {
    const { getByTestId, getByText, queryByTestId } = renderComponent()

    const favorsSection = getByTestId(`favors-${type}`)
    expect(favorsSection).toBeInTheDocument()

    const typeTitle = getByText(new RegExp(type, 'gi'))
    expect(typeTitle).toBeInTheDocument()

    const editButton = getByTestId(/edit/i)
    expect(editButton).toBeInTheDocument()

    const nonExistingNewFavor = queryByTestId(/new-favor/i)
    expect(nonExistingNewFavor).not.toBeInTheDocument()

    favors.forEach(({ id, status }) => {
      const favor = getByTestId(new RegExp(`favor-${id}`, 'gi'))
      expect(favor).toBeInTheDocument()

      const editFavorButton = queryByTestId(
        status === 'complete' ? 'revertButton' : 'completeButton',
      )
      expect(editFavorButton).not.toBeInTheDocument()
    })

    fireEvent.click(editButton)

    const cancelButton = getByTestId(/cancel/i)
    expect(cancelButton).toBeInTheDocument()

    const submitButton = getByTestId(/submit/i)
    expect(submitButton).toBeInTheDocument()

    const newFavor = getByTestId(/new-favor/i)
    expect(newFavor).toBeInTheDocument()

    fireEvent.click(cancelButton)

    const unmountedNewFavor = queryByTestId(/new-favor/i)
    expect(unmountedNewFavor).not.toBeInTheDocument()

    expect(editButton).toBeInTheDocument()
  })

  it('should not break if factions is empty', () => {
    const props = {
      factions: {},
    }
    const { getByTestId } = renderComponent(props)

    const editButton = getByTestId(/edit/i)
    fireEvent.click(editButton)

    const favorsSection = getByTestId(`favors-${type}`)
    expect(favorsSection).toBeInTheDocument()
  })

  it('should render correctly when editing', () => {
    const props = {
      editing: true,
    }
    const { getByTestId } = renderComponent(props)

    favors.forEach(({ id, status }) => {
      const favor = getByTestId(new RegExp(`favor-${id}`, 'gi'))
      expect(favor).toBeInTheDocument()

      const editFavorButton = getByTestId(
        status === 'complete' ? 'revertButton' : 'completeButton',
      )
      expect(editFavorButton).toBeInTheDocument()

      fireEvent.click(editFavorButton)

      expect(mockOnFavorChange).toHaveBeenCalledWith(
        `favors.${id}.status`,
        status === 'complete' ? 'incomplete' : 'complete',
      )
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
