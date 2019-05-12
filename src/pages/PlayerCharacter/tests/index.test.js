import { Suspense } from 'react'
import render from 'utils/customTestRenderers'

import ReducerRecord from 'reducers/records'

import PlayerCharacter from '../index'

import { formikActions, store } from 'mocks'
import { criticalInjury3 } from 'mocks/criticalInjuries'
import { newFavor } from 'mocks/favors'
import {
  playerCharacter1Id,
  playerCharacter1Augmented,
  playerCharacter1Response,
} from 'mocks/playersCharacters'
import { newWeaponResponse } from 'mocks/weapons'

import { GET_ARCHETYPES } from 'actions/archetypes/constants'
import { GET_CAREERS } from 'actions/careers/constants'
import {
  ADD_PLAYER_CHARACTER_CRITICAL_INJURY,
  GET_CRITICAL_INJURIES,
} from 'actions/criticalInjuries/constants'
import { GET_FACTIONS } from 'actions/factions/constants'
import { ADD_FAVOR } from 'actions/favors/constants'
import {
  EDIT_PLAYER_CHARACTER,
  GET_PLAYER_CHARACTER,
  GET_PLAYER_CHARACTER_SUCCESS,
} from 'actions/playersCharacters/constants'
import { GET_SKILLS } from 'actions/skills/constants'
import {
  GET_WEAPONS,
  ADD_PLAYER_CHARACTER_WEAPON,
} from 'actions/weapons/constants'

jest.mock('redux-saga', () => () => {})

jest.mock('actions/authentication', () => ({
  getAuthInfo: jest.fn(() => ({ type: '' })),
}))
import { getAuthInfo } from 'actions/authentication'

jest.mock('actions/favors', () => ({
  addFavor: jest.fn(() => ({ type: '' })),
  addFavorSuccess: jest.fn(() => ({ type: '' })),
  addFavorError: jest.fn(() => ({ type: '' })),
}))
import { addFavor } from 'actions/favors'

jest.mock('actions/playersCharacters', () => ({
  editPlayerCharacter: jest.fn(() => ({ type: '' })),
  editPlayerCharacterSuccess: jest.fn(() => ({ type: '' })),
  editPlayerCharacterError: jest.fn(() => ({ type: '' })),
  getPlayerCharacter: jest.fn(() => ({ type: '' })),
  getPlayerCharacterSuccess: jest.fn(() => ({ type: '' })),
  getPlayerCharacterError: jest.fn(() => ({ type: '' })),
  getPlayersCharacters: jest.fn(() => ({ type: '' })),
  getPlayersCharactersSuccess: jest.fn(() => ({ type: '' })),
  getPlayersCharactersError: jest.fn(() => ({ type: '' })),
}))
import {
  editPlayerCharacter,
  getPlayerCharacter,
} from 'actions/playersCharacters'

jest.mock('actions/archetypes', () => {
  return {
    getArchetypes: jest.fn(() => ({ type: '' })),
    getArchetypesSuccess: jest.fn(() => ({ type: '' })),
    getArchetypesError: jest.fn(() => ({ type: '' })),
  }
})
import { getArchetypes } from 'actions/archetypes'

jest.mock('actions/careers', () => {
  return {
    getCareers: jest.fn(jest.fn(() => ({ type: '' }))),
    getCareersSuccess: jest.fn(() => ({ type: '' })),
    getCareersError: jest.fn(() => ({ type: '' })),
  }
})
import { getCareers } from 'actions/careers'

jest.mock('actions/criticalInjuries', () => {
  return {
    addPlayerCharacterCriticalInjury: jest.fn(jest.fn(() => ({ type: '' }))),
    addPlayerCharacterCriticalInjurySuccess: jest.fn(() => ({ type: '' })),
    addPlayerCharacterCriticalInjuryError: jest.fn(() => ({ type: '' })),
    getCriticalInjuries: jest.fn(jest.fn(() => ({ type: '' }))),
    getCriticalInjuriesSuccess: jest.fn(() => ({ type: '' })),
    getCriticalInjuriesError: jest.fn(() => ({ type: '' })),
  }
})
import {
  addPlayerCharacterCriticalInjury,
  getCriticalInjuries,
} from 'actions/criticalInjuries'

