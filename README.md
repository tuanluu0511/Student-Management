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

---

### Different way to handle navigation in Redux Saga

1. Watch redux store and make redirect on component
   const function App() {
   const loginSuccess = useAppSelector(state => state.auth.loginSuccess)
   useEffect(()=>{
   if(loginSuccess) {
   //redirect to admin page
   }
   },[loginSuccess])
   // ...
   }

--> Flow is fragment, hard to control when you have more and more state.

2. Using callbacks

- This approach using-serialize (callback) in action and dispatch to redux store which is NOT RECOMMENDED BY Redux Toolkit

const function App() {
const dispatch = useAppDispatch();

const handleLoginSubmit = (values)
=> {
dispatch(authActions.login({
...values,
onSuccess: () => history.push('/admin');
onError: () => console.log('Notify error to user')
}))
}
}

3. Using connected-react-router

- Sync routing to redux
- Navigate by dispatching an action to redux store.
- One thing to make sure, when route changes, it doesn't cause re-render our components.

=> Lib: connected-react-router/redux-first-history + custom history

4. Use createBrowserHistory from history

- Create file history.ts
  import { createBrowserHistory } from "history";
  export default createBrowserHistory();

In App.tsx we use component <Router history={history (file history mình vừa tạo ở trên)} /> của react-router dom bao bọc <Switch/>

Use history.push(url) in Saga.

---
