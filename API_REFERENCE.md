# Sagarm Atelier - REST API Reference Specification

This document provides the complete API specification for backend developers integrating with the **Sagarm Atelier** (`sagarm.shop`) frontend application.

Base URL: `https://api.sagarm.shop/v1`

---

## Table of Contents
1. [Authentication & Account Endpoints](#1-authentication--account-endpoints)
2. [Product & Catalog Endpoints](#2-product--catalog-endpoints)
3. [Category Endpoints](#3-category-endpoints)
4. [Order & Checkout Endpoints](#4-order--checkout-endpoints)
5. [Admin Payment Verification Endpoints](#5-admin-payment-verification-endpoints)
6. [Coupons & Vouchers Endpoints](#6-coupons--vouchers-endpoints)
7. [Customer Reviews Endpoints](#7-customer-reviews-endpoints)
8. [File & Screenshot Upload Endpoints](#8-file--screenshot-upload-endpoints)

---

## 1. Authentication & Account Endpoints

### 1.1 Customer Registration
- **URL:** `/auth/register`
- **Method:** `POST`
- **Auth Required:** None (Public)
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "fullName": "e.g Sagar Ali",
  "email": "customer@sagarm.shop",
  "password": "SecurePassword123!",
  "phone": "+923001234567"
}
```
- **Response Body (201 Created):**
```json
{
  "status": "success",
  "message": "Account created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "usr-892102",
    "fullName": "Shahzaib Sagarm",
    "email": "customer@sagarm.shop",
    "phone": "+923001234567",
    "role": "customer"
  }
}
```
- **Error Responses:**
  - `400 Bad Request`: Email already registered.
  - `422 Unprocessable Entity`: Invalid phone number format.

---

### 1.2 Customer Login
- **URL:** `/auth/login`
- **Method:** `POST`
- **Auth Required:** None (Public)
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "email": "customer@sagarm.shop",
  "password": "SecurePassword123!"
}
```
- **Response Body (200 OK):**
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "usr-892102",
    "fullName": "Shahzaib Sagarm",
    "email": "customer@sagarm.shop",
    "phone": "+923001234567",
    "role": "customer"
  }
}
```

---

### 1.3 Admin Login Step 1: Initiate Credentials Verification
- **URL:** `/auth/admin/initiate-login`
- **Method:** `POST`
- **Auth Required:** None
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "email": "sagarshop.pk@gmail.com",
  "password": "AdminMasterSecretPassword123!"
}
```
- **Response Body (200 OK):**
```json
{
  "status": "otp_sent",
  "message": "6-digit OTP dispatched to admin email",
  "email": "sagarshop.pk@gmail.com",
  "expiresInSeconds": 120
}
```

---

### 1.4 Admin Login Step 2: Verify OTP
- **URL:** `/auth/admin/verify-otp`
- **Method:** `POST`
- **Auth Required:** None
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "email": "sagarshop.pk@gmail.com",
  "otp": "123456"
}
```
- **Response Body (200 OK):**
```json
{
  "status": "authenticated",
  "message": "Admin authenticated successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "usr-admin-master",
    "fullName": "Sagarm Master Admin",
    "email": "sagarshop.pk@gmail.com",
    "role": "admin"
  }
}
```
- **Error Responses:**
  - `400 Bad Request`: `{ "error": "Invalid OTP" }`
  - `410 Gone`: `{ "error": "OTP Expired" }`

---

## 2. Product & Catalog Endpoints

### 2.1 Get Products Catalog
- **URL:** `/products`
- **Method:** `GET`
- **Auth Required:** None
- **Query Parameters:** `category`, `subcategory`, `size`, `minPrice`, `maxPrice`, `sortBy`, `page`, `limit`
- **Response Body (200 OK):**
```json
{
  "status": "success",
  "total": 0,
  "page": 1,
  "limit": 12,
  "products": []
}
```

---

### 2.2 Create Product (Admin Only)
- **URL:** `/products`
- **Method:** `POST`
- **Auth Required:** Yes (Bearer Token, Role: `admin`)
- **Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Request Body:**
```json
{
  "name": "Imperial Velvet Sherwani",
  "category": "men",
  "subcategory": "sherwani",
  "price": 85000,
  "stock": 10,
  "images": [
    "https://storage.sagarm.shop/products/sherwani-1.jpg"
  ],
  "sizes": ["S", "M", "L", "XL"]
}
```
- **Response Body (201 Created):**
```json
{
  "status": "success",
  "product": {
    "id": "p-981230",
    "name": "Imperial Velvet Sherwani",
    "sku": "SGM-492",
    "price": 85000,
    "stock": 10,
    "images": ["https://storage.sagarm.shop/products/sherwani-1.jpg"]
  }
}
```

---

## 3. Category Endpoints

### 3.1 Get All Categories
- **URL:** `/categories`
- **Method:** `GET`
- **Auth Required:** None
- **Response Body (200 OK):**
```json
{
  "status": "success",
  "categories": []
}
```

---

## 4. Order & Checkout Endpoints

### 4.1 Create New Order
- **URL:** `/orders`
- **Method:** `POST`
- **Auth Required:** Yes (Bearer Token, Role: `customer`)
- **Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Request Body:**
```json
{
  "items": [
    {
      "productId": "p-981230",
      "quantity": 1,
      "size": "L",
      "price": 85000
    }
  ],
  "shippingAddress": {
    "fullName": "Shahzaib Sagarm",
    "phone": "+923001234567",
    "street": "Suite 402, Royal Fashion Tower, Gulberg III",
    "city": "Lahore",
    "postalCode": "54000",
    "country": "Pakistan"
  },
  "paymentMethod": "JazzCash",
  "paymentDetails": {
    "transactionId": "TRX-9823412389",
    "screenshotUrl": "https://storage.sagarm.shop/payments/proof-98123.jpg",
    "notes": "Paid via JazzCash App"
  },
  "total": 89250
}
```
- **Response Body (201 Created):**
```json
{
  "status": "success",
  "message": "Order created successfully",
  "order": {
    "id": "SGM-ORD-984210",
    "status": "Pending Verification",
    "total": 89250,
    "createdAt": "2026-07-22T12:00:00Z"
  }
}
```

---

### 4.2 Get Customer Orders
- **URL:** `/orders/my-orders`
- **Method:** `GET`
- **Auth Required:** Yes (Bearer Token)
- **Response Body (200 OK):**
```json
{
  "status": "success",
  "orders": []
}
```

---

## 5. Admin Payment Verification Endpoints

### 5.1 Approve Payment Proof
- **URL:** `/admin/payments/:orderId/approve`
- **Method:** `PATCH`
- **Auth Required:** Yes (Bearer Token, Role: `admin`)
- **Response Body (200 OK):**
```json
{
  "status": "success",
  "message": "Payment verified and order status updated to Confirmed",
  "orderId": "SGM-ORD-984210",
  "newStatus": "Confirmed"
}
```

---

### 5.2 Reject Payment Proof
- **URL:** `/admin/payments/:orderId/reject`
- **Method:** `PATCH`
- **Auth Required:** Yes (Bearer Token, Role: `admin`)
- **Response Body (200 OK):**
```json
{
  "status": "success",
  "message": "Payment rejected",
  "orderId": "SGM-ORD-984210",
  "newStatus": "Rejected"
}
```

---

## 6. Coupons & Vouchers Endpoints

### 6.1 Validate Coupon Code
- **URL:** `/coupons/validate`
- **Method:** `POST`
- **Auth Required:** Optional
- **Request Body:**
```json
{
  "code": "SAGARM10",
  "cartAmount": 25000
}
```
- **Response Body (200 OK):**
```json
{
  "valid": true,
  "code": "SAGARM10",
  "discountPercent": 10,
  "discountAmount": 2500
}
```

---

## 7. File & Screenshot Upload Endpoints

### 7.1 Upload Payment Screenshot Proof
- **URL:** `/upload/payment-screenshot`
- **Method:** `POST`
- **Auth Required:** Yes (Bearer Token)
- **Headers:** `Content-Type: multipart/form-data`
- **Request Form Data:** `file` (Image file: PNG, JPG, JPEG, max 5MB)
- **Response Body (200 OK):**
```json
{
  "status": "success",
  "fileUrl": "https://storage.sagarm.shop/uploads/payments/proof-98123.jpg"
}
```
