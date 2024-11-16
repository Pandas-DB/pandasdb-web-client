import boto3
import os
import json
import sys
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables from .env file
load_dotenv(Path(__file__).parent / '.env')

def create_demo_user(user_pool_id, region=None):
    # Use region from environment variable if not provided
    if region is None:
        region = os.getenv('AWS_DEFAULT_REGION', 'eu-west-1')
    
    client = boto3.client('cognito-idp', region_name=region)
    
    # Demo user credentials
    email = "user@test.com"
    password = "Test123!"  # Make sure this meets the password requirements
    
    try:
        # Check if user exists
        try:
            client.admin_get_user(
                UserPoolId=user_pool_id,
                Username=email
            )
            print(f"User {email} already exists")
            
            # Set password even if user exists to ensure it's correct
            client.admin_set_user_password(
                UserPoolId=user_pool_id,
                Username=email,
                Password=password,
                Permanent=True
            )
            print("Password updated")
            return
            
        except client.exceptions.UserNotFoundException:
            # Create new user
            response = client.admin_create_user(
                UserPoolId=user_pool_id,
                Username=email,
                UserAttributes=[
                    {
                        'Name': 'email',
                        'Value': email
                    },
                    {
                        'Name': 'email_verified',
                        'Value': 'true'
                    }
                ],
                MessageAction='SUPPRESS'
            )
            
            # Set permanent password
            client.admin_set_user_password(
                UserPoolId=user_pool_id,
                Username=email,
                Password=password,
                Permanent=True
            )
            
            print(f"Created demo user: {email}")
            print("Password set successfully")
            
    except Exception as e:
        print(f"Error creating demo user: {str(e)}")
        sys.exit(1)

def main():
    if len(sys.argv) < 2:
        print("Usage: python create_demo_user.py <user-pool-id>")
        sys.exit(1)
        
    user_pool_id = sys.argv[1]
    region = os.getenv('AWS_DEFAULT_REGION')
    create_demo_user(user_pool_id, region)

if __name__ == "__main__":
    main()
