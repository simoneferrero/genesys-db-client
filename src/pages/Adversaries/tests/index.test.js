import { Suspense } from 'react'
import render from 'utils/customTestRenderers'

import Adversaries from '../index'

import { adversariesAugmented, adversariesResponse } from 'mocks/adversaries'

import {
  GET_ADVERSARIES,
  GET_ADVERSARIES_SUCCESS,
} from 'actions/adversaries/constants'

jest.mock('redux-saga', () => () => {})

jest.mock('actions/authentication', () => ({
  getAuthInfo: jest.fn(() => ({ type: '' })),
}))
import { getAuthInfo } from 'actions/authentication'

jest.mock('actions/adversaries', () => {
  return {
    getAdversaries: jest.fn(),
    getAdversariesSuccess: jest.fn(),
    getAdversariesError: jest.fn(),
  }
})
import { getAdversaries } from 'actions/adversaries'

const renderComponent = (props = {}, initialState) =>
  render(
    <Suspense fallback="loading...">
      <Adversaries {...props} />
    </Suspense>,
    { initialState },
  )

describe('<Adversaries />', () => {
  beforeEach(() => {
    // Do not dispatch correct action so loader is false
    getAdversaries.mockImplementation(() => ({
      type: '',
      payload: {},
    }))
  })
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

      const adversariesWrapper = getByTestId('adversaries')
      expect(adversariesWrapper).toBeInTheDocument()

      adversariesAugmented.toJS().forEach(({ id }) => {
        const pcSummary = getByTestId(`adversary-${id}`)
        expect(pcSummary).toBeInTheDocument()
      })

      const spinner = queryByTestId('spinner')
      expect(spinner).not.toBeInTheDocument()
    })
  })

  it('should render correctly if loading', async () => {
    getAdversaries.mockImplementation(() => ({
      type: GET_ADVERSARIES,
      payload: {},
    }))

    const { getByTestId } = renderComponent()

    await wait(() => {
      const adversariesWrapper = getByTestId('adversaries')
      expect(adversariesWrapper).toBeInTheDocument()

      adversariesAugmented.toJS().forEach(({ id }) => {
        const pcSummary = getByTestId(`adversary-${id}`)
        expect(pcSummary).toBeInTheDocument()
      })

      const spinner = getByTestId('spinner')
      expect(spinner).toBeInTheDocument()
    })
  })

  it('should render correctly if finished loading', async () => {
    // Skip redux-saga and dispatch success action directly
    getAdversaries.mockImplementation(() => ({
      type: GET_ADVERSARIES_SUCCESS,
      payload: {
        adversaries: adversariesResponse,
      },
    }))
    const { getByTestId, queryByTestId } = renderComponent()

    await wait(() => {
      const adversariesWrapper = getByTestId('adversaries')
      expect(adversariesWrapper).toBeInTheDocument()

      adversariesAugmented.toJS().forEach(({ id }) => {
        const pcSummary = getByTestId(`adversary-${id}`)
        expect(pcSummary).toBeInTheDocument()
      })

      const spinner = queryByTestId('spinner')
      expect(spinner).not.toBeInTheDocument()
    })
  })

  it('should dispatch fetch actions on mount', () => {
    renderComponent()
    expect(getAuthInfo).toHaveBeenCalledTimes(1)
    expect(getAdversaries).toHaveBeenCalledTimes(1)
  })
})
