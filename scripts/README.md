# scripts/README.md
# Admin Scripts

This directory contains administrative scripts for managing the PandasDB application.

## Setup

1. Create a virtual environment (recommended):
```bash
python -m venv .venv
```

2. Activate the virtual environment:
```bash
# On Windows
.venv\Scripts\activate

# On MacOS/Linux
source .venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## Available Scripts

### create_demo_user.py

Creates or updates a demo user in the Cognito User Pool.

Usage:
```bash
python create_demo_user.py <user-pool-id>
```

Example:
```bash
python create_demo_user.py eu-west-1_abcd1234
```

Default demo user credentials:
- Email: user@test.com
- Password: Test123!

## AWS Credentials

Make sure you have AWS credentials configured. You can do this by either:

1. Using AWS CLI:
```bash
aws configure
```

2. Or setting environment variables:
```bash
export AWS_ACCESS_KEY_ID=your_access_key
export AWS_SECRET_ACCESS_KEY=your_secret_key
export AWS_DEFAULT_REGION=eu-west-1
```

3. Or creating a .env file in the scripts directory:
```
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_DEFAULT_REGION=eu-west-1
```
