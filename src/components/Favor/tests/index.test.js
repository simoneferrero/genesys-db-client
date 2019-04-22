import Favor from '../index'

import { fromJS } from 'immutable'

import { factionsById } from 'mocks/factions'
import { favor1, favor2, newFavor } from 'mocks/favors'

import { Formik } from 'formik'

const mockHandleSubmit = jest.fn()
const mockSetFieldValue = jest.fn()
const defaultProps = {
  factions: fromJS(factionsById).toJS(),
  favor: favor1,
  setFieldValue: mockSetFieldValue,
}

const renderComponent = (props = {}) =>
  render(<Favor {...defaultProps} {...props} />)

const renderWithFormik = (formProps = {}) =>
  render(
    <Formik
      onSubmit={mockHandleSubmit}
      render={({ values, ...props }) => (
        <Favor
          factions={defaultProps.factions}
          favor={values}
          isNew
          {...props}
        />
      )}
      {...formProps}
    />,
  )

describe('<Favor />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render correctly when not adding or editing', () => {
    const {
      getByTestId,
      getByText,
      queryByDisplayValue,
      queryByPlaceholderText,
      queryByTestId,
    } = renderComponent()

    const existingFavor = getByTestId(`favor-${favor1.id}`)
    expect(existingFavor).toBeInTheDocument()

    const form = queryByTestId(/new-favor/i)
    expect(form).not.toBeInTheDocument()

    const size = getByTestId(`favor-${favor1.id}-size`)
    expect(size).toBeInTheDocument()
    const sizeValue = getByText(new RegExp(favor1.size, 'i'))
    expect(sizeValue).toBeInTheDocument()

    const sizeSelect = queryByDisplayValue(new RegExp(newFavor.size, 'i'))
    expect(sizeSelect).not.toBeInTheDocument()

    const faction = getByTestId(`favor-${favor1.id}-faction_id`)
    expect(faction).toBeInTheDocument()
    const factionValue = getByText(new RegExp(favor1.faction_id, 'i'))
    expect(factionValue).toBeInTheDocument()

    const factionSelect = queryByDisplayValue(
      new RegExp(newFavor.faction_id, 'i'),
    )
    expect(factionSelect).not.toBeInTheDocument()

    const description = getByTestId(`favor-${favor1.id}-description`)
    expect(description).toBeInTheDocument()
    const descriptionValue = getByText(favor1.description)
    expect(descriptionValue).toBeInTheDocument()

    const descriptionTextarea = queryByPlaceholderText(/add description.../i)
    expect(descriptionTextarea).not.toBeInTheDocument()

    const completeButton = queryByTestId(/completeButton/i)
    expect(completeButton).not.toBeInTheDocument()

    const revertButton = queryByTestId(/revertButton/i)
    expect(revertButton).not.toBeInTheDocument()
  })

  it('should not break if factions are empty', () => {
    const props = {
      factions: {},
    }
    const { getByTestId } = renderComponent(props)

    const existingFavor = getByTestId(`favor-${favor1.id}`)
    expect(existingFavor).toBeInTheDocument()
  })

  it('should render correctly when adding', () => {
    const faction_id = defaultProps.factions[newFavor.faction_id].id
    const props = {
      adding: true,
      initialValues: {
        description: '',
        faction_id,
        size: 'small',
        status: 'incomplete',
        type: 'owed',
      },
    }
    const {
      getByDisplayValue,
      getByPlaceholderText,
      getByTestId,
      queryByTestId,
    } = renderWithFormik(props)

    const existingFavor = queryByTestId(/favor-/i)
    expect(existingFavor).not.toBeInTheDocument()

    const form = getByTestId(/new-favor/i)
    expect(form).toBeInTheDocument()

    const sizeSelect = getByDisplayValue(/small/i)
    expect(sizeSelect).toBeInTheDocument()

    const factionSelect = getByDisplayValue(new RegExp(faction_id, 'i'))
    expect(factionSelect).toBeInTheDocument()

    const descriptionTextarea = getByPlaceholderText(/add description.../i)
    expect(descriptionTextarea).toBeInTheDocument()

    fireEvent.change(descriptionTextarea, {
      target: {
        value: newFavor.description,
      },
    })
    const populatedDescriptionTextarea = getByDisplayValue(newFavor.description)
    expect(populatedDescriptionTextarea).toBeInTheDocument()

    const completeButton = queryByTestId(/completeButton/i)
    expect(completeButton).not.toBeInTheDocument()

    const revertButton = queryByTestId(/revertButton/i)
    expect(revertButton).not.toBeInTheDocument()
  })

  it('should render correctly when editing incomplete', () => {
    const props = {
      editing: true,
    }
    const {
      getByTestId,
      getByText,
      queryByDisplayValue,
      queryByPlaceholderText,
      queryByTestId,
    } = renderComponent(props)

    const existingFavor = getByTestId(`favor-${favor1.id}`)
    expect(existingFavor).toBeInTheDocument()

    const form = queryByTestId(/new-favor/i)
    expect(form).not.toBeInTheDocument()

    const size = getByTestId(`favor-${favor1.id}-size`)
    expect(size).toBeInTheDocument()
    const sizeValue = getByText(new RegExp(favor1.size, 'i'))
    expect(sizeValue).toBeInTheDocument()

    const sizeSelect = queryByDisplayValue(new RegExp(newFavor.size, 'i'))
    expect(sizeSelect).not.toBeInTheDocument()

    const faction = getByTestId(`favor-${favor1.id}-faction_id`)
    expect(faction).toBeInTheDocument()
    const factionValue = getByText(new RegExp(favor1.faction_id, 'i'))
    expect(factionValue).toBeInTheDocument()

    const factionSelect = queryByDisplayValue(
      new RegExp(newFavor.faction_id, 'i'),
    )
    expect(factionSelect).not.toBeInTheDocument()

    const description = getByTestId(`favor-${favor1.id}-description`)
    expect(description).toBeInTheDocument()
    const descriptionValue = getByText(favor1.description)
    expect(descriptionValue).toBeInTheDocument()

    const descriptionTextarea = queryByPlaceholderText(/add description.../i)
    expect(descriptionTextarea).not.toBeInTheDocument()

    const completeButton = getByTestId(/completeButton/i)
    expect(completeButton).toBeInTheDocument()

    fireEvent.click(completeButton)
    expect(mockSetFieldValue).toHaveBeenCalledWith(
      `favors.${favor1.id}.status`,
      'complete',
    )

    const revertButton = queryByTestId(/revertButton/i)
    expect(revertButton).not.toBeInTheDocument()
  })

  it('should render correctly when editing completed', () => {
    const props = {
      editing: true,
      favor: favor2,
    }
    const { getByTestId, queryByTestId } = renderComponent(props)

    const existingFavor = getByTestId(`favor-${favor2.id}`)
    expect(existingFavor).toBeInTheDocument()

    const size = getByTestId(`favor-${favor2.id}-size`)
    expect(size).toHaveStyle('text-decoration: line-through')

    const faction = getByTestId(`favor-${favor2.id}-faction_id`)
    expect(faction).toHaveStyle('text-decoration: line-through')

    const description = getByTestId(`favor-${favor2.id}-description`)
    expect(description).toHaveStyle('text-decoration: line-through')

    const completeButton = queryByTestId(/completeButton/i)
    expect(completeButton).not.toBeInTheDocument()

    const revertButton = getByTestId(/revertButton/i)
    expect(revertButton).toBeInTheDocument()

    fireEvent.click(revertButton)
    expect(mockSetFieldValue).toHaveBeenCalledWith(
      `favors.${favor2.id}.status`,
      'incomplete',
    )
  })
})
