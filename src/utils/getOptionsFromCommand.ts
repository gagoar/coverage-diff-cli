import { logger } from '../utils/debug';

const debug = logger('getOptionsFromCommand');
interface Options {
  baseLocation: string;
  headLocation: string;
}
export interface Command {
  parent: Options;
}

export const getOptionsFromCommand = (command: Command): Options => {
  const {
    parent: { baseLocation, headLocation },
  } = command;

  debug({ baseLocation, headLocation });
  return { baseLocation, headLocation };
};
