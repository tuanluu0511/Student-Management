# Getting Started with Create React App

Setup project:
npx create-react-app my-app --template redux-typescript

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

## Available Scripts

### `npm start`

### `npm test`

### `npm run build`

# Mini Project - Student Management

react-router-dom
@types/react-router-dom

/login
/admin: layout

/admin/\*
feature: /admin/dashboard
feature: /admin/students

auth

- login
- sign up/ register
- forget password

CLICK LOGIN

- Call API to login
- Success --> redirect ADMIN
- FAILED --> Show ERROR

LOGIN
LOGOUT

authSaga
LOOP

- if logged in, watch LOGOUT
- else watch LOGIN
  /LOGIN

- call login API to get token + user info
- set token to local storage
- redirect to admin page

/LOGOUT

- clear token from local storage
- redirect to login page

authSlice: Action, reducer
authSaga: Effect
