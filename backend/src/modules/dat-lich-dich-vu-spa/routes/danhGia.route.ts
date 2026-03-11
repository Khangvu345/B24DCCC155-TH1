import { Router } from 'express';
import { DanhGiaController } from '../controllers/danhGia.controller';
import { validateRequest } from '../../../middlewares/validateRequest';
import { createDanhGiaSchema, phanHoiSchema } from '../validations/danhGia.validation';

const router = Router();

// QUAN TRỌNG: route tĩnh `/trung-binh/:nhanVienId` phải đặt TRƯỚC `/:id`
// để Express không nhầm "trung-binh" là một `:id`
router.get('/trung-binh/:nhanVienId', DanhGiaController.diemTrungBinh);

router.get('/', DanhGiaController.getAll);
router.get('/:id', DanhGiaController.getById);
router.post('/', validateRequest(createDanhGiaSchema), DanhGiaController.create);
router.patch('/:id/phan-hoi', validateRequest(phanHoiSchema), DanhGiaController.phanHoi);

export default router;