import {
  describe,
  it
} from 'vitest'

describe('test this sum file', () => {
  it('test sum', ({ expect }) => {
    expect(1 + 2).toMatchSnapshot()
  })
})