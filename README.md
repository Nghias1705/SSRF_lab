# SSRF_lab – MERN Stack Project

## 📌 Giới thiệu

SSRF_lab là một dự án web sử dụng **MERN Stack**, phục vụ cho mục đích **học tập và nghiên cứu bảo mật**, đặc biệt là lỗ hổng **SSRF (Server-Side Request Forgery)**.

---

## ⚙️ Yêu cầu môi trường

* **Node.js**: Cài bản v18.20.8
* **npm** hoặc **yarn**
* **MongoDB** (local hoặc MongoDB Atlas)

---

## 📂 Cấu trúc thư mục

```
SSRF_lab/
├── backend/
├── frontend/
└── README.md
```

---

## 🚀 Hướng dẫn cài đặt & chạy dự án

### 1️⃣ Tạo file môi trường (.env)

Trong thư mục `backend`, tạo file `.env` với nội dung sau:

```env
NEXT_PUBLIC_BACKEND_API=http://localhost:5000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=very_secret_key_12345
AUTH_SECRET=very_secret_key_12345
GOOGLE_CLIENT_ID=dummy-id
GOOGLE_CLIENT_SECRET=dummy-secret
```

> ⚠️ **Lưu ý bảo mật**
> Không commit file `.env` lên GitHub. Hãy đảm bảo file này đã được thêm vào `.gitignore`.

---

### 2️⃣ Cài đặt dependencies

Lần lượt cài đặt các package cho **backend** và **frontend**:

```bash
cd backend
npm install

cd ../frontend
npm install
```

---

### 3️⃣ Chạy dự án

Sau khi cài đặt xong, chạy lệnh sau để khởi động dự án:

```bash
npm run dev
```

* Backend chạy tại: **[http://localhost:5000](http://localhost:5000)**
* Frontend chạy tại: **[http://localhost:3000](http://localhost:3000)**

---

### 4️⃣ Tạo dữ liệu mẫu cho Database

Trong thư mục `backend`, chạy lệnh sau để tạo **user mẫu** trong database:

```bash
npm run seed
```

---

## 🧪 Mục đích sử dụng

* Học tập và nghiên cứu lỗ hổng **SSRF**
* Phân tích mã nguồn Backend / Frontend
* Phục vụ bài tập môn học, lab hoặc CTF

---

## 📎 Ghi chú

* Dự án chỉ phục vụ **mục đích học tập**, không khuyến nghị dùng trong môi trường production.
* Có thể mở rộng để thực hành các kỹ thuật bảo mật Web khác.

---
