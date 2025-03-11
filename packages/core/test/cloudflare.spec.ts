import { expect, it } from 'vitest'
import { env } from 'cloudflare:test'

it('should be able to access the environment', () => {
  expect(env.TEST_ENV).toBe('test')
})
