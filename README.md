# PandasDB Web Client

A modern React TypeScript web application for visualizing and managing pandas DataFrames stored in AWS. Built with React, TypeScript, and Tailwind CSS.

![PandasDB Interface](public/app-screenshot.png)

## Features

- 📊 DataFrame visualization and management
- 🔄 Real-time data synchronization
- 🌓 Dark mode interface
- 🔐 Cognito authentication
- 📱 Responsive design
- 🔌 Offline mode with fixtures

## Project Structure

```
pandasdb-web-client/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Layout.tsx
│   │   └── APIStatusIndicator.tsx
│   ├── context/          # React context providers
│   │   └── AuthContext.tsx
│   ├── pages/            # Application routes
│   │   ├── DBs.tsx       # DataFrame list view
│   │   ├── DBView.tsx    # DataFrame detail view
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

## Getting Started

### Prerequisites

- Node.js ≥ 14.x
- Python 3.9+ (for admin scripts)
- AWS Cognito User Pool

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pandasdb-web-client.git
cd pandasdb-web-client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the project root:
```env
REACT_APP_API_URL=https://your-api-gateway-url.amazonaws.com
REACT_APP_COGNITO_USER_POOL_ID=your-user-pool-id
REACT_APP_COGNITO_CLIENT_ID=your-client-id
REACT_APP_AWS_REGION=eu-west-1
```

4. Start the development server:
```bash
npm run dev
```

### Demo User Setup

For testing purposes, you can create a demo user:

1. Navigate to scripts directory:
```bash
cd scripts
```

2. Set up Python virtual environment:
```bash
python -m venv .venv
source .venv/bin/activate  # On Unix/MacOS
# or
.venv\Scripts\activate     # On Windows
```

3. Install script dependencies:
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

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run linting
npm run lint

# Format code
npm run format
```

## Development

### Using Fixtures

The application includes a fixture system for development without a backend:

1. Set environment variable:
```env
REACT_APP_USE_FIXTURES=true
```

2. The app will now use mock data from `src/fixtures/data.ts`

### Component Development

Components use Tailwind CSS for styling. Key conventions:

- Use Tailwind's utility classes
- Maintain dark mode compatibility
- Follow responsive design patterns
- Use shadcn/ui components when available

Example:
```tsx
const MyComponent = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-xl font-bold text-white">Title</h2>
    </div>
  );
};
```

## Authentication

The app uses AWS Cognito for authentication. Key files:

- `src/context/AuthContext.tsx`: Authentication context provider
- `src/pages/Login.tsx`: Login page implementation
- `src/services/api.ts`: API calls with auth headers

## API Integration

API calls are centralized in `src/services/api.ts`. Example usage:

```typescript
import { api } from '../services/api';

// Get DataFrame
const data = await api.getDataFrame('my-dataframe');

// Upload DataFrame
await api.uploadDataFrame({
  dataframe: myData,
  dataframe_name: 'new-dataframe'
});
```

## Building for Production

1. Update environment variables for production
2. Build the application:
```bash
npm run build
```
3. The build output will be in the `dist` directory

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Troubleshooting

Common issues and solutions:

1. **API Connection Issues**
   - Check `.env` configuration
   - Verify API Gateway URL
   - Check API Status Indicator

2. **Authentication Problems**
   - Verify Cognito credentials
   - Check browser console for errors
   - Ensure user is confirmed in Cognito

3. **Development Mode Issues**
   - Clear browser cache
   - Check Node.js version
   - Verify dependencies installation

## Support

For support:
- Open an issue on GitHub
- Check documentation
- Contact development team

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React Community
- Tailwind CSS Team
- shadcn/ui Components
- AWS Amplify Team
