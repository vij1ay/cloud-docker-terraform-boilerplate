# 🚀 Full-Stack Boilerplate: Docker + Terraform (AWS & Azure)

Boilerplate for building, running, and deploying a full-stack application using:

- 🐳 Docker & Docker Compose
- ⚙️ Terraform (Infrastructure as Code)
- ☁️ AWS & Azure (Free Tier Friendly)
- 🌐 Nginx (Reverse Proxy)
- ⚡ FastAPI (Backend)
- ⚛️ Node.js (Frontend)
- 🗄️ MongoDB (Database)

This repository is designed as a **learning-first, real-world template** for developers who want to understand:

> How modern applications are built, containerized, and deployed on cloud using Infrastructure as Code.

---

## 📌 Why This Repository Exists

Many tutorials show:

- Only Docker
- Only Terraform
- Only Cloud
- Only Hello World examples

This project combines **all of them together** in a realistic setup.

You will learn:

✅ How services talk to each other using Docker  
✅ How reverse proxy works  
✅ How to automate servers with Terraform  
✅ How to deploy without clicking in UI  
✅ How to stay inside Free Tier  

---

## 🏗️ Architecture Overview

```

Internet
↓
Nginx (Reverse Proxy)
↓
Frontend (Node.js)
↓
Backend (FastAPI)
↓
MongoDB

```

All services run using Docker Compose.

On cloud, everything runs inside a single VM.

---

## 📁 Project Structure

```

.
├── backend/          # FastAPI backend
├── frontend/         # Node.js frontend
├── nginx/            # Nginx config
├── mongo-init/        # MongoDB seed data
├── docker-compose.yml
└── terraform/
├── aws/           # AWS deployment
└── azure/         # Azure deployment

````

---

## 🧩 Tech Stack

| Layer     | Technology      |
|-----------|-----------------|
| Frontend  | Node.js / React |
| Backend   | FastAPI (Python)|
| Database  | MongoDB         |
| Proxy     | Nginx           |
| Infra     | Terraform       |
| Cloud     | AWS / Azure     |

---

## 🐳 Docker & Docker Compose

### Services

This project runs 4 services:

| Service  | Purpose |
|----------|----------|
| frontend | UI app |
| backend  | API server |
| mongo    | Database |
| nginx    | Reverse proxy |

Defined in:

```bash
docker-compose.yml
````

---

### Run Locally

Requirements:

* Docker
* Docker Compose

Start all services:

```bash
docker-compose up --build
```

Access app:

```
http://localhost
```

Stop:

```bash
docker-compose down
```

---

## 🔁 Service Communication

Inside Docker network:

| From     | To      | URL                                        |
| -------- | ------- | ------------------------------------------ |
| Frontend | Backend | [http://backend:8000](http://backend:8000) |
| Backend  | Mongo   | mongodb://mongo:27017                      |

Docker DNS handles this automatically.

---

## ⚙️ Environment Configuration

Frontend API URL is injected during build:

```dockerfile
ARG API_URL
ENV API_URL=$API_URL
```

Replaced in:

```ts
src/environments/environment.ts
```

---

## 🌍 Infrastructure as Code (Terraform)

Terraform is used to provision:

* Virtual Machines
* Networking
* Security Rules
* Public IP
* Docker Setup
* App Deployment

No manual cloud setup needed.

---

## ☁️ AWS Deployment

### Prerequisites

* AWS Account
* AWS CLI configured
* Terraform installed
* EC2 Key Pair

---

### Deploy to AWS

```bash
cd terraform/aws

terraform init
terraform plan
terraform apply
```

After deployment:

```bash
terraform output
```

Open the IP in browser.

---

### Destroy

```bash
terraform destroy
```

---

## ☁️ Azure Deployment

### Prerequisites

* Azure Account
* Azure CLI
* Terraform

Login:

```bash
az login
```

---

### Deploy to Azure

```bash
cd terraform/azure

terraform init
terraform apply
```

---

### Destroy

```bash
terraform destroy
```

---

## 🔐 Security Notes

This boilerplate is for learning.

In production:

❗ Restrict SSH IP
❗ Enable HTTPS
❗ Use secrets manager
❗ Use managed DB

---

## 📦 Free Tier Usage

Designed to stay within:

### AWS

* t2.micro / t3.micro
* 30GB EBS
* Single EC2

### Azure

* B1s VM
* Standard Storage

Avoid:

❌ Load Balancers
❌ NAT Gateway
❌ RDS / CosmosDB

---

## 🚀 CI/CD (Optional)

You can integrate:

* GitHub Actions
* AWS CodePipeline
* Azure DevOps

To enable auto-deploy on push.

---

## 🛠️ Common Commands

| Task  | Command                  |
| ----- | ------------------------ |
| Build | docker-compose build     |
| Start | docker-compose up -d     |
| Logs  | docker-compose logs      |
| Stop  | docker-compose down      |
| SSH   | ssh -i key.pem ubuntu@IP |

---

## 🧪 Debugging

Check containers:

```bash
docker ps
```

Logs:

```bash
docker logs backend
```

Shell inside container:

```bash
docker exec -it backend bash
```

---

## 📜 License

MIT License

Use freely for learning and projects.

---

## 👨‍💻 Author

Built and maintained by **Vijaya Raghavan**
Software Architect | Distributed Systems | Cloud | AI

---

## ⭐ If This Helped You

Star ⭐ the repo and share it.

It helps others find it.

```
