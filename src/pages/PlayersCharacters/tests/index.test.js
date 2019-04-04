import render from 'utils/customTestRenderers'

import PlayersCharacters from '../index'

import { playersCharactersAllIds } from 'mocks/playersCharacters'

import {
  GET_PLAYERS_CHARACTERS,
  GET_PLAYERS_CHARACTERS_SUCCESS,
} from 'actions/playersCharacters/constants'

import { emptyStore } from 'mocks'

jest.mock('actions/playersCharacters', () => {
  return {
    getPlayersCharacters: jest.fn(),
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
  }
})
import { getCareers } from 'actions/careers'

const renderComponent = (props = {}, initialState) =>
  render(<PlayersCharacters {...props} />, { initialState })

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

  it('should render the page correctly', () => {
    const { getByTestId, queryByTestId } = renderComponent()

    const header = getByTestId(/header/i)
    expect(header).toBeInTheDocument()

    const playersCharacters = getByTestId(/players-characters/i)
    expect(playersCharacters).toBeInTheDocument()

    playersCharactersAllIds.forEach((id) => {
      const pcSummary = getByTestId(`pc-summary-${id}`)
      expect(pcSummary).toBeInTheDocument()
    })

    const spinner = queryByTestId(/spinner/i)
    expect(spinner).not.toBeInTheDocument()
  })

  describe('spinner', () => {
    beforeEach(() => {
      getPlayersCharacters.mockImplementation(() => ({
        type: GET_PLAYERS_CHARACTERS,
        payload: {},
      }))
    })

    it('should render a spinner if loading with data', () => {
      const { getByTestId } = renderComponent()

      const spinner = getByTestId(/spinner/i)
      expect(spinner).toBeInTheDocument()
    })

    it('should render a spinner if loading with no data', () => {
      const { getByTestId } = renderComponent({}, emptyStore)

      const spinner = getByTestId(/spinner/i)
      expect(spinner).toBeInTheDocument()
    })
  })

  it('should not render a spinner if finished loading', () => {
    // Skip redux-saga and dispatch success action directly
    getPlayersCharacters.mockImplementation(() => ({
      type: GET_PLAYERS_CHARACTERS_SUCCESS,
      payload: {
        playersCharacters: [],
      },
    }))
    const { queryByTestId } = renderComponent()

    const spinner = queryByTestId(/spinner/i)
    expect(spinner).not.toBeInTheDocument()
  })

  it('should dispatch fetch actions on mount', () => {
    renderComponent()
    expect(getArchetypes).toHaveBeenCalledTimes(1)
    expect(getCareers).toHaveBeenCalledTimes(1)
    expect(getPlayersCharacters).toHaveBeenCalledTimes(1)
  })
})
