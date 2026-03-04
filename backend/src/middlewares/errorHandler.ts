import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'AppError';
    }
}

/**
 * Middleware xử lý lỗi tập trung
 */
export function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            statusCode: err.statusCode,
        });
        return;
    }

    console.error(' Lỗi không xác định:', err);
    res.status(500).json({
        success: false,
        message: 'Lỗi hệ thống nội bộ',
        statusCode: 500,
    });
}
