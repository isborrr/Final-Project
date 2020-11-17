import React, { useState } from "react";
import { Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import stopsign from "../images/stop.jpg";
import updateLogo from "../images/updateLogo.png";
import ViewTheList from "./ViewTheList";
import Profile from "./profile";
function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [thisdisplay, setDisplay] = useState("block");
  //useState to diplay form after click on catch and filter
  const [filterdisplay, setFilterDisplay] = useState("none");
  //useState to diplay viewList after click on view
  const [viewThelistdisplay, setViewDisplay] = useState("none");
  //useState to disply or hide userDashboardInfo
  const [dashInfodisplay, setdashDisplay] = useState("block");
  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <div className="p-containt">
        <Card>
          <Card.Body className="color">
            <h2 className=" text-center mb-4">Welcome</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <strong>Email:</strong> {currentUser.email}
            <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
              Update Profile{" "}
              <img src={updateLogo} className="updateLogo" alt="logo"></img>
            </Link>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2 ">
          <Button
            className=" btn-outline-danger"
            variant="link"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </div>
      </div>
      <div className="d-flex stopAndjunk mx-auto ">
        <img src={stopsign} className="logoStop mx-auto" alt="stop sign"></img>
      </div>
      <div className="profileDisplay" style={{ display: filterdisplay }}>
        <Profile />
      </div>
      <div className="viewThelist" style={{ display: viewThelistdisplay }}>
        <ViewTheList />
      </div>
      <div className="forSmalScren">
        <div className="userDashboardInfo" style={{ display: dashInfodisplay }}>
          <h3 className="DashBoardHeader">
            Your mailbox is not their garbage bins
          </h3>
          <p className="m-2">
            <strong>
              Because we believe that you have a right to privacy,
            </strong>{" "}
            our company put forward all the technologies available to ensure
            that you get a voice and power over the life you want to have. When
            you upload a Junk mail, we compare with the complaints from other
            users and quickly identify the bad guys.
          </p>
          <li>At first, we request them to immediately stop.</li>
          <li>
            If they continue, our team of lawyers take responsibility and bring
            these people to the court{" "}
          </li>
        </div>
      </div>
      <div
        className="w-100 text-center mt-2 mb-4"
        style={{ display: thisdisplay }}
      >
        <Button
          onClick={() => {
            setFilterDisplay("block");
            {
              setdashDisplay("none");
            }
          }}
        >
          Catch and filter
        </Button>
      </div>
      <div
        className="w-100 text-center mt-2 viewButton"
        style={{ display: dashInfodisplay }}
      >
        <Button
          onClick={() => {
            setdashDisplay("none");
            {
              setViewDisplay("block");
            }
          }}
        >
          View list
        </Button>
      </div>
    </>
  );
}
export default Dashboard;

///// Link as to=strig(to/Link)
