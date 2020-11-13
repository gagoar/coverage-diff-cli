import { IJsonSummary } from 'coverage-diff/lib/common';
import fs from 'fs';
import { promisify } from 'util';
import { logger } from './debug';
import { isIJsonSummary } from './guards';

const debug = logger('readFile');
const readFile = promisify(fs.readFile);
export const readJSONFile = async (filePath: string): Promise<Record<string, unknown>> => {
  debug('reading...', filePath);

  const rawContent = await readFile(filePath);

  const content = rawContent.toString();

  return JSON.parse(content);
};

export const readCoverageFiles = async (
  baseLocation: string,
  headLocation: string
): Promise<[base: IJsonSummary, head: IJsonSummary]> => {
  const [base, head] = await Promise.all([readJSONFile(baseLocation), readJSONFile(headLocation)]).catch((e: Error) => {
    throw new Error(`We found errors trying to read summaries ${e.message}`);
  });

  if (isIJsonSummary(base) && isIJsonSummary(head)) {
    return [base, head];
  } else {
    throw new Error(
      'files provided are not of the shape json-summary, for more details, take a look at https://istanbul.js.org/docs/advanced/alternative-reporters/#json-summary'
    );
  }
};
