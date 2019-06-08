import { Suspense } from 'react'
import render from 'utils/customTestRenderers'

import Talents from '../index'

import { store } from 'mocks'
import { newTalentResponse, talents } from 'mocks/talents'

import { GET_TALENTS } from 'actions/talents/constants'

jest.mock('redux-saga', () => () => {})

jest.mock('actions/authentication', () => ({
  getAuthInfo: jest.fn(() => ({ type: '' })),
}))
import { getAuthInfo } from 'actions/authentication'

jest.mock('actions/talents', () => {
  return {
    getTalents: jest.fn(() => ({ type: '' })),
    getTalentsSuccess: jest.fn(),
    getTalentsError: jest.fn(),
    addTalent: jest.fn(() => ({ type: '' })),
    addTalentSuccess: jest.fn(),
    addTalentError: jest.fn(),
  }
})
import { getTalents, addTalent } from 'actions/talents'

const tiers = [...Array(5).keys()].map((tier) => tier + 1)

const renderComponent = (props = {}, initialState) =>
  render(
    <Suspense fallback="loading...">
      <Talents {...props} />
    </Suspense>,
    { initialState },
  )

describe('<Talents />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render the page correctly', async () => {
    const { getByTestId, queryByTestId } = renderComponent()

    await wait(() => {
      const header = getByTestId('header')
      expect(header).toBeInTheDocument()

      const talentsWrapper = getByTestId('talents')
      expect(talentsWrapper).toBeInTheDocument()

      const talentsSection = getByTestId('talents-section')
      expect(talentsSection).toBeInTheDocument()

      tiers.forEach((tier) => {
        const talentsTier = getByTestId(`talents-tier-${tier}`)
        expect(talentsTier).toBeInTheDocument()
      })

      talents.forEach(({ id }) => {
        const talent = getByTestId(`talent-${id}`)
        expect(talent).toBeInTheDocument()
      })

      const spinner = queryByTestId('spinner')
      expect(spinner).not.toBeInTheDocument()
    })
  })

  it('should render the page correctly if gm', async () => {
    const modifiedState = store.setIn(['authentication', 'role'], 'gm')
    const {
      getByTestId,
      getByPlaceholderText,
      getByDisplayValue,
    } = renderComponent(null, modifiedState)

    await wait(async () => {
      const talentsWrapper = getByTestId('talents')
      expect(talentsWrapper).toBeInTheDocument()

      const editButton = getByTestId('edit-tier-1-talents')
      expect(editButton).toBeInTheDocument()

      fireEvent.click(editButton)

      const newTalent = getByTestId('new-talent')
      expect(newTalent).toBeInTheDocument()

      const name = getByPlaceholderText(/talent's name/i)
      expect(name).toBeInTheDocument()
      fireEvent.change(name, {
        target: {
          value: newTalentResponse.name,
        },
      })
      const populatedName = getByDisplayValue(`${newTalentResponse.name}`)
      expect(populatedName).toBeInTheDocument()

      const description = getByPlaceholderText(/add description/i)
      expect(description).toBeInTheDocument()
      fireEvent.change(description, {
        target: {
          value: newTalentResponse.description,
        },
      })
      const populatedDescription = getByDisplayValue(
        `${newTalentResponse.description}`,
      )
      expect(populatedDescription).toBeInTheDocument()

      const submitButton = getByTestId('submit-tier-1-talents')
      fireEvent.click(submitButton)

      await wait(() => {
        expect(addTalent).toHaveBeenCalledTimes(1)
      })
    })
  })

  it('should render correctly if loading talents', async () => {
    getTalents.mockImplementation(() => ({
      type: GET_TALENTS,
      payload: {},
    }))

    const { getByTestId } = renderComponent()

    await wait(() => {
      const talentsWrapper = getByTestId('talents')
      expect(talentsWrapper).toBeInTheDocument()

      const spinner = getByTestId('spinner')
      expect(spinner).toBeInTheDocument()
    })
  })

  it('should dispatch fetch actions on mount', () => {
    renderComponent()
    expect(getAuthInfo).toHaveBeenCalledTimes(1)
    expect(getTalents).toHaveBeenCalledTimes(1)
  })
})
