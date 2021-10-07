This is a basic node authentication api that allows users to register and authenticate them using username and password.
The auth middleware is where the main logic of this api lives. 
It provides two routes for authentication :
1) /register : allows user to register with a unique username and password. If user exists or password is too weak it sends the appropriate error as response.
2) /authenticate : allows user to authenticate themselves using their own username and password. If they dont match then a appropriate response is sent.
When a user registers the app stores the username and password as a key/value pair on the redis database.
The redis setup can be found in config/database.js.
The app uses express to handle requests and check-password-strength to check the strength of the password.

The approach
To create this api I first set up a redis server on my machine as a store of data and tried to figure out how to store the data.
Since I have never used redis before and all the info I could find on the web made me conclude that redis does not allow any sort of schema/table structure.
Hence I decided to go with the simple key/value pair approach using username as the key. 
I then set up my db configuration for node and tested if it was working.
The next step was creating endpoints for the api to listen at, using /auth as a middleware I created the /register and /authenticate routes.
Then I implemented the logic of both and tested it using Postman (a REST API platform that allows you to send requests to server).

To run this app
1) Set up redis on REDIS_HOST in .env (currently 127.0.0.1) and port (6379)
2) run npm start

Future development
To enhance security we can encrypt (hash) and save password and always compare hashed values.