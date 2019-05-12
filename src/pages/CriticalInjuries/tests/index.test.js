import { Suspense } from 'react'
import render from 'utils/customTestRenderers'

import CriticalInjuries from '../index'

import { store } from 'mocks'
import { criticalInjuries } from 'mocks/criticalInjuries'

import { GET_CRITICAL_INJURIES } from 'actions/criticalInjuries/constants'

jest.mock('redux-saga', () => () => {})

jest.mock('actions/authentication', () => ({
  getAuthInfo: jest.fn(() => ({ type: '' })),
}))
import { getAuthInfo } from 'actions/authentication'

jest.mock('actions/criticalInjuries', () => {
  return {
    getCriticalInjuries: jest.fn(() => ({ type: '' })),
    getCriticalInjuriesSuccess: jest.fn(),
    getCriticalInjuriesError: jest.fn(),
  }
})
import { getCriticalInjuries } from 'actions/criticalInjuries'

const renderComponent = (props = {}, initialState) =>
  render(
    <Suspense fallback="loading...">
      <CriticalInjuries {...props} />
    </Suspense>,
    { initialState },
  )

describe('<CriticalInjuries />', () => {
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

      const criticalInjuriesWrapper = getByTestId('criticalInjuries')
      expect(criticalInjuriesWrapper).toBeInTheDocument()

      const criticalInjuriesSection = getByTestId('criticalInjuries-section')
      expect(criticalInjuriesSection).toBeInTheDocument()

      criticalInjuries.forEach(({ id }) => {
        const weapon = getByTestId(`criticalInjury-${id}`)
        expect(weapon).toBeInTheDocument()
      })

      const spinner = queryByTestId('spinner')
      expect(spinner).not.toBeInTheDocument()
    })
  })

  it('should render the page correctly if gm', async () => {
    const modifiedState = store.setIn(['authentication', 'role'], 'gm')
    const { getByTestId, queryByTestId } = renderComponent(null, modifiedState)

    await wait(() => {
      const header = getByTestId('header')
      expect(header).toBeInTheDocument()

      const criticalInjuriesWrapper = getByTestId('criticalInjuries')
      expect(criticalInjuriesWrapper).toBeInTheDocument()

      const criticalInjuriesSection = getByTestId('criticalInjuries-section')
      expect(criticalInjuriesSection).toBeInTheDocument()

      criticalInjuries.forEach(({ id }) => {
        const weapon = getByTestId(`criticalInjury-${id}`)
        expect(weapon).toBeInTheDocument()
      })

      const spinner = queryByTestId('spinner')
      expect(spinner).not.toBeInTheDocument()
    })
  })

  it('should render correctly if loading critical injuries', async () => {
    getCriticalInjuries.mockImplementation(() => ({
      type: GET_CRITICAL_INJURIES,
      payload: {},
    }))

    const { getByTestId } = renderComponent()

    await wait(() => {
      const criticalInjuriesWrapper = getByTestId('criticalInjuries')
      expect(criticalInjuriesWrapper).toBeInTheDocument()

      const spinner = getByTestId('spinner')
      expect(spinner).toBeInTheDocument()
    })
  })

  it('should dispatch fetch actions on mount', () => {
    renderComponent()
    expect(getAuthInfo).toHaveBeenCalledTimes(1)
    expect(getCriticalInjuries).toHaveBeenCalledTimes(1)
  })
})
