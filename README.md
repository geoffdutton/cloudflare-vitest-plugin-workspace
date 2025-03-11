# Simple Vitest Workspace

A minimal monorepo demonstrating Vitest with an npm workspace, tested with both the default Node.js pool and [@cloudflare/vitest-pool-workers](https://github.com/cloudflare/workers-sdk/tree/main/packages/vitest-pool-workers).

## Structure

```
simple-vitest-workspace/
├── packages/
│ └── core/
│ ├── src/
│ │ └── index.js # Simple add function
│ ├── test/
│ │ └── basic.test.js # Basic test for add
│ └── package.json # Package config
├── package.json # Root config with workspace
├── vitest.config.js # Vitest config (Workers pool)
└── README.md # This file
```

## Prerequisites

- Node.js >= 18.x
- npm >= 9.x

## Setup

```bash
# Clone the repository
git clone <repo-url>
cd simple-vitest-workspace

# Install Dependencies
npm install
```

## Running Tests

### With Default Node.js Pool

Edit vitest.config.js to use the default pool:

```javascript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    root: '.',
    include: ['packages/*/test/*.test.js'],
  },
})
```

Run tests:

```bash
npm test
```

Expected Output:

```
RUN v3.0.8 /path/to/simple-vitest-workspace
✓ packages/core/test/basic.test.js (1)
✓ should add two numbers
Test Files 1 passed (1)
Tests 1 passed (1)
Duration XXXms
```

### With Cloudflare Workers Pool

Use the provided vitest.config.js (or ensure it matches):

```javascript
import { defineWorkersConfig } from '@cloudflare/vitest-pool-workers/config'

export default defineWorkersConfig({
  test: {
    root: '.',
    include: ['packages/*/test/*.test.js'],
    poolOptions: {
      workers: {
        main: 'packages/core/src/index.js',
        singleWorker: true,
        miniflare: {
          compatibilityDate: '2025-03-10',
        },
      },
    },
  },
})
```

Run tests:

```bash
npm test
```

Expected Output:

```
RUN v3.0.8 /path/to/simple-vitest-workspace
[vpw:inf] Starting single runtime for vitest.config.js...
✓ packages/core/test/basic.test.js (1)
✓ should add two numbers
Test Files 1 passed (1)
Tests 1 passed (1)
Duration XXXms
[vpw:dbg] Shutting down runtimes...
```

## Purpose

This repo serves as a minimal reproducible example for:

- A working Vitest setup in an npm workspace.
- Integration with @cloudflare/vitest-pool-workers.

It was created to troubleshoot an issue where @cloudflare/vitest-pool-workers failed with TypeError: input.replace is not a function in a more complex project. In this simplified setup, both pools work, suggesting the original issue may stem from:

- Absolute paths in include or main (fixed here with relative paths).
- Project structure or config mismatches.

## Original Issue

In a larger monorepo, using absolute paths like:

```javascript
include: ['/absolute/path/to/test/agent.spec.ts']
```

or

```javascript
main: '/absolute/path/to/server-for-check.ts'
```

caused:

```
TypeError: input.replace is not a function
at normalizeWindowsPath (pathe.ff20891b.mjs:6:16)
at relative (pathe.ff20891b.mjs:160:15)
at createFileTask (@vitest/runner/dist/chunk-tasks.js:120:16)
```

Switching to relative paths and globs resolved it here. If you encounter this, try:

- Using relative paths ("packages/_/test/_.js", "packages/core/src/index.js").
- Filing a bug at cloudflare/workers-sdk with your config and stack trace.

## Dependencies

- vitest: ^3.0.8
- @cloudflare/vitest-pool-workers: Latest (check package.json)

## License

MIT
