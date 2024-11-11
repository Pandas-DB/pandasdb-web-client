#!/bin/bash

# Build the React application
npm run build

# Create deployment package
zip -r deploy.zip . -x "node_modules/*" ".git/*"