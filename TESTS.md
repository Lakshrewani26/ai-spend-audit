# Tests

## How to run
```bash
npm test
```

## Test file
`__tests__/auditEngine.test.ts`

## Test cases

| # | Test | What it covers |
|---|------|----------------|

| 1 | Cursor Teams with 2 seats should suggest downgrade to Pro | Rule 2: Wrong plan for team size |

| 2 | GitHub Copilot Business with 1 seat should suggest downgrade to Individual | Rule 2: Wrong plan for solo user |

| 3 | GitHub Copilot should be flagged as redundant when Cursor is present | Rule 3: Redundant coding tools |

| 4 | Already optimal stack should return zero total savings | Edge case: no unnecessary recommendations |

| 5 | Annual savings should be 12x monthly savings | Math accuracy check |