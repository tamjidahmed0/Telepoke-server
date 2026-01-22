# Telepoke Server

Server of the **Telepoke Chat Application** built with **NestJS**.  
Supports real-time chat, notifications, and push notifications using **Socket.io** with **Redis** for scalability.

## Features

- User authentication (JWT)
- One-to-one & group chat
- Real-time chat via Socket.io
- Redis for horizontal scaling
- Push notifications within Telepoke App
- Notification routes for read/unread messages

## Tech Stack

- NestJS (Node.js)
- MongoDB
- Socket.io + Redis
- JWT Authentication

## Requirements

- Redis instance 
- MongoDB

## Installation

1. Clone repository:

```bash
git clone https://github.com/tamjidahmed0/Telepoke-server.git
cd telepoke-server



Install dependencies:

npm install
# or
yarn install


Setup environment variables .env:

PORT=3000
DATABASE_URL=mongodb://localhost:27017/telepoke
JWT_SECRET=your_jwt_secret
REDIS_HOST=127.0.0.1
REDIS_PORT=6379


Run Server:

npm run start:dev
