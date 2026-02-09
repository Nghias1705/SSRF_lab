# Architecture Overview

## 🏗️ System Design

Dự án **SSRF_lab** được xây dựng theo kiến trúc **Monorepo** với cấu trúc tách biệt Frontend và Backend, sử dụng **MERN Stack** (MongoDB, Express, React/Next.js, Node.js).

```mermaid
graph TD
    User[Client Browser] --> |HTTP/HTTPS| Frontend[Frontend (Next.js)]
    Frontend --> |REST API| Backend[Backend (Express.js)]
    Backend --> |Query| DB[(MongoDB)]
    Backend --> |External Request (SSRF)| Target[Internal/External Service]
```

---

## 🔧 Tech Stack

### Frontend (`/frontend`)
*   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
*   **Styling**: [TailwindCSS](https://tailwindcss.com/)
*   **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
*   **Authentication**: [NextAuth.js](https://next-auth.js.org/)
*   **HTTP Client**: [Axios](https://axios-http.com/)

### Backend (`/backend`)
*   **Runtime**: [Node.js](https://nodejs.org/)
*   **Framework**: [Express.js](https://expressjs.com/)
*   **Database**: [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
*   **Authentication**: JWT (JSON Web Token)
*   **File Upload**: Multer + Cloudinary (Optional)

---

## 🛡️ Security Lab Features

Hệ thống được thiết kế ĐẶC BIỆT để mô phỏng lỗ hổng **SSRF (Server-Side Request Forgery)**:

1.  **Avatar Update Logic**:
    *   Cho phép người dùng gửi URL hình ảnh.
    *   Backend sử dụng `axios` để fetch URL đó mà không kiểm tra kỹ lưỡng (Unrestricted URL Fetch).
    *   **Vulnerability**: Kẻ tấn công có thể thay URL bằng `http://localhost:port` hoặc các IP nội bộ để scan port hoặc truy cập metadata service (AWS/GCP/Azure).

2.  **Cover Image Logic**:
    *   Tương tự như Avatar, endpoint này cũng dễ bị khai thác SSRF.
    *   Error Handling (lộ thông tin): Backend trả về status code chi tiết của request failed, giúp attacker xác định port mở/đóng.

### Luồng dữ liệu SSRF
1.  Attacker gửi POST request cập nhật avatar với `profilePicture="http://localhost:22"`.
2.  Backend server thực hiện HTTP GET tới `localhost:22`.
3.  Nếu port 22 mở (SSH), server trả về phản hồi kết nối (thường là banner SSH).
4.  Backend nhận lỗi protocol (vì mong đợi HTTP nhưng nhận SSH banner) hoặc timeout.
5.  Attacker phân tích phản hồi lỗi để biết port 22 đang mở.
