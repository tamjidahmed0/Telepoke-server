# Notification Module
Handles delivery status updates for private 1-to-1 messages and broadcasts them to the sender in real-time via Socket io.

## Purpose
Ensures the sender sees message delivery status instantly for 1-to-1 messages, even if the recipient app is running in the background or offline.

## Responsibilities
- Track delivery status for all 1-to-1 messages
- Handle background REST API requests from recipient devices
- Broadcast `delivered` events only to the sender of the message via Socket io
- Queue notifications for offline recipients

## Flow
1. Recipient user app is running in the background (internet active)
2. Another user sends a 1-to-1 message to the recipient
3. Recipient app hits the `notification/delivered` REST route in the background
4. Notification module processes the delivery status
5. Socket io event `delivered` is sent **only to the sender**, confirming the message was delivered
6. Offline recipients are queued for later notifications

## Socket Events
- delivered – Notifies the sender that their 1-to-1 message has been successfully delivered

## Dependencies
- Redis (to track online users and their active socket connections)
- Chat module / gateway (for sending delivery updates)
- Auth module (to validate recipient and sender sessions)

## Notes / Key Decisions
- Background REST route allows recipient apps to notify the system without being in the foreground
- Socket io ensures the **sender** sees delivery status instantly
- Offline recipients are queued for future delivery or push notifications
- Designed strictly for 1-to-1 messaging — no group messages or broadcast rooms
