## Google Forms Lite

A small web application for creating and filling out forms.
The project is inspired by the functionality of Google Forms and implements a basic form builder, response submission, and results viewing.


## Functionality

The application allows you to:
create forms
add questions
fill out forms
save responses
view user responses
Main pages:
Home — list of all forms
Create Form — create a new form
Fill Form — fill out a form
Responses — view responses


## Technologies

Frontend:

React

TypeScript

Vite

Redux Toolkit

RTK Query

React Router

Backend:

Node.js

Apollo Server

GraphQL


 ## Installation and launch
1.Clone the repository
git clone https://github.com/IlliaRomanuk/google-forms-lite.git
cd apps
cd web

frontend
npm install

backend
cd server
npm install

Project launch


## 1.Start the server
cd server
npm run dev

The server will be available:
http://localhost:4000/graphql


## 2. Start the frontend
cd client
npm run dev

The application will open:
http://localhost:5173


## GraphQL API
Main requests:
Obtain forms
query {
  forms {
    id
    title
  }
}

Create a form
mutation {
  createForm(title: "Test Form") {
    id
    title
  }
}

Send answers
mutation {
  submitResponse(formId: "1", answers: ["answer1"])
}


## Architecture

The project is built as a monorepo and contains:

- client — React application
- server — GraphQL API

The frontend communicates with the backend via GraphQL queries and mutations.
Data is stored in an in-memory store on the server.