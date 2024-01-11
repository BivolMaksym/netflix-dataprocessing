# netflix-dataprocessing
This is repository for period 2 year 2 assignment
# How to run
1. Open the folder in IDE, navigate to netflix-dataprocessing folder (cd netflix-dataprocessing).
2. type "npm install"
3. navigate to src
4. type "node server.js"
5. 

Routes for signing up, logging in and checking the authentication.

    Signing up - "http://localhost:3000/auth/signup" Expects JSON body :
    {
    "username": "",
    "password": "",
    "role": "user" (default)
    }
    Login - "http://localhost:3000/auth/login" Expects JSON body:
    {
    "username": "",
    "password": ""
    }
    Login returns JWT token in JSON body which is used for the next route
    Protected page - "http://localhost:3000/auth/protected" Expects Bearer Token
    Auth > Bearer Token

