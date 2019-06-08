import sortById from '../sortById'

describe('sortById', () => {
  describe('integers', () => {
    it('should correctly return 1 if a.id is greater than b.id', () => {
      const a = {
        id: 2,
      }
      const b = {
        id: 1,
      }
      const result = sortById(a, b)
      expect(result).toBe(1)
    })

    it('should correctly return -1 if a.id is greater than b.id', () => {
      const a = {
        id: 1,
      }
      const b = {
        id: 2,
      }
      const result = sortById(a, b)
      expect(result).toBe(-1)
    })
  })

  describe('alphabetic', () => {
    it('should correctly return 1 if a.id is greater than b.id', () => {
      const a = {
        id: 'z',
      }
      const b = {
        id: 'c',
      }
      const result = sortById(a, b)
      expect(result).toBe(1)
    })

    it('should correctly return -1 if a.id is greater than b.id', () => {
      const a = {
        id: 'c',
      }
      const b = {
        id: 'z',
      }
      const result = sortById(a, b)
      expect(result).toBe(-1)
    })
  })
})
