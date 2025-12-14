# 🍰 Sweet Management System

A full-stack **Sweet Shop Management System** built using the **MERN stack**, supporting **role-based access (Admin & User)**, **wallet payments**, **cart functionality**, and **inventory management**.

---

## 📌 Features

### 👤 User Features
- User authentication (Login / Signup)
- Browse sweets with:
  - Name search
  - Category filter
  - Price range filter
- Add sweets to cart
- Wallet system (add money & pay)
- Purchase sweets using wallet balance
- View cart and proceed to payment

---

### 🛠 Admin Features
- Admin authentication
- Add new sweets (with image upload)
- Update sweet details
- Delete sweets
- Restock sweets
- View all available sweets
- Role-protected admin dashboard

---

## 🔑 Admin Signup Instructions

To **register as an Admin**:

1. Go to the **Signup page**
2. Fill in all required details
3. Enter the following **Admin Key**:
  123456
  ⚠️ Without this key, the account will be created as a **normal user**.

  ## 🧰 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router DOM
- Context API

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Multer (Image Upload)

---

## ⚙️ Local Setup Instructions

### 1️⃣ Clone the Repository
git clone <your-public-repo-link>
cd Sweet_Management_System

🔧 Backend Setup
cd Backend
npm install

 Run Backend
npm run dev


### Backend will run on:

http://localhost:5000

###🎨 Frontend Setup
cd frontend
npm install
npm run dev


### Frontend will run on:

http://localhost:5173

### 🔐 Protected Routes

The following routes are protected using authentication and authorization:

Route	Access
/dashboard	Logged-in users
/cart	Logged-in users
/payment	Logged-in users
/admin	Admin only

Unauthorized users are automatically redirected.

### 🖼 Screenshots

📸 Screenshots of the final application will be added here.

(Recommended screenshots)

Landing Page

User Dashboard

Admin Dashboard

Cart Page

Payment Page

### 🧪 Test Report
Manual Testing Summary
Feature	Status
User Authentication	✅ Passed
Admin Authentication	✅ Passed
Role-based Routing	✅ Passed
Wallet Transactions	✅ Passed
Cart Operations	✅ Passed
Sweet Purchase Flow	✅ Passed
Image Upload	✅ Passed
Input Validation	✅ Passed
### 🌍 Deployment

🚧 Deployment is not completed yet

The project currently runs locally only.

Planned Deployment

Frontend: Vercel / Netlify

Backend: Render / Railway / AWS

This will be added in a future update.

### 🤖 4. AI Usage Policy (Mandatory)
AI Tool Used

ChatGPT (OpenAI)

How AI Was Used

AI assistance was used for:

Boilerplate code generation

Debugging backend & frontend issues

API design guidance

UI enhancements

Cart & wallet logic structuring

Documentation support

Developer Responsibility

All AI-generated code was:

Reviewed thoroughly

Modified where required

Tested manually

The developer takes full responsibility for the final implementation.

🧾 AI Co-Authorship Compliance

For commits where AI tools were used, AI was credited as a co-author.

Example Commit Message
git commit -m "feat: complete sweet management system with cart and wallet

Used ChatGPT to assist with debugging, UI improvements, and API structure.
All code was reviewed and finalized manually.

Co-authored-by: ChatGPT <AI@users.noreply.github.com>"

###👨‍💻 Author

Aryan Mehta
Bachelor of Computer Science
Chandigarh University

