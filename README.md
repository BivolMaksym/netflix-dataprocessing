# netflix-dataprocessing
This is repository for period 2 year 2 assignment
## How to run the back-end
1. Open the folder in IDE, navigate to netflix-dataprocessing folder (cd netflix-dataprocessing).
2. type "npm install"
3. navigate to src
4. type "node server.js"
5. The back-end is hosted on port 3000
## How to run the front-end
1. Navigate to react-netflix-app in the same folder. (cd react-netflix-app)
2. type "npm install"
3. navigate to src (cd src)
4. type npm start
5. the back-end is hoted on port 4000, a browser should pop up.


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
    

