# Mail Module
Handles sending transactional emails such as OTP verification, Welcome emails, and other future email-related tasks.

## Purpose
Provides a centralized service for sending emails to users reliably. Currently supports OTP verification and Welcome messages, and can be extended for future email functionality.

## Responsibilities
- Send OTP emails for user authentication
- Send Welcome emails to new users
- Serve as the foundation for future email-related tasks

## Flow
1. Another module (e.g., Auth or User) triggers an email action
2. MailService generates the email content (OTP or Welcome template)
3. MailService sends the email via configured SMTP or email provider
4. Logs delivery status or retries if necessary

## Dependencies
- User module (for Welcome emails)
- External email provider (SMTP / SendGrid / etc.)

## Notes
- Designed as an internal service; no controller is exposed
- Future email types can be added easily without modifying core logic
- Centralized for maintainability and reliability
