import { ZodError } from 'zod';

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

      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please check your input data.',
        errors: errorMessage,
      });
    }
  }
};

export const validateQueryDto = (schema) => async (req, res, next) => {
  try {
    const validatedQuery = await schema.parseAsync(req.query);

    for (const key of Object.keys(req.query)) {
      delete req.query[key];
    }

    Object.assign(req.query, validatedQuery);

    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      const zodIssues = error.issues || error.errors || [];

      const errorMessage = zodIssues.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      return res.status(400).json({
        success: false,
        message: 'Invalid query parameters.',
        errors: errorMessage,
      });
    }
    return next(error);
  }
};
