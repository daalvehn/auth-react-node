import './App.css';
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import Welcome from './components/Welcome'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"

import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <ProtectedRoute path="/check">
          <Redirect exact from="/check" to="/content" />
          <Welcome />
        </ProtectedRoute>
        <Route path="/content">
          <Welcome />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
