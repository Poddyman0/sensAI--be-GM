# SensAI Backend

Sens AI is a application that uses Artificial Intelligence to create lessons, create assessments and mark student assignments. 
# Skills: 
- SQL database.
- Express
- Node.JS.
- Jest.
- Socket.io
- Open AI

# Features: 
sensAI is a application that uses Artificial Intelligence to create lessons, create assessments and mark student assignments. The back end consists of a postgress SQL database. Express, written in Node.JS, is used to communicate with the database. Backend functionality was tested with Jest and Supertest. Socket.io is also used to facilitate communication between teachers and students. A API to Open AI is also used to produce assignments, make assignments and mark assignments. Firebase is used to authenticate user login when signing in.

This is a backend for a AI powered educational technology platform. The accompanying frontend can be found here:
https://github.com/Poddyman0/sensAI--FE-GM

# Instructions on how to run this project locally:
These instructions must be followed in order.

Backend:
Use the terminal to follow the following instructions. 
Clone this repo: "https://github.com/Poddyman0/sensAI--be-GM"
Then cd into to project directory "cd  sensAI--be-GM"
Then install dependencies using "npm install"
Then setup the database "npm run setup-dbs"
Then seed the databse using "npm run seed"
Then start the app using "npm start"

Frontend:
Use the terminal to follow the following instructions. 
Clone this repo: "https://github.com/Poddyman0/sensAI--FE-GM"
Then cd into the project directory "cd sensAI"
Then install dependencies using "npm install"
Then run the app using "npm run dev"
Go to “http://localhost:5173/login” in the browser.
Demonstration login details:
Student:
Email: user4.surname4@gmail.com
Password: qwerty
Teacher:
Email: user101.surname101@yahoo.com
Password: qwerty
