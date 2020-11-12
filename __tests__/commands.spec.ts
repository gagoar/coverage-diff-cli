import * as fs from 'fs';
import { mockProcessExit } from 'jest-mock-process';
import { stopAndPersist, fail } from '../__mocks__/ora';
import { regressionCommand } from '../index';
import { mockConsole, unMockConsole } from './helper';
import baseSummary from '../__mocks__/base_summary.json';
import headSummary from '../__mocks__/head_summary.json';
import { diffCommand, resultsCommand } from '../src';

jest.mock('fs');
type Callback = (err: Error | null, response: unknown) => void;
describe('commands', () => {
  let consoleErrorMock: jest.Mock;
  let consoleLogMock: jest.Mock;
  beforeAll(() => {
    consoleLogMock = mockConsole('log');
    consoleErrorMock = mockConsole('error');
  });

  afterAll(() => {
    unMockConsole('log');
    unMockConsole('error');
  });

  const readFile = (fs.readFile as unknown) as jest.Mock<unknown>;

  describe('results', () => {
    beforeEach(() => {
      consoleLogMock.mockReset();
      consoleErrorMock.mockReset();
      stopAndPersist.mockReset();
      fail.mockReset();
    });

    it('should show the results', async () => {
      readFile.mockImplementation((file: string, callback: Callback) => {
        const summary = file.match(/base/) ? baseSummary : headSummary;
        callback(null, Buffer.from(JSON.stringify(summary)));
      });

      await resultsCommand({ parent: { baseLocation: 'base_summary.json', headLocation: 'head_summary.json' } });

      expect(stopAndPersist.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            Object {
              "symbol": "💫",
              "text": "No regression found",
            },
          ],
        ]
      `);
      expect(fail).not.toHaveBeenCalled();
      expect(consoleLogMock.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            "| Ok  | File                                     | Lines           | Branches        | Functions       | Statements      |
        | --- | ---------------------------------------- | --------------- | --------------- | --------------- | --------------- |
        | ✅   | /some/full/path/src/commands/getToken.ts | 100%<br>(+100%) | 100%<br>(+100%) | 100%<br>(+100%) | 100%<br>(+100%) |
        | ✅   | /some/full/path/src/commands/index.ts    | 100%<br>(+100%) | 100%<br>(+0%)   | 100%<br>(+100%) | 100%<br>(+100%) |

        Total:

        | Lines       | Branches    | Functions   | Statements  |
        | ----------- | ----------- | ----------- | ----------- |
        | 100%(+100%) | 100%(+100%) | 100%(+100%) | 100%(+100%) |",
          ],
        ]
      `);
    });
  });
  describe('diff', () => {
    beforeEach(() => {
      consoleLogMock.mockReset();
      consoleErrorMock.mockReset();
      stopAndPersist.mockReset();
      fail.mockReset();
    });

    it('should show the diff', async () => {
      readFile.mockImplementation((file: string, callback: Callback) => {
        const summary = file.match(/base/) ? baseSummary : headSummary;
        callback(null, Buffer.from(JSON.stringify(summary)));
      });

      await diffCommand({ parent: { baseLocation: 'base_summary.json', headLocation: 'head_summary.json' } });

      expect(stopAndPersist.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            Object {
              "symbol": "💫",
              "text": "No regression found",
            },
          ],
        ]
      `);
      expect(fail).not.toHaveBeenCalled();
      expect(consoleLogMock.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            Object {
              "/some/full/path/src/commands/getToken.ts": Object {
                "branches": Object {
                  "covered": 11,
                  "pct": 100,
                  "skipped": 0,
                  "total": 0,
                },
                "functions": Object {
                  "covered": 3,
                  "pct": 100,
                  "skipped": 0,
                  "total": 0,
                },
                "lines": Object {
                  "covered": 37,
                  "pct": 100,
                  "skipped": 0,
                  "total": 0,
                },
                "statements": Object {
                  "covered": 37,
                  "pct": 100,
                  "skipped": 0,
                  "total": 0,
                },
              },
              "/some/full/path/src/commands/index.ts": Object {
                "branches": Object {
                  "covered": 0,
                  "pct": 0,
                  "skipped": 0,
                  "total": 0,
                },
                "functions": Object {
                  "covered": 2,
                  "pct": 100,
                  "skipped": 0,
                  "total": 0,
                },
                "lines": Object {
                  "covered": 1,
                  "pct": 100,
                  "skipped": 0,
                  "total": 0,
                },
                "statements": Object {
                  "covered": 3,
                  "pct": 100,
                  "skipped": 0,
                  "total": 0,
                },
              },
              "total": Object {
                "branches": Object {
                  "covered": 11,
                  "pct": 100,
                  "skipped": 0,
                  "total": 0,
                },
                "functions": Object {
                  "covered": 5,
                  "pct": 100,
                  "skipped": 0,
                  "total": -2,
                },
                "lines": Object {
                  "covered": 38,
                  "pct": 100,
                  "skipped": 0,
                  "total": -19,
                },
                "statements": Object {
                  "covered": 40,
                  "pct": 100,
                  "skipped": 0,
                  "total": -19,
                },
              },
            },
          ],
        ]
      `);
    });
  });
  describe('regression', () => {
    beforeEach(() => {
      consoleLogMock.mockReset();
      consoleErrorMock.mockReset();
      stopAndPersist.mockReset();
      fail.mockReset();
    });

    it('should exit with 0', async () => {
      const mockExit = mockProcessExit();
      readFile.mockImplementation((file: string, callback: Callback) => {
        const summary = file.match(/base/) ? baseSummary : headSummary;
        callback(null, Buffer.from(JSON.stringify(summary)));
      });

      await regressionCommand({ parent: { baseLocation: 'base_summary.json', headLocation: 'head_summary.json' } });

      expect(stopAndPersist.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            Object {
              "symbol": "💫",
              "text": "There was a regression",
            },
          ],
        ]
      `);
      expect(fail).not.toHaveBeenCalled();
      expect(mockExit).not.toHaveBeenCalled();
    });
  });
});
