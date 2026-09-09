# GeMLY Compliance Workspace

This is a secure government procurement compliance platform built with Node.js, Express, and SQLite for local development and demo use.

## Setup

```bash
npm install
npm start
```

Then open:

```text
http://localhost:3000
```

## Database

The SQLite schema is defined in `schema.sql` and is initialized automatically when the server starts. The database stores users, firms, bids, compliance checks, documents, officer actions, and audit records.

## Security notes for production

This demo is intentionally limited to local development and should not be used as a production government system until the following are added:

- Real authentication and authorization with an approved government identity provider
- Encrypted document storage and secure file handling
- Secure external verification integrations for GST, debarment, and registry checks
- Strict file-upload validation and malware scanning
- Input validation and output sanitization
- Rate limiting and audit-friendly access logging
- HTTPS and proper secret management
- Database backups and immutable audit-log storage
- MFA or real OTP delivery for all officer identities
- Role-based access control and least-privilege design

## API overview

- `POST /api/auth/request-otp`
- `POST /api/auth/verify-otp`
- `GET /api/dashboard`
- `GET /api/bids`
- `GET /api/bids/:publicId`
- `POST /api/bids/:publicId/actions`
- `GET /api/audit`
- `GET /api/firms/:id/integrity`

## Demo authentication

For local development only, the OTP is fixed to `123456`.
