# Client Frontend README

**Demo URL**: [http://minhnguyen28.workspace.opstech.org:8082](http://minhnguyen28.workspace.opstech.org:8082)

## Giới thiệu

Đây là ứng dụng client-frontend của dự án Intern. Nó cung cấp giao diện cho người dùng cuối (khách hàng) kết nối với Backend API.

## Mục lục

- [Yêu cầu](#yêu-cầu)
- [Cài đặt và chạy trên máy local](#cài-đặt-và-chạy-trên-máy-local)

  - [1. Clone repository](#1-clone-repository)
  - [2. Cài đặt dependencies](#2-cài-đặt-dependencies)
  - [3. Chạy ứng dụng](#3-chạy-ứng-dụng)

- [Chạy bằng Docker Compose](#chạy-bằng-docker-compose)
- [Các lệnh thường dùng](#các-lệnh-thường-dùng)
- [Thay đổi cấu hình](#thay-đổi-cấu-hình)
- [License](#license)

## Yêu cầu

- Node.js v20+
- npm hoặc Yarn
- Docker (nếu muốn chạy container)

## Cài đặt và chạy trên máy local

### 1. Clone repository

```bash
git clone https://github.com/your-org/intern-client-frontend.git
cd intern-client-frontend
```

### 2. Cài đặt dependencies

```bash
npm install
# hoặc
# yarn install
```

### 3. Chạy ứng dụng

```bash
npm run dev
# hoặc
# yarn dev
```

Mở trình duyệt và truy cập `http://localhost:3000` (port mặc định có thể khác: tham khảo console).

## Các lệnh thường dùng

- `npm run dev` - Chạy dev server với hot reload
- `npm run build` - Xây dựng gói production vào thư mục `dist`
- `npm run preview` - Xem thử bản build production
- `npm run lint` - Kiểm tra linting

## Thay đổi cấu hình

- Cấu hình Vite nằm ở `vite.config.ts`.
- Thông tin API endpoint (backend) được cấu hình qua biến môi trường `VITE_API_URL`, ví dụ:

  ```bash
  export VITE_API_URL=http://localhost:8080
  ```

## License

MIT License
