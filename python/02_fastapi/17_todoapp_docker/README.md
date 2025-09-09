# FastAPI Todo App - Dockerized

## Overview

This project is a FastAPI-based Todo application featuring JWT authentication and role-based authorization, containerized with Docker and MongoDB.

---

## **1. Building and Running FastAPI with MongoDB Using Docker (manually)**

This is the "low-level" way before we use Docker Compose.

### **Step 1: Build Docker image**

Inside the project root where your `Dockerfile` is located, run:

```sh
docker build -t fastapi-todo .
```

> This creates an image named `fastapi-todo` from your `Dockerfile`.

---

### **Step 2: Create a Docker network**

We need a common network so FastAPI and MongoDB can talk to each other:

```sh
docker network create todo_network
```

---

### **Step 3: Run MongoDB container**

```sh
docker run -d --name mongodb --network todo_network -p 27017:27017 -v mongo_data:/data/db mongo:latest
```

This starts MongoDB:

* Runs detached (`-d`)
* Joins `todo_network`
* Persists data in a Docker volume `mongo_data`

---

### **Step 4: Run FastAPI container**

```sh
docker run -d --name fastapi_todo --network todo_network -p 8000:8000 -e MONGO_URL=mongodb://mongodb:27017/fastapi_db -e SECRET_KEY=mysecretkey -e ALGORITHM=HS256 -e ACCESS_TOKEN_EXPIRE_MINUTES=30 fastapi-todo
```

This starts your FastAPI app:

* Runs detached (`-d`)
* Joins the same network (`todo_network`)
* Talks to MongoDB using the container name `mongodb` (internal DNS resolution in Docker network)

Now you can open:

-  `http://localhost:8000/docs` to test the API.

---

## **2. Using Docker Compose (simpler way)**

Instead of running separate commands, we use `docker-compose.yml` (the one you already wrote).

### **Step 1: Build and start services**

```sh
docker-compose up --build -d
```

This will:

* Build your `fastapi-todo` image
* Start both `fastapi` and `mongo` containers
* Automatically create a network for them
* Expose ports (`8000` for FastAPI, `27017` for Mongo)

---

### **Step 2: Check running containers**

```sh
docker ps
```

You should see `fastapi_todo` and `mongodb`.

---

### **Step 3: Stop services**

```sh
docker-compose down
```

This stops and removes the containers but **keeps the volume (`mongo_data`)**, so your MongoDB data persists.

If you also want to remove volumes:

```sh
docker-compose down -v
```

---

## **Key Difference**

* **Manual way**: You create network, run MongoDB, run FastAPI, pass env vars manually.
* **Docker Compose way**: Single command to bring up/down services. Automatically handles networks and environment variables.

---