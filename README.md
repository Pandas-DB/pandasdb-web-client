# PandasDB

A full-stack application for storing and managing pandas DataFrames with automatic versioning, chunking, and optimized storage patterns.

## Architecture Overview

### Frontend (React + TypeScript)
```
pandasdb-web-client/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Layout.tsx
│   │   └── APIStatusIndicator.tsx
│   ├── context/          # React context providers
│   │   └── AuthContext.tsx
│   ├── pages/            # Application routes
│   │   ├── DBs.tsx
│   │   ├── DBView.tsx
│   │   ├── Login.tsx
│   │   └── ResetPassword.tsx
│   ├── services/         # API integration
│   │   └── api.ts
│   └── fixtures/         # Mock data for development
│       └── data.ts
├── scripts/              # Admin utilities
│   ├── create_demo_user.py
│   ├── requirements.txt
│   └── README.md
└── public/              # Static assets
```

### Backend (AWS Serverless)
Serverless AWS infrastructure providing:
- API Gateway endpoints
- Lambda functions for data processing
- S3 storage with automatic chunking
- DynamoDB for metadata
- Cognito user authentication

## Getting Started

### Prerequisites
- Node.js ≥ 14.x
- Python 3.9+
- AWS Account
- AWS CLI configured

### Frontend Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pandasdb-web-client.git
cd pandasdb-web-client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
REACT_APP_API_URL=https://your-api-gateway-url.amazonaws.com
REACT_APP_COGNITO_USER_POOL_ID=your-user-pool-id
REACT_APP_COGNITO_CLIENT_ID=your-client-id
REACT_APP_AWS_REGION=eu-west-1
```

4. Start development server:
```bash
npm run dev
```

### Backend Deployment

1. Install Serverless Framework:
```bash
npm install -g serverless
```

2. Deploy the backend:
```bash
serverless deploy --stage dev --region eu-west-1
```

### Demo User Setup

1. Navigate to scripts directory:
```bash
cd scripts
```

2. Create virtual environment:
```bash
python -m venv .venv
source .venv/bin/activate  # On Unix/MacOS
# or
.venv\Scripts\activate     # On Windows
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create demo user:
```bash
python create_demo_user.py your-user-pool-id
```

Default demo credentials:
- Email: user@test.com
- Password: Test123!

## Features

### DataFrame Management
- Automatic versioning
- Chunked storage for large datasets
- Optimized storage patterns
- Version control with keep-last option

### Security
- Cognito authentication
- Per-user data isolation
- CORS protection
- Request validation

### User Interface
- Modern React components
- Dark mode design
- Responsive layout
- Real-time API status indicators

## API Endpoints

### Upload DataFrame
```http
POST /dataframes/upload
```

Parameters:
- `dataframe`: CSV or JSON data
- `dataframe_name`: Storage path
- `columns_keys`: Partitioning configuration
- `external_key`: Version identifier
- `keep_last`: Version retention flag

### Get DataFrame
```http
GET /dataframes/{name}
```

Parameters:
- `name`: DataFrame path
- `external_key`: (optional) Version filter
- `use_last`: (optional) Latest version flag

## Storage Patterns

### Version Control Structure
```
bucket/
└── {dataframe_name}/
    └── external_key/
        └── default/
            ├── YYYY-MM-DD/
            │   └── HH:MM:SS_{chunk_uuid}.csv.gz
            └── last_key.txt
```

## Development

### Running Tests
```bash
# Frontend tests
npm test

# Backend tests
python -m pytest
```

### Local Development
```bash
# Frontend
npm run dev

# Backend
serverless offline start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support:
- Open an issue
- Contact maintainers
- Check documentation

## Acknowledgments

- AWS Serverless Framework
- Pandas Development Team
- React and TypeScript communities
- Contributors
