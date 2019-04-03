import rgbToRgba from '../rgbToRgba'

describe('rgbToRgba', () => {
  it('should correctly add opacity', () => {
    const string = 'rgb(0, 0, 0)'
    const result = rgbToRgba(string, 1)
    const expectedResult = 'rgba(0, 0, 0, 1)'
    expect(result).toEqual(expectedResult)
  })
})
