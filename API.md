# API Documentation

## 👤 User

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/users/register` | Đăng ký người dùng mới | ❌ |
| `POST` | `/api/v1/users/login` | Đăng nhập | ❌ |
| `GET` | `/api/v1/users/me` | Lấy thông tin cá nhân | ✅ |
| `GET` | `/api/v1/users/userDetails/:userId` | Lấy thông tin người dùng khác | ❌ |
| `PUT` | `/api/v1/users/update/avatar` | Cập nhật ảnh đại diện (Có lỗ hổng SSRF) | ✅ |
| `PUT` | `/api/v1/users/update/cover` | Cập nhật ảnh bìa (Có lỗ hổng SSRF) | ✅ |

## 📝 Post

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/posts` | Tạo bài viết mới | ✅ |
| `GET` | `/api/v1/posts` | Lấy danh sách bài viết | ❌ |
| `GET` | `/api/v1/posts/:id` | Lấy chi tiết bài viết | ❌ |
| `POST` | `/api/v1/posts/:postId/like` | Like/Unlike bài viết | ✅ |

## 🤝 Friend Requests

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/friend-request/send` | Gửi lời mời kết bạn | ✅ |
| `POST` | `/api/v1/friend-request/accept` | Chấp nhận lời mời | ✅ |
| `DELETE` | `/api/v1/friend-request/reject` | Từ chối lời mời | ✅ |
| `GET` | `/api/v1/friend-request/friends` | Lấy danh sách bạn bè | ✅ |

> **Lưu ý:** Các endpoint yêu cầu Auth cần gửi kèm Header `Authorization: Bearer <token>`
