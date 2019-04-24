import { Suspense } from 'react'
import render from 'utils/customTestRenderers'

import PlayersCharacters from '../index'

import {
  playersCharactersAugmented,
  playersCharactersResponse,
} from 'mocks/playersCharacters'

import {
  GET_PLAYERS_CHARACTERS,
  GET_PLAYERS_CHARACTERS_SUCCESS,
} from 'actions/playersCharacters/constants'

jest.mock('redux-saga', () => () => {})

jest.mock('actions/authentication', () => ({
  getAuthInfo: jest.fn(() => ({ type: '' })),
}))
import { getAuthInfo } from 'actions/authentication'

jest.mock('actions/playersCharacters', () => {
  return {
    getPlayersCharacters: jest.fn(),
    getPlayersCharactersSuccess: jest.fn(),
    getPlayersCharactersError: jest.fn(),
  }
})
import { getPlayersCharacters } from 'actions/playersCharacters'

jest.mock('actions/archetypes', () => {
  const { GET_ARCHETYPES } = require('actions/archetypes/constants')
  return {
    getArchetypes: jest.fn(() => ({
      type: GET_ARCHETYPES,
      payload: {},
    })),
    getArchetypesSuccess: jest.fn(),
    getArchetypesError: jest.fn(),
  }
})
import { getArchetypes } from 'actions/archetypes'

jest.mock('actions/careers', () => {
  const { GET_CAREERS } = require('actions/careers/constants')
  return {
    getCareers: jest.fn(() => ({
      type: GET_CAREERS,
      payload: {},
    })),
    getCareersSuccess: jest.fn(),
    getCareersError: jest.fn(),
  }
})
import { getCareers } from 'actions/careers'

const renderComponent = (props = {}, initialState) =>
  render(
    <Suspense fallback="loading...">
      <PlayersCharacters {...props} />
    </Suspense>,
    { initialState },
  )

describe('<PlayersCharacters />', () => {
  beforeEach(() => {
    // Do not dispatch correct action so loader is false
    getPlayersCharacters.mockImplementation(() => ({
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
      const header = getByTestId(/header/i)
      expect(header).toBeInTheDocument()

      const playersCharactersWrapper = getByTestId(/players-characters/i)
      expect(playersCharactersWrapper).toBeInTheDocument()

      playersCharactersAugmented.toJS().forEach(({ id }) => {
        const pcSummary = getByTestId(`pc-summary-${id}`)
        expect(pcSummary).toBeInTheDocument()
      })

      const spinner = queryByTestId(/spinner/i)
      expect(spinner).not.toBeInTheDocument()
    })
  })

  it('should render correctly if loading', async () => {
    getPlayersCharacters.mockImplementation(() => ({
      type: GET_PLAYERS_CHARACTERS,
      payload: {},
    }))

    const { getByTestId } = renderComponent()

    await wait(() => {
      const playersCharactersWrapper = getByTestId(/players-characters/i)
      expect(playersCharactersWrapper).toBeInTheDocument()

      playersCharactersAugmented.toJS().forEach(({ id }) => {
        const pcSummary = getByTestId(`pc-summary-${id}`)
        expect(pcSummary).toBeInTheDocument()
      })

      const spinner = getByTestId(/spinner/i)
      expect(spinner).toBeInTheDocument()
    })
  })

  it('should render correctly if finished loading', async () => {
    // Skip redux-saga and dispatch success action directly
    getPlayersCharacters.mockImplementation(() => ({
      type: GET_PLAYERS_CHARACTERS_SUCCESS,
      payload: {
        playersCharacters: playersCharactersResponse,
      },
    }))
    const { getByTestId, queryByTestId } = renderComponent()

    await wait(() => {
      const playersCharactersWrapper = getByTestId(/players-characters/i)
      expect(playersCharactersWrapper).toBeInTheDocument()

      playersCharactersAugmented.toJS().forEach(({ id }) => {
        const pcSummary = getByTestId(`pc-summary-${id}`)
        expect(pcSummary).toBeInTheDocument()
      })

      const spinner = queryByTestId(/spinner/i)
      expect(spinner).not.toBeInTheDocument()
    })
  })

  it('should dispatch fetch actions on mount', () => {
    renderComponent()
    expect(getAuthInfo).toHaveBeenCalledTimes(1)
    expect(getArchetypes).toHaveBeenCalledTimes(1)
    expect(getCareers).toHaveBeenCalledTimes(1)
    expect(getPlayersCharacters).toHaveBeenCalledTimes(1)
  })
})
