# Playwright Testing Scripts for 2FA Authentication

These scripts demonstrate how to automate testing for 2FA (Two-Factor Authentication) using Playwright. The scripts cover scenarios such as logging in with credentials, setting up TOTP (Time-Based One-Time Password) authentication, and logging in with 2FA.

## Requirements

- Node.js
- Playwright
- dotenv

## Installation

1. Clone this repository:

```bash 
git clone https://github.com/Atharva7546/Beeceptor-2FA-Playwright.git
```

2. Navigate to the project directory:
```bash
cd Beeceptor-2FA-Playwright
```
3. Install Playwright
```bash
npm init playwright@latest
```
4. Install dependencies:
```bash
npm install
```
5. Set up your environment variables:
Create a .env file in the root directory and add the following:

```bash
email=your_email@example.com
password=your_password
```

## Usage
### Running the Tests
To run the tests, use the following command:
```bash
npm test
```

Scripts Overview : 
- Login: Logs into GitHub using provided credentials and saves the login session.
- Setting up QR code for TOTP: Sets up TOTP authentication on GitHub by taking a screenshot of the QR code, sending it to Beeceptor's 2FA API, and verifying the OTP.
- GitHub Login with 2FA: Logs into GitHub using 2FA by retrieving the TOTP from Beeceptor's API and submitting it for authentication.
