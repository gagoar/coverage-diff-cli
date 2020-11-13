import { NO_REGRESSION_COPY, REGRESSION_COPY } from './constants';

export const copyForRegression = (regression: boolean): string => (regression ? REGRESSION_COPY : NO_REGRESSION_COPY);
