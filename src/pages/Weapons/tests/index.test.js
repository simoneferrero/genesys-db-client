import { Suspense } from 'react'
import render from 'utils/customTestRenderers'

import Weapons from '../index'

import { store } from 'mocks'
import { newWeaponResponse, weapons } from 'mocks/weapons'

import { GET_WEAPONS } from 'actions/weapons/constants'
import { GET_SKILLS } from 'actions/skills/constants'

jest.mock('redux-saga', () => () => {})

jest.mock('actions/authentication', () => ({
  getAuthInfo: jest.fn(() => ({ type: '' })),
}))
import { getAuthInfo } from 'actions/authentication'

jest.mock('actions/weapons', () => {
  return {
    getWeapons: jest.fn(() => ({ type: '' })),
    getWeaponsSuccess: jest.fn(),
    getWeaponsError: jest.fn(),
    addWeapon: jest.fn(() => ({ type: '' })),
    addWeaponSuccess: jest.fn(),
    addWeaponError: jest.fn(),
  }
})
import { getWeapons, addWeapon } from 'actions/weapons'

jest.mock('actions/skills', () => ({
  getSkills: jest.fn(() => ({ type: '' })),
  getSkillsSuccess: jest.fn(),
  getSkillsError: jest.fn(),
}))
import { getSkills } from 'actions/skills'

const renderComponent = (props = {}, initialState) =>
  render(
    <Suspense fallback="loading...">
      <Weapons {...props} />
    </Suspense>,
    { initialState },
  )

describe('<Weapons />', () => {
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

      const weaponsWrapper = getByTestId(/weapons/gi)
      expect(weaponsWrapper).toBeInTheDocument()

      const weaponsSection = getByTestId(/weapons-section/gi)
      expect(weaponsSection).toBeInTheDocument()

      weapons.forEach(({ id }) => {
        const weapon = getByTestId(`weapon-${id}`)
        expect(weapon).toBeInTheDocument()
      })

      const spinner = queryByTestId(/spinner/i)
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
      const weaponsWrapper = getByTestId(/weapons/gi)
      expect(weaponsWrapper).toBeInTheDocument()

      const editButton = getByTestId(/edit/i)
      expect(editButton).toBeInTheDocument()

      fireEvent.click(editButton)

      const newWeapon = getByTestId(/new-weapon/i)
      expect(newWeapon).toBeInTheDocument()

      const name = getByPlaceholderText(/weapon's name/i)
      expect(name).toBeInTheDocument()
      fireEvent.change(name, {
        target: {
          value: newWeaponResponse.name,
        },
      })
      const populatedName = getByDisplayValue(`${newWeaponResponse.name}`)
      expect(populatedName).toBeInTheDocument()

      const special = getByPlaceholderText(/special features/i)
      expect(special).toBeInTheDocument()
      fireEvent.change(special, {
        target: {
          value: newWeaponResponse.special,
        },
      })
      const populatedSpecial = getByDisplayValue(`${newWeaponResponse.special}`)
      expect(populatedSpecial).toBeInTheDocument()

      const submitButton = getByTestId(/submit/i)
      fireEvent.click(submitButton)

      await wait(() => {
        expect(addWeapon).toHaveBeenCalledTimes(1)
      })
    })
  })

  it('should render correctly if loading weapons', async () => {
    getWeapons.mockImplementation(() => ({
      type: GET_WEAPONS,
      payload: {},
    }))

    const { getByTestId } = renderComponent()

    await wait(() => {
      const weaponsWrapper = getByTestId(/weapons/gi)
      expect(weaponsWrapper).toBeInTheDocument()

      const spinner = getByTestId(/spinner/i)
      expect(spinner).toBeInTheDocument()
    })
  })

  it('should render correctly if loading skills', async () => {
    getSkills.mockImplementation(() => ({
      type: GET_SKILLS,
      payload: {},
    }))

    const { getByTestId } = renderComponent()

    await wait(() => {
      const weaponsWrapper = getByTestId(/weapons/gi)
      expect(weaponsWrapper).toBeInTheDocument()

      const spinner = getByTestId(/spinner/i)
      expect(spinner).toBeInTheDocument()
    })
  })

  it('should dispatch fetch actions on mount', () => {
    renderComponent()
    expect(getAuthInfo).toHaveBeenCalledTimes(1)
    expect(getSkills).toHaveBeenCalledTimes(1)
    expect(getWeapons).toHaveBeenCalledTimes(1)
  })
})
