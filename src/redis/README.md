# Redis Module
Handles caching for the application, including user online status and OTP storage.

## Purpose
Provides a centralized caching layer using Redis to:
- Track which users are currently online
- Store OTPs temporarily for verification

## Responsibilities
- Store and manage OTPs for authentication (time-limited)
- Track online/offline user status
- Provide fast access for modules like Chat, Notification, and Auth

## Flow
1. When a user logs in or connects via WebSocket, their online status is stored in Redis
2. Modules like Chat or Notification check Redis to see if a user is active
3. OTPs are stored temporarily in Redis with expiration

## Usage Examples
- Track active users: `SET user:online:{userId} true EX 300`  
- OTP caching: `SET otp:{userId} 123456 EX 300`  

## Dependencies
- Chat module (to check online status before sending messages)

## Notes / Key Decisions
- Redis keys are short-lived to ensure data consistency and reduce memory usage
- Serves as a central caching layer for any module that requires fast access
