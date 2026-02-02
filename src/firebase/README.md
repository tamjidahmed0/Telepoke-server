# Firebase Module
Handles push notifications for the application.

## Purpose
Provides push notification support using Firebase Cloud Messaging (FCM) to notify users when they are offline or not actively using the app.

## Responsibilities
- Send push notifications to user devices
- Manage device tokens
- Trigger notifications for chat messages, OTPs, and system alerts

## Flow
1. User device registers and sends FCM token to backend
2. Token is stored against the user
3. When an event occurs (new message, OTP, etc.):
   - System checks if the user is online (via Redis)
   - If offline, Firebase push notification is sent
4. User receives notification on their device

## Usage Scenarios
- New 1-to-1 chat message when receiver is offline
- OTP notification
- Important system alerts


## Notes / Key Decisions
- Used only for push notifications (no analytics or crash reporting)
- Notifications are triggered only when users are offline
- Device tokens are kept up to date to ensure delivery
