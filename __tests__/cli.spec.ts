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
