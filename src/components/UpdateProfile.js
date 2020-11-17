import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase";
import logo from "../images/profileSymbol.png";


export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmDisplay, setDisplay] = useState("none");
  const history = useHistory();
  const [checked, setChecked] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failled to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  //fuction to delate the current user account
  async function handleDelation() {
    if (checked === true) {
      var user = firebase.auth().currentUser;
      console.log("delation working");
      user
        .delete()
        .then(function () {
          // User deleted.
        })
        .catch(function (error) {
          console.log("delation not working ", error);
        });
      console.log("is checked");
    } else {
      setDisplay("block");
      console.log("not checked");
    }
  }
  ///checkbox function to hundle state
  const handleCheck = () => setChecked(!checked);
  return (
    <>
      <Card className="bg-secondary text-white" style={{ minWidth: "400px" }}>
        <Card.Body>
          <img src={logo} className="profileSymbol" alt="logo"></img>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
            <Button
              disabled={loading}
              className="btn-danger w-15 mt-2"
              // type="submit"
              onClick={handleDelation}
            >
              Delete account
            </Button>
            <div>
              <label>
                <input
                  type="checkbox"
                  defaultChecked={checked}
                  onChange={handleCheck}
                />{" "}
                I want to delete my account
              </label>
            </div>
            <div className="deleteConfim" style={{ display: confirmDisplay }}>
              <h4>Please confirm before deletion!!!</h4>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
}
