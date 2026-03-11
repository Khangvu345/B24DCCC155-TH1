import { Request, Response, NextFunction } from 'express';
import { NhanVienService } from '../services/nhanVien.service';
import { nhanVienSchema, nhanVienUpdateSchema } from '../validations/nhanVien.validation';

export class NhanVienController {
    static getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = NhanVienService.getAll();
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const data = NhanVienService.getById(id);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static create(req: Request, res: Response, next: NextFunction) {
        try {
            const validatedData = nhanVienSchema.parse(req.body);
            const data = NhanVienService.create(validatedData);
            res.status(201).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const validatedData = nhanVienUpdateSchema.parse(req.body);
            const data = NhanVienService.update(id, validatedData);
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }

    static delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            NhanVienService.delete(id);
            res.json({ success: true, message: 'Xóa thành công' });
        } catch (error) {
            next(error);
        }
    }

    static login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ success: false, message: 'Vui lòng cung cấp email và mật khẩu' });
            }
            const data = NhanVienService.login(email, password);
            res.json({ success: true, ...data });
        } catch (error) {
            next(error);
        }
    }
}