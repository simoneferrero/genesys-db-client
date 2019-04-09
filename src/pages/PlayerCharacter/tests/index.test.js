import { Suspense } from 'react'
import render from 'utils/customTestRenderers'

import ReducerRecord from 'reducers/records'

import PlayerCharacter from '../index'

import { store } from 'mocks'
import {
  playerCharacter1Id,
  // TODO: get full player character mocks
  playerCharacterSummary1Augmented,
  playerCharacterSummary1Response,
} from 'mocks/playersCharacters'

import {
  GET_PLAYER_CHARACTER,
  GET_PLAYER_CHARACTER_SUCCESS,
} from 'actions/playersCharacters/constants'

jest.mock('actions/playersCharacters', () => {
  return {
    getPlayerCharacter: jest.fn(),
  }
})
import { getPlayerCharacter } from 'actions/playersCharacters'

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
  render(
    <Suspense fallback="loading...">
      <PlayerCharacter {...props} />
    </Suspense>,
    { initialState },
  )

describe('<PlayerCharacter />', () => {
  const id = `${playerCharacter1Id}`

  beforeEach(() => {
    // Do not dispatch correct action so loader is false
    getPlayerCharacter.mockImplementation(() => ({
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
    const { getByTestId, getByText, queryByTestId } = renderComponent()

    await wait(() => {
      const playersCharactersWrapper = getByTestId(/player-character/i)
      expect(playersCharactersWrapper).toBeInTheDocument()

      const header = getByText(playerCharacterSummary1Augmented.get('name'))
      expect(header).toBeInTheDocument()

      const message = getByText(/hello/i)
      expect(message).toBeInTheDocument()

      const spinner = queryByTestId(/spinner/i)
      expect(spinner).not.toBeInTheDocument()
    })
  })

  it('should not render the header if character has not been fetched yet', async () => {
    const modifiedState = store.set('playersCharacters', new ReducerRecord())
    const { getByTestId, queryByTestId } = renderComponent({}, modifiedState)

    await wait(() => {
      const playersCharactersWrapper = getByTestId(/player-character/i)
      expect(playersCharactersWrapper).toBeInTheDocument()

      const header = queryByTestId(/header/i)
      expect(header).not.toBeInTheDocument()
    })
  })

  it('should render correctly if loading', async () => {
    getPlayerCharacter.mockImplementation(() => ({
      type: GET_PLAYER_CHARACTER,
      payload: {
        id,
      },
    }))

    const { getByTestId, getByText } = renderComponent()

    await wait(() => {
      const playersCharactersWrapper = getByTestId(/player-character/i)
      expect(playersCharactersWrapper).toBeInTheDocument()

      const message = getByText(/hello/i)
      expect(message).toBeInTheDocument()

      const spinner = getByTestId(/spinner/i)
      expect(spinner).toBeInTheDocument()
    })
  })

  it('should render correctly if finished loading', async () => {
    // Skip redux-saga and dispatch success action directly
    getPlayerCharacter.mockImplementation(() => ({
      type: GET_PLAYER_CHARACTER_SUCCESS,
      payload: {
        id,
        playerCharacter: playerCharacterSummary1Response,
      },
    }))
    const { getByTestId, getByText, queryByTestId } = renderComponent()

    await wait(() => {
      const playersCharactersWrapper = getByTestId(/player-character/i)
      expect(playersCharactersWrapper).toBeInTheDocument()

      const message = getByText(/hello/i)
      expect(message).toBeInTheDocument()

      const spinner = queryByTestId(/spinner/i)
      expect(spinner).not.toBeInTheDocument()
    })
  })

  it('should dispatch fetch actions on mount', () => {
    renderComponent()
    expect(getArchetypes).toHaveBeenCalledTimes(1)
    expect(getCareers).toHaveBeenCalledTimes(1)
    expect(getPlayerCharacter).toHaveBeenCalledTimes(1)
    expect(getPlayerCharacter).toHaveBeenCalledWith(id)
  })
})
