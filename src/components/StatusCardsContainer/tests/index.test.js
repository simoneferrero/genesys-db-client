import renderComponent from 'utils/customTestRenderers'

import StatusCardsContainer from '../index'

import { statusesAllIds } from 'mocks/statuses'

jest.mock('actions/getTubeStatuses', () => ({
  getTubeStatuses: jest.fn(() => ({
    type: 'GET_TUBE_STATUSES',
  })),
}))
import { getTubeStatuses } from 'actions/getTubeStatuses'

describe('<StatusCardsContainer />', () => {
  it('should render a StatusCard for each line', () => {
    const { getAllByTestId } = renderComponent(<StatusCardsContainer />)
    const result = getAllByTestId(/statusCard$/i).length
    const expectedResult = statusesAllIds.length
    expect(result).toEqual(expectedResult)
  })

  it('should dispatch the getTubeStatuses action after initial mount', () => {
    renderComponent(<StatusCardsContainer />)
    expect(getTubeStatuses).toHaveBeenCalled()
  })
})
