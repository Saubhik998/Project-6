# **Project-6: Image Upload App**  
_A full-stack application built with .NET 8 WebAPI and React, featuring image uploads stored in MongoDB GridFS._  
---

## **🚀 Features**
✅ Upload images with metadata  
✅ Store images in **MongoDB GridFS**  
✅ View uploaded images & details  
✅ Swagger documentation for API  
✅ **Dockerized deployment** for easy setup  

---

## **📂 Folder Structure**
```plaintext
Project-6/
│── backend/        # .NET 8 Web API (C#)
│── frontend/       # React.js Frontend
│── docker/         # Docker Compose and Dockerfiles
│── .github/        # GitHub Actions CI/CD
│── README.md       # Project documentation
│── .gitignore      # Git ignored files
│── docker-compose.yml # Container orchestration
```

---

## **🛠️ Tech Stack**
- **Frontend**: React.js (Vite)  
- **Backend**: .NET 8 Web API  
- **Database**: MongoDB (GridFS)   
- **Deployment**: Docker, GitHub Actions  
---

## **📌 Prerequisites**
Make sure you have the following installed:
- **Node.js (18+)**  
- **.NET SDK (8.0)**  
- **Docker & Docker Compose**  
- **MongoDB (Local or Cloud)**  

---

## **🖥️ Local Setup**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/Saubhik998/Project-6.git
cd Project-6
```

### **2️⃣ Backend Setup (.NET Web API)**
```sh
cd backend
dotnet restore
dotnet run
```
API will be available at: **`http://localhost:5035/swagger`**

### **3️⃣ Frontend Setup (React)**
```sh
cd frontend
npm install
npm run dev
```
Frontend will run on **`http://localhost:3000`**

---

## **🐳 Docker Setup**
### **Build & Run with Docker Compose**
```sh
docker-compose up --build
```
This will start **backend, frontend, and MongoDB containers**.

---

## **📜 API Documentation (Swagger)**
Once the backend is running, access Swagger docs:  
🔗 **http://localhost:5035/swagger**

---

## **🚀 CI/CD - GitHub Actions**
This project includes **GitHub Actions** workflows for:  
✅ **Continuous Integration (CI)** - Runs tests on push  
✅ **Continuous Deployment (CD)** - Builds & pushes Docker images to GHCR  

Workflows:  
- **`ci-react.yml`** - Runs unit tests for React  
- **`ci-dotnet.yml`** - Runs unit tests for .NET  
- **`cd-react.yml`** - Builds and pushes frontend Docker image  
- **`cd-dotnet.yml`** - Builds and pushes backend Docker image  

