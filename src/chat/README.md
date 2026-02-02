# Chat Module
Handles real-time messaging for users via Socket io and REST connections.

## Purpose
Provides chat functionality including message storage, live updates, and offline notifications.

## Responsibilities
- Handle REST APIs for chat history (CRUD operations)
- Manage Socket io connections and events
- Persist chat messages to database
- Trigger notifications for offline users via Firebase

## Flow
1. Client connects to Socket io gateway
2. User is authenticated via JWT guard
3. Incoming message is validated
4. Message is saved to database
5. Message is sent to the receiver
6. Offline users receive notifications via Notification module

## Socket Events
- send_message – sender sends message
- receive_message – receiver receives message

## Dependencies
- Redis (for tracking online/offline user status)
- Notification module (for offline alerts)
- Auth module (for JWT authentication)
