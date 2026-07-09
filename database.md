// Sơ đồ cấu trúc cơ sở dữ liệu MongoDB (Database Schema)
// Dự án: Restaurant Booking & Management System

Table admins {
  _id ObjectId [pk, note: 'Primary Key']
  email varchar [unique, not null, note: 'Dùng làm tài khoản đăng nhập và nhận OTP']
  password varchar [not null, note: 'Mật khẩu đã hash bằng bcrypt']
  role varchar [default: 'admin']
  
  // Fields cho chức năng Quên mật khẩu
  resetOtp varchar [note: 'Lưu tạm mã OTP 6 số']
  resetOtpExpire timestamp [note: 'Thời gian hết hạn mã OTP (5 phút)']
  
  createdAt timestamp
  updatedAt timestamp

  indexes {
    email [unique, name: 'idx_email', note: 'Index để tìm kiếm tài khoản cực nhanh khi login/reset']
  }

  Note: 'Lưu trữ tài khoản quản trị viên, dùng email đăng nhập & reset mật khẩu bằng OTP'
}

Table products {
  _id ObjectId [pk]
  name varchar [not null, note: 'Tên món ăn']
  category varchar [not null, note: 'Enum: Starters, Main Courses, Desserts, Drinks']
  price number [not null, note: 'Giá món ăn (lưu số nguyên dương VNĐ)']
  image varchar [not null, note: 'URL ảnh trả về từ Cloudinary']
  description text [note: 'Mô tả nguyên liệu, hương vị']
  createdAt timestamp
  updatedAt timestamp

  indexes {
    category [name: 'idx_category', note: 'Index để lọc món theo danh mục ở trang Menu']
  }

  Note: 'Lưu trữ thực đơn món ăn cho trang Menu và Home'
}

Table blogs {
  _id ObjectId [pk]

  title varchar [not null, note: 'Tiêu đề bài viết']

  slug varchar [unique, not null, note: 'URL thân thiện']

  thumbnail varchar [not null, note: 'Ảnh đại diện bài viết']

  description varchar [null, note: 'Mô tả bài viết']

  sections json [not null, note: 'Danh sách các section của bài viết']

  createdAt timestamp

  updatedAt timestamp

  indexes {
    slug [unique, name: 'idx_slug']
  }

  Note: 'Lưu trữ bài viết Blog của nhà hàng'
}

Table reservations {
  _id ObjectId [pk]
  customerName varchar [not null, note: 'Tên khách đặt bàn']
  phone varchar [not null, note: 'Số điện thoại khách hàng (Chuỗi 10 số)']
  reservationTime date [not null, notes: Ngày giờ đặt bàn]
  guests number [not null, note: 'Số lượng khách (1 đến 50 người)']
  status varchar [default: 'pending', note: 'Enum: pending, confirmed, cancelled, completed']
  createdAt timestamp
  updatedAt timestamp

  indexes {
    (date, status) [name: 'idx_date_status', note: 'Index giúp Admin đếm nhanh đơn pending trong ngày']
  }

  Note: 'Lưu trữ đơn đặt bàn từ Form Client gửi về Dashboard Admin'
}