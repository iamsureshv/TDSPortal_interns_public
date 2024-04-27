import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from './api';

export default function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        return isAuthenticated() === true ? (children) : (<Redirect to="/ddologin" />);
      }}
  />)
}
