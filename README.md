# InternPost

InternPost is a web application designed to streamline the process of managing internship offers. Users can submit their internship details, while administrators can view, approve, or reject the submissions through an intuitive dashboard.

## ✨ Features
- **User Submission**: Students can upload internship offers with details and supporting documents.
- **Admin Review**: Admins can view, approve, or reject submitted offers.
- **Authentication**: Secure login and role-based access.
- **Responsive Design**: Built to perform seamlessly on all devices.

## 🛠️ Tech Stack
- **Frontend**: Angular, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## 📁 Folder Structure

### Frontend
```
InternPost/
├── src/
│   ├── app/
│   ├── assets/
│   ├── index.html
│   ├── main.ts
│   ├── styles.css
├── angular.json
├── tailwind.config.js
├── tsconfig.json
```

### Backend
```
backend/
├── config/
├── controller/
│   ├── authController.js
│   ├── errorController.js
│   ├── offerController.js
│   ├── userController.js
├── middleWare/
├── model/
├── route/
├── services/
├── app.js
├── server.js
├── package.json
```

## ⚡ Installation

1. **Clone the Repository**
```bash
git clone <your-repo-url>
cd InternPost
```

2. **Frontend Setup**
```bash
npm install
ng serve
```

3. **Backend Setup**
```bash
cd backend
npm install
npm run dev
```

> Make sure MongoDB is running and the connection URI is set in the backend `config` folder.
