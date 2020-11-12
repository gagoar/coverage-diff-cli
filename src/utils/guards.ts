import { IJsonSummary } from 'coverage-diff/lib/common';

export const isString = (value: unknown): value is string => typeof value === 'string';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isIJsonSummary = (value: Record<string, any>): value is IJsonSummary => {
  return Object.keys(value).length > 0 && value.total;
};
