import { ZodError } from 'zod';
import { RES_CODE } from '../constants/responseCode.constant.js';
import { formatResponse } from '../utils/response.util.js';

export const validateDto = (schema) => async (req, res, next) => {
  try {
    req.body = await schema.parseAsync(req.body);
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      const zodIssues = error.issues || error.errors || [];

      const errorMessage = zodIssues.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      return res.status(400).json(
        formatResponse(RES_CODE.VALIDATION_ERROR, 'Validation failed', {
          errors: errorMessage,
        }),
      );
    }
  }
};

export const validateParamsDto = (schema) => async (req, res, next) => {
  try {
    const validatedParams = await schema.parseAsync(req.params);
    req.params = validatedParams;
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      const zodIssues = error.issues || error.errors || [];
      const errorMessage = zodIssues.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return res.status(400).json(
        formatResponse(RES_CODE.VALIDATION_ERROR, 'Invalid route parameter.', {
          errors: errorMessage,
        }),
      );
    }
    return next(error);
  }
};

export const validateQueryDto = (schema) => async (req, res, next) => {
  try {
    const validatedQuery = await schema.parseAsync(req.query);
    req.validatedQuery = validatedQuery;
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      const zodIssues = error.issues || error.errors || [];

      const errorMessage = zodIssues.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      return res
        .status(400)
        .json(
          formatResponse(
            RES_CODE.VALIDATION_ERROR,
            'Invalid query parameters.',
            { errors: errorMessage },
          ),
        );
    }
    return next(error);
  }
};
