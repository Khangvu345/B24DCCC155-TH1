import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

/**
 * Middleware validate request body bằng Zod schema
 */
export function validateRequest(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((e) => ({
                    field: e.path.join('.'),
                    message: e.message,
                }));

                res.status(400).json({
                    success: false,
                    message: 'Dữ liệu không hợp lệ',
                    errors: errorMessages,
                });
                return;
            }
            next(error);
        }
    };
}