jest.mock('actions/factions', () => ({
  getFactions: jest.fn(() => ({ type: '' })),
  getFactionsSuccess: jest.fn(() => ({ type: '' })),
  getFactionsError: jest.fn(() => ({ type: '' })),
}))
import { getFactions } from 'actions/factions'

jest.mock('actions/skills', () => ({
  getSkills: jest.fn(() => ({ type: '' })),
  getSkillsSuccess: jest.fn(() => ({ type: '' })),
  getSkillsError: jest.fn(() => ({ type: '' })),
}))
import { getSkills } from 'actions/skills'

jest.mock('actions/weapons', () => ({
  getWeapons: jest.fn(() => ({ type: '' })),
  getWeaponsSuccess: jest.fn(() => ({ type: '' })),
  getWeaponsError: jest.fn(() => ({ type: '' })),
  addPlayerCharacterWeapon: jest.fn(() => ({ type: '' })),
  addPlayerCharacterWeaponSuccess: jest.fn(() => ({ type: '' })),
  addPlayerCharacterWeaponError: jest.fn(() => ({ type: '' })),
}))
import { getWeapons, addPlayerCharacterWeapon } from 'actions/weapons'

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

      const header = getByText(playerCharacter1Augmented.get('name'))
      expect(header).toBeInTheDocument()

      const pcSheet = getByTestId(/pc-sheet/i)
      expect(pcSheet).toBeInTheDocument()

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

  describe('loader', () => {
    it('should render correctly if finished loading', async () => {
      // Skip redux-saga and dispatch success action directly
      getPlayerCharacter.mockImplementation(() => ({
        type: GET_PLAYER_CHARACTER_SUCCESS,
        payload: {
          id,
          playerCharacter: playerCharacter1Response,
        },
      }))
      const { getByTestId, queryByTestId } = renderComponent()

      await wait(() => {
        const playersCharactersWrapper = getByTestId(/player-character/i)
        expect(playersCharactersWrapper).toBeInTheDocument()

        const pcSheet = getByTestId(/pc-sheet/i)
        expect(pcSheet).toBeInTheDocument()

        const spinner = queryByTestId(/spinner/i)
        expect(spinner).not.toBeInTheDocument()
      })
    })

    const testCases = [
      {
        name: 'archetypes',
        type: GET_ARCHETYPES,
      },
      {
        name: 'careers',
        type: GET_CAREERS,
      },
      {
        name: 'criticalInjuries',
        type: GET_CRITICAL_INJURIES,
      },
      {
        name: 'factions',
        type: GET_FACTIONS,
      },
      {
        name: 'playerCharacter',
        payload: {
          id,
        },
        type: GET_PLAYER_CHARACTER,
      },
      {
        name: 'skills',
        type: GET_SKILLS,
      },
      {
        name: 'weapons',
        type: GET_WEAPONS,
      },
    ]

    testCases.forEach(({ name, payload = {}, type }) => {
      it(`should display a loader if ${name} are loading`, async () => {
        getFactions.mockImplementation(() => ({
          type,
          payload,
        }))

        const { getByTestId } = renderComponent()

        await wait(() => {
          const playersCharactersWrapper = getByTestId(/player-character/i)
          expect(playersCharactersWrapper).toBeInTheDocument()

          const pcSheet = getByTestId(/pc-sheet/i)
          expect(pcSheet).toBeInTheDocument()

          const spinner = getByTestId(/spinner/i)
          expect(spinner).toBeInTheDocument()
        })
      })
    })
  })

  it('should dispatch fetch actions on mount', () => {
    renderComponent()
    expect(getAuthInfo).toHaveBeenCalledTimes(1)
    expect(getPlayerCharacter).toHaveBeenCalledTimes(1)
    expect(getPlayerCharacter).toHaveBeenCalledWith(id)
    expect(getArchetypes).toHaveBeenCalledTimes(1)
    expect(getCareers).toHaveBeenCalledTimes(1)
    expect(getCriticalInjuries).toHaveBeenCalledTimes(1)
    expect(getSkills).toHaveBeenCalledTimes(1)
    expect(getFactions).toHaveBeenCalledTimes(1)
    expect(getWeapons).toHaveBeenCalledTimes(1)
  })

  it('should call editPlayerCharacter on submit', async () => {
    editPlayerCharacter.mockImplementation(() => ({
      type: EDIT_PLAYER_CHARACTER,
      payload: {
        id,
        values: playerCharacter1Augmented.toJS(),
        actions: formikActions,
      },
    }))

    const { getByTestId } = renderComponent()

    const editButton = getByTestId(/edit-pc-sheet/i)
    fireEvent.click(editButton)

    const submitButton = getByTestId(/submit-pc-sheet/i)
    fireEvent.click(submitButton)

    await wait(() => {
      expect(editPlayerCharacter).toHaveBeenCalledTimes(1)
    })
  })

  it('should call addFavor on new favor submit', async () => {
    addFavor.mockImplementation(() => ({
      type: ADD_FAVOR,
      payload: {
        actions: formikActions,
        favor: newFavor,
        playerCharacterId: id,
      },
    }))

    const { getByPlaceholderText, getByTestId } = renderComponent()

    const editButton = getByTestId(/edit-favor-owed/i)
    fireEvent.click(editButton)

    const description = getByPlaceholderText(/add description.../i)
    fireEvent.change(description, {
      target: { value: 'This is a new description' },
    })

    const submitButton = getByTestId(/submit-favor-owed/i)
    fireEvent.click(submitButton)

    await wait(() => {
      expect(addFavor).toHaveBeenCalledTimes(1)

      const spinner = getByTestId(/spinner/i)
      expect(spinner).toBeInTheDocument()
    })
  })

  it('should call addPlayerCharacterCriticalInjury on new weapon submit', async () => {
    addPlayerCharacterCriticalInjury.mockImplementation(() => ({
      type: ADD_PLAYER_CHARACTER_CRITICAL_INJURY,
      payload: {
        actions: formikActions,
        playerCharacterId: id,
        criticalInjuryId: criticalInjury3.id,
      },
    }))

    const { getByTestId } = renderComponent()

    const editButton = getByTestId('edit-criticalInjury')
    fireEvent.click(editButton)

    const submitButton = getByTestId('submit-criticalInjury')
    fireEvent.click(submitButton)

    await wait(() => {
      expect(addPlayerCharacterCriticalInjury).toHaveBeenCalledTimes(1)

      const spinner = getByTestId(/spinner/i)
      expect(spinner).toBeInTheDocument()
    })
  })

  it('should call addPlayerCharacterWeapon on new weapon submit', async () => {
    addPlayerCharacterWeapon.mockImplementation(() => ({
      type: ADD_PLAYER_CHARACTER_WEAPON,
      payload: {
        actions: formikActions,
        playerCharacterId: id,
        weaponId: newWeaponResponse.id,
      },
    }))

    const { getByTestId } = renderComponent()

    const editButton = getByTestId(/edit-weapon/i)
    fireEvent.click(editButton)

    const submitButton = getByTestId(/submit-weapon/i)
    fireEvent.click(submitButton)

    await wait(() => {
      expect(addPlayerCharacterWeapon).toHaveBeenCalledTimes(1)

      const spinner = getByTestId(/spinner/i)
      expect(spinner).toBeInTheDocument()
    })
  })
})
