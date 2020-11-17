import React from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import NavBar from "./NavBar";
function App() {
  return (
    <div className="background ">
      <div className="wrapper mb-4">
        <div className="topBar">
          <NavBar />
        </div>
        <Container
          className="container d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div>
           
            <Router>
              <AuthProvider>
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard} />
                  <PrivateRoute
                    path="/update-profile"
                    component={UpdateProfile}
                  />
                  <Route path="/signup" component={Signup} />
                  <Route path="/login" component={Login} />
                  <Route path="/forgot-password" component={ForgotPassword} />
                </Switch>
              </AuthProvider>
            </Router>
          </div>
          {/* /Route + component Viwe List */}
        </Container>
        <div className="foot"></div>
      </div>
    </div>
  );
}

export default App;
