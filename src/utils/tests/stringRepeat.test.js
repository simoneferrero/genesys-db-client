import stringRepeat from '../stringRepeat'

describe('stringRepeat', () => {
  it('should return the correct string', () => {
    const string = 'hello'
    const result = stringRepeat(string, 4)
    const expectedResult = `${string} ${string} ${string} ${string}`
    expect(result).toEqual(expectedResult)
  })
})
