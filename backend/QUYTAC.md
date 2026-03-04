# Backend NodeJS - Cấu Trúc & Naming Convention

Dự án này sử dụng kiến trúc **Modular Layered Architecture**. Mỗi tính năng/bài tập được chia thành một module riêng biệt để dễ bảo trì và mở rộng.

##  1. Folder Naming
Sử dụng **kebab-case** (chữ thường, phân cách bằng dấu gạch ngang) cho tất cả các thư mục.
- ✅ Đúng: `quan-ly-de-thi`, `bai-tap-3`, `middlewares`, `validations`
- ❌ Sai: `QuanLyDeThi`, `BaiTap3`, `MiddleWares`

##  2. File Naming
Sử dụng **camelCase** kết hợp với **hậu tố loại file** (file type suffix) để dễ dàng tìm kiếm.
- **Cú pháp:** `tênTínhNăng.loạiFile.ts`
- ✅ **Routes:** `monHoc.route.ts`, `deThi.route.ts`
- ✅ **Controllers:** `monHoc.controller.ts`, `deThi.controller.ts`
- ✅ **Services:** `monHoc.service.ts`, `deThi.service.ts`
- ✅ **Models:** `monHoc.model.ts`, `deThi.model.ts`
- ✅ **Validations:** `monHoc.validation.ts`

##  3. Code Naming

### Classes & Interfaces (Models, Types)
Sử dụng **PascalCase** (Viết hoa chữ cái đầu của mỗi từ).
- ✅ Đúng: `class MonHocController`, `interface IDeThi`, `class KhoiKienThucService`

### Functions & Variables (Hàm & Biến)
Sử dụng **camelCase** (Viết thường chữ cái đầu, viết hoa chữ cái đầu các từ tiếp theo). Động từ đứng trước cho hàm.
- ✅ Đúng: `getMonHocById`, `createDeThi`, `studentList`, `isQuestionValid`

### Constants & Environment Variables (Hằng số & Biến môi trường)
Sử dụng **UPPER_SNAKE_CASE** (Viết hoa toàn bộ, phân cách bằng dấu gạch dưới).
- ✅ Đúng: `PORT`, `DB_HOST`, `MAX_QUESTIONS_PER_EXAM`

##  4. Data Flow
Luồng đi của một request chuẩn trong hệ thống:
1. `Router` nhận Request -> Chuyển qua `Validation Middleware` (nếu có).
2. `Router` gọi `Controller`.
3. `Controller` nhận dữ liệu (`req.body`, `req.params`), gọi `Service`.
4. `Service` xử lý logic nghiệp vụ, gọi `Model`.
5. `Model` truy vấn Database và trả data về `Service`.
6. `Service` trả kết quả về `Controller`.
7. `Controller` format lại Response (`res.status(200).json(...)`) và trả về cho Client.