# SSRF_lab – MERN Stack Project

## 📌 Giới thiệu

**SSRF_lab** là một dự án web sử dụng **MERN Stack** (MongoDB, Express, React - Next.js, Node.js), được thiết kế đặc biệt để **mô phỏng lỗ hổng SSRF (Server-Side Request Forgery)**.

Đây là môi trường **thực hành an toàn** để nghiên cứu về cách:
1.  Khai thác lỗ hổng SSRF qua tính năng Upload Avatar/Image.
2.  Scan ports và dò tìm IP nội bộ thông qua SSRF.
3.  Hiểu cơ chế phản hồi lỗi của Backend để trích xuất thông tin.

---

## 📚 Documentation
*   [📖 Kiến trúc hệ thống (Architecture)](./ARCHITECTURE.md)
*   [🛠️ Danh sách API (API Reference)](./API.md)

---

## ⚙️ Yêu cầu môi trường

*   **Node.js**: v18.20.8 trở lên
*   **MongoDB**: Local hoặc MongoDB Atlas (Cloud)
*   **Git**: Để quản lý mã nguồn

---

## 🚀 Hướng dẫn cài đặt & chạy dự án

### 1️⃣ Tạo file môi trường (.env)

Trong thư mục `backend`, tạo file `.env` (xem file mẫu `.env.example` nếu có):

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ssrf_lab
JWT_SECRET=your_jwt_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend Configuration
NEXT_PUBLIC_BACKEND_API=http://localhost:5000
```
> ⚠️ **Lưu ý**: Đảm bảo `MONGODB_URI` đang trỏ tới đúng database của bạn.

---

### 2️⃣ Cài đặt dependencies

Chạy lệnh cài đặt cho cả backend và frontend:

```bash
# Cài đặt cho Backend
cd backend
npm install

# Cài đặt cho Frontend
cd ../frontend
npm install
```

---

### 3️⃣ Chạy dự án

Khởi động đồng thời cả Backend và Frontend:

```bash
# Terminal 1: Chạy Backend
cd backend
npm run dev
# Server lắng nghe tại: http://localhost:5000

# Terminal 2: Chạy Frontend (Next.js)
cd ../frontend
npm run dev
# Ứng dụng chạy tại: http://localhost:3000
```

---

### 4️⃣ Khởi tạo dữ liệu mẫu (Seeding)

Để có dữ liệu test ngay lập tức (Users, Posts...), hãy chạy script seed:

```bash
cd backend
npm run seed
```

---

## 🛡️ Kịch bản tấn công SSRF

Dự án này chứa các điểm yếu cố ý tại:
1.  **Update Avatar**: `PUT /api/v1/users/update/avatar`
2.  **Update Cover**: `PUT /api/v1/users/update/cover`

**Cách khai thác:**
*   Sử dụng Burp Suite hoặc Postman để intercept request khi cập nhật ảnh.
*   Thay đổi tham số `profilePicture` hoặc `coverImage` thành các URL nội bộ như:
    *   `http://localhost:22` (Kiểm tra SSH server)
    *   `http://localhost:80` (Kiểm tra Web server)
    *   `http://169.254.169.254/latest/meta-data/` (Nếu chạy trên AWS)
*   Quan sát phản hồi lỗi từ server để xác định trạng thái Port (Open/Closed/Filtered).

---

## 🧪 Mục đích sử dụng

*   **Giáo dục**: Học cách phát hiện và khai thác SSRF trong môi trường kiểm soát.
*   **Nghiên cứu**: Phân tích mã nguồn Node.js để hiểu nguyên nhân gây ra SSRF.
*   **Thực hành**: Bài tập cho các khóa học an toàn thông tin, CTF.

---

## ⚠️ Cảnh báo pháp lý

Dự án này CHỈ DÀNH CHO MỤC ĐÍCH GIÁO DỤC.
Tuyệt đối **KHÔNG** sử dụng mã nguồn hoặc kỹ thuật này để tấn công hệ thống thực tế mà không được phép.
Người sử dụng chịu hoàn toàn trách nhiệm về hành động của mình.

---
© 2024 DEVSCL Lab
