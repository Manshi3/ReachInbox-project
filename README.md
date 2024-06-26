### ReachInbox-project

## Installation Setup:

# Prerequisites
1. Node.js and npm installed.
2. Redis installed(v5+).

# Clone the repository to your local machine
```
git clone https://github.com/Manshi3/ReachInbox-project.git
```

# Run the Application
1. Navigate to the root directory of the project directory
```
cd server
```
2. Install necessary dependencies
```
npm install express googleapis @google-cloud/tasks openai bullmq nodemailer dotenv
```
3. Create a .env file in this directory as follows:
```
PORT=3000
URL="http://localhost:3000"
OPENAI_API_KEY= ***
GOOGLE_CLIENT_ID = ***
GOOGLE_CLIENT_SECRET = ***
GOOGLE_REDIRECT_URI = URL+/google/auth/callback
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```
Change every variable accordingingly
5. Open your browser and navigate to http://localhost:3000.

## Usage:
# Home page:
1. Give an option to connect your google account.
