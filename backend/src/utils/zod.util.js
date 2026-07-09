import { z } from 'zod';

export const zRequiredString = (fieldName) => {
  return z.string({
    error: (issue) =>
      issue.input === undefined
        ? `${fieldName} is required`
        : `${fieldName} must be a string`,
  });
};

export const zRequiredNUmber = (fieldName) => {
  return z.number({
    error: (issue) =>
      issue.input === undefined
        ? `${fieldName} is required.`
        : `${fieldName} must be a number.`,
  });
};
