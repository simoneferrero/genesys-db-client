import { createBrowserHistory } from 'history'

import history from '../history'

describe('utils/history', () => {
  it('should return the correct value', () => {
    const result = JSON.stringify(history)
    const expectedResult = JSON.stringify(createBrowserHistory())

    expect(result).toEqual(expectedResult)
  })
})
