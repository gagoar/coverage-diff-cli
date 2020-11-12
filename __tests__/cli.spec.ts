import path from 'path';

import { exec, ExecException } from 'child_process';

async function cli(
  args: string[],
  cwd = '.'
): Promise<{
  code: number;
  error: ExecException | null;
  stdout: string;
  stderr: string;
}> {
  return new Promise((resolve) => {
    exec(`node ${path.resolve('./cli/cli.js')} ${args.join(' ')}`, { cwd }, (error, stdout, stderr) => {
      resolve({
        code: error && error.code ? error.code : 0,
        error,
        stdout,
        stderr,
      });
    });
  });
}

// Used for manual testing purposes. I trust commander does what it should do.
describe('on CLI invoke', () => {
  it('displays results', async () => {
    const result = await cli([
      'results',
      '--baseLocation __mocks__/base_summary.json',
      '--headLocation __mocks__/head_summary.json',
    ]);
    expect(result.error).toBe(null);
    expect(result.stdout).toMatchInlineSnapshot(`
      "| Ok  | File                                     | Lines           | Branches        | Functions       | Statements      |
      | --- | ---------------------------------------- | --------------- | --------------- | --------------- | --------------- |
      | ✅   | /some/full/path/src/commands/getToken.ts | 100%<br>(+100%) | 100%<br>(+100%) | 100%<br>(+100%) | 100%<br>(+100%) |
      | ✅   | /some/full/path/src/commands/index.ts    | 100%<br>(+100%) | 100%<br>(+0%)   | 100%<br>(+100%) | 100%<br>(+100%) |

      Total:

      | Lines       | Branches    | Functions   | Statements  |
      | ----------- | ----------- | ----------- | ----------- |
      | 100%(+100%) | 100%(+100%) | 100%(+100%) | 100%(+100%) |
      "
    `);
  });
  it('displays diff', async () => {
    const result = await cli([
      'diff',
      '--baseLocation __mocks__/base_summary.json',
      '--headLocation __mocks__/head_summary.json',
    ]);
    expect(result.error).toBe(null);
    expect(result.stdout).toMatchInlineSnapshot(`
      "{ total:
         { lines: { total: -19, covered: 38, skipped: 0, pct: 100 },
           statements: { total: -19, covered: 40, skipped: 0, pct: 100 },
           functions: { total: -2, covered: 5, skipped: 0, pct: 100 },
           branches: { total: 0, covered: 11, skipped: 0, pct: 100 } },
        '/some/full/path/src/commands/getToken.ts':
         { lines: { total: 0, covered: 37, skipped: 0, pct: 100 },
           statements: { total: 0, covered: 37, skipped: 0, pct: 100 },
           functions: { total: 0, covered: 3, skipped: 0, pct: 100 },
           branches: { total: 0, covered: 11, skipped: 0, pct: 100 } },
        '/some/full/path/src/commands/index.ts':
         { lines: { total: 0, covered: 1, skipped: 0, pct: 100 },
           statements: { total: 0, covered: 3, skipped: 0, pct: 100 },
           functions: { total: 0, covered: 2, skipped: 0, pct: 100 },
           branches: { total: 0, covered: 0, skipped: 0, pct: 0 } } }
      "
    `);
  });
  it('displays regression', async () => {
    const result = await cli([
      'regression',
      '--baseLocation __mocks__/base_summary.json',
      '--headLocation __mocks__/head_summary.json',
    ]);
    expect(result.error).toBe(null);
    expect(result.stdout).toMatchInlineSnapshot('""');
  });
});
