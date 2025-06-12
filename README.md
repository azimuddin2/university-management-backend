# 📌 University Management System - Back-end Development

## 🚀 MERN Stack Development

## Requirement Analysis 
[https://docs.google.com/document/d/1sNFXugfCr2LVGcnHKM7_jRgX1J-SP1ixmmytJZfz5I8/edit?tab=t.0]

## Entity-Relationship Diagrams
<img alt="Coding" width="100%" src="erdiagram.png"/>

### 🛠️ Technologies Used
- **Node.js** - JavaScript runtime for building scalable applications.
- **Express.js** - Web framework for building RESTful APIs.
- **Mongoose** - ODM for MongoDB, handling data modeling and validation.
- **TypeScript** - Strongly typed JavaScript for better maintainability.

---

## ✅ Project Setup
1. **Initialize Express Server**
2. **Set Up Import/Export Module System**
3. **API Testing with Postman**
4. **Environment Variables & .gitignore Configuration**
5. **Create README.md File**
6. **Follow Modular Pattern in Software Architecture**

---

## ✅ Database Setup
- **Connect to MongoDB Atlas** (Cloud-based) or **MongoDB Compass** (Local).

---

## ✅ User API
### 🔖 User Model & Validation
- Define user Schema with validation rules.
- Implement user creation validation.
- Set up user routes and controllers.

### 📌 User API Endpoints
1. **Create a user**  
   `POST /api/users/register`
   - Validate request body.
   - Check if user already exists.
   - Save user and send response.

2. **Get All users (with Search & Filters)**  
   `GET /api/users`
   - Retrieve users from database.
   - Implement search functionality using regex.
   - Send response.

3. **Get a Single user**  
   `GET /api/users/:id`
   - Retrieve user by ID.
   - Handle Mongoose Cast error if ID is invalid.
   - Send appropriate response.

4. **Delete a user**  
   `DELETE /api/users/:id`
   - Find user by ID and delete.
   - Handle Mongoose Cast error.
   - Send response based on success/failure.

5. **Update a user**  
   `PUT /api/users/:id`
   - Retrieve data from request body and params.
   - Apply updates using `findByIdAndUpdate`.
   - Return response after successful update.

---

## ✅ Auth API
### 🔖 Auth interface for auth api
- create auth validation
- create auth routes controller and service

### 📌 Auth API Endpoints
1. **User Login**  
   `POST /api/auth/login -> user login (D)`
   - middlewares: auth
   - extract request body
   - compare the password & return response
   - create jwt token with an expiry time

2. **Refresh Token**  
   `POST /api/auth/refresh-token -> crate a refresh token (D)`
   - create jwt refresh token with an expiry time
   - Send response.

---

## ✅ student API
### 🔖 student Model & Validation
- Define student Schema with validation rules.
- Implement student creation validation.
- Set up student routes and controllers.

### 📌 student API Endpoints
1. **Create a student**  
   `POST /api/students`
   - Validate request body.
   - Check if student already exists.
   - Save student and send response.

2. **Get All students (with Search, Filters & Pagination )**  
   `GET /api/students`
   - Retrieve students from database.
   - Implement search functionality, Filters & Pagination.
   - Send response.

3. **Get a Single student**  
   `GET /api/students/:id`
   - Retrieve student by ID.
   - Handle Mongoose Cast error if ID is invalid.
   - Send appropriate response.

4. **Delete a student**  
   `DELETE /api/students/:id`
   - Find student by ID and delete.
   - Handle Mongoose Cast error.
   - Send response based on success/failure.

5. **Update a student**  
   `PUT /api/students/:id`
   - Retrieve data from request body and params.
   - Apply updates using `findByIdAndUpdate`.
   - Return response after successful update.

---

## ✅ faculty API
### 🔖 faculty Model & Validation
- Define faculty Schema with validation rules.
- Implement faculty creation validation.
- Set up faculty routes and controllers.

### 📌 faculty API Endpoints
1. **Create a faculty**  
   `POST /api/facultys`
   - Validate request body.
   - Check if faculty already exists.
   - Save faculty and send response.

2. **Get All facultys (with Search, Filters & Pagination)**  
   `GET /api/facultys`
   - Retrieve facultys from database.
   - Implement search functionality & Filters & Pagination.
   - Send response.

3. **Get a Single faculty**  
   `GET /api/facultys/:id`
   - Retrieve faculty by ID.
   - Handle Mongoose Cast error if ID is invalid.
   - Send appropriate response.

4. **Delete a faculty**  
   `DELETE /api/facultys/:id`
   - Find faculty by ID and delete.
   - Handle Mongoose Cast error.
   - Send response based on success/failure.

5. **Update a faculty**  
   `PUT /api/facultys/:id`
   - Retrieve data from request body and params.
   - Apply updates using `findByIdAndUpdate`.
   - Return response after successful update.

---

- **Payment Integration:**
  - Stripe payment gateways.

---

## ✅ Required Packages
Install dependencies:
```sh
npm install express cors dotenv mongoose cookie-parser jsonwebtoken stripe zod bcrypt
```

Install development dependencies:
```sh
npm install --save-dev typescript ts-node-dev @eslint/js @types/cors @types/express @types/node @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-prettier globals prettier
```

---

## 📌 Folder Structure
```
📂 university-management-system
│-- 📂 src
│   ├── 📂 app
│   │   ├── 📂 modules
│   │   │   ├── 📂 student    
│   │   │   │   ├── student.constant.ts
│   │   │   │   ├── student.model.ts
│   │   │   │   ├── student.interface.ts
│   │   │   │   ├── student.routes.ts
│   │   │   │   ├── student.controller.ts
│   │   │   │   ├── student.service.ts
│   │   │   │   ├── student.validation.ts
│   │   │   ├── 📂 faculty      
│   │   │   │   ├── faculty.constant.ts
│   │   │   │   ├── faculty.interface.ts
│   │   │   │   ├── faculty.model.ts
│   │   │   │   ├── faculty.routes.ts
│   │   │   │   ├── faculty.controller.ts
│   │   │   │   ├── faculty.service.ts
│   │   │   │   ├── faculty.validation.ts
│   │   │   ├── 📂 course      
│   │   │   │   ├── course.constant.ts
│   │   │   │   ├── course.interface.ts
│   │   │   │   ├── course.model.ts
│   │   │   │   ├── course.routes.ts
│   │   │   │   ├── course.controller.ts
│   │   │   │   ├── course.service.ts
│   │   │   │   ├── course.validation.ts
│   │   │   ├── 📂 users       
│   │   │   │   ├── user.interface.ts
│   │   │   │   ├── user.model.ts
│   │   │   │   ├── user.routes.ts
│   │   │   │   ├── user.controller.ts
│   │   │   │   ├── user.service.ts
│   │   │   │   ├── user.validation.ts
│   │   │   ├── 📂 auth       
│   │   │   │   ├── auth.interface.ts
│   │   │   │   ├── auth.routes.ts
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.validation.ts
│   │   │   ├── 📂 payment       
│   │   │   │   ├── payment.interface.ts
│   │   │   │   ├── payment.model.ts
│   │   │   │   ├── payment.routes.ts
│   │   │   │   ├── payment.controller.ts
│   │   │   │   ├── payment.service.ts
│   │   │   │   ├── payment.validation.ts
│   │   │   ├── 📂 config
│   │   │   ├── 📂 errors
│   │   │   ├── 📂 middlewares
│   │   │   ├── 📂 utils
│   │   │   ├── 📂 routes
│   │   │   ├── 📂 constants
│   │   │   ├── 📂 interfaces
│   │   ├── app.ts
│   │   ├── server.ts
│   │-- .env
│   │-- package.json
│   │-- tsconfig.json
│   │-- README.md
```

---

## 📝 License
This project is licensed under the MIT License.

---

## 👨‍💻 Contributors
- **[MD. AZIM UDDIN]**

Feel free to contribute to improve this project! 🚀
