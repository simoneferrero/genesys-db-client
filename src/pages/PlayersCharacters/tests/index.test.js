import render from 'utils/customTestRenderers'

import PlayersCharacters from '../index'

import { playersCharactersAllIds } from 'mocks/playersCharacters'

jest.mock('actions/playersCharacters', () => {
  const {
    GET_PLAYERS_CHARACTERS,
  } = require('actions/playersCharacters/constants')
  return {
    getPlayersCharacters: jest.fn(() => ({
      type: GET_PLAYERS_CHARACTERS,
      payload: {},
    })),
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

const renderComponent = (props = {}) => render(<PlayersCharacters {...props} />)

describe('<PlayersCharacters />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render the page correctly', () => {
    const { getByTestId } = renderComponent()

    const home = getByTestId(/player-characters/i)
    expect(home).toBeInTheDocument()

    playersCharactersAllIds.forEach((id) => {
      const pcSummary = getByTestId(`pc-summary-${id}`)
      expect(pcSummary).toBeInTheDocument()
    })
  })

  it('should dispatch fetch actions on mount', () => {
    renderComponent()
    expect(getArchetypes).toHaveBeenCalledTimes(1)
    expect(getCareers).toHaveBeenCalledTimes(1)
    expect(getPlayersCharacters).toHaveBeenCalledTimes(1)
  })
})
