// import { defineConfig } from 'vitest/config'

// export default defineConfig({
//   test: {
//     root: '.', // Root of the monorepo
//     include: ['packages/core/**/*.spec.js'], // Glob pattern to match test files
//   },
// })

import { defineWorkersConfig } from '@cloudflare/vitest-pool-workers/config'

export default defineWorkersConfig({
  test: {
    root: '.', // Root of the monorepo
    include: ['packages/core/**/*.spec.ts'],
    poolOptions: {
      workers: {
        main: 'packages/core/src/index.js', // Use index.js as a dummy Workers entry
        singleWorker: true,
        miniflare: {
          compatibilityDate: '2025-03-10',
        },
      },
    },
  },
})
