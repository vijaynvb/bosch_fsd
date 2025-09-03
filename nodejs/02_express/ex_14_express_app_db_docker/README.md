# Containerizing Node.js To-Do Service with Docker & MongoDB

## Introduction

In this module, we will:

* Write a **Dockerfile** to containerize our Node.js service.
* Build and run the Docker image.
* Use **Docker Compose** to run both the **To-Do service** and **MongoDB** together.

This ensures the application is portable, reproducible, and easy to deploy across environments.

---

## Step 1: Writing a Dockerfile

### `Dockerfile`

```dockerfile
# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your Node.js app listens on
EXPOSE 3000

# Command to run your Node.js application
CMD ["node", "index.js"]
```

**Explanation:**

* **`FROM node:18`** → Uses Node.js 18 official image.
* **`WORKDIR /usr/src/app`** → Sets working directory inside container.
* **`COPY package.json`** → Copies only package manifests for dependency caching.
* **`RUN npm install`** → Installs dependencies.
* **`COPY . .`** → Copies application code.
* **`EXPOSE 3000`** → Maps service to port `3000`.
* **`CMD ["node", "index.js"]`** → Starts the Node.js app.

---

## Step 2: Build & Run with Docker

### Build Image

```bash
docker build -t todoapp .
```

### Run Container

```bash
docker run -p 3000:3000 --name todoapp todoapp
```

* `-p 3000:3000` → Maps container port `3000` to host port `3000`.
* `--name todoapp` → Names the container `todoapp`.

Test it:

- [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## Step 3: Multi-Container Setup with Docker Compose

To run the **To-Do service + MongoDB**, we use `docker-compose.yaml`.

### `docker-compose.yaml`

```yaml
version: '3'
services:
  todoapp:
    container_name: todoapp
    image: todoapp
    ports:
      - '3000:3000'
    depends_on:
      - mongodb
    networks:
      - todo-network

  mongodb:
    container_name: mongodb
    image: mongo:latest
    ports:
      - '27017:27017'
    networks:
      - todo-network

networks:
  todo-network:
    driver: bridge
```

**Explanation:**

* `todoapp` → Runs our Node.js To-Do API.
* `mongodb` → Runs MongoDB database.
* `depends_on` → Ensures MongoDB starts before Node.js app.
* `todo-network` → Custom network for inter-container communication.

---

## Step 4: Build & Run with Docker Compose

### Build and Start Services

```bash
docker-compose up --build
```

### Run in Detached Mode

```bash
docker-compose up -d
```

### Stop Services

```bash
docker-compose down
```

---

## Key Takeaways

* Docker makes the app portable and environment-independent.
* Docker Compose allows running **multi-container applications** (API + Database).
* MongoDB is accessed by service name (`mongodb`) inside the Docker network.
* This setup is ready for **local development** and can be extended for **cloud deployment**.

---