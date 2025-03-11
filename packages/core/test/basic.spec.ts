import { add } from '../src/index'
import { expect, it } from 'vitest'

it('should add two numbers', () => {
  expect(add(2, 3)).toBe(5)
})
