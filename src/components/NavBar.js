import React, { useRef, useState } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import app from "../firebase";


export default function NavBar() {
  const searchRef = useRef();
  const [nameResult, setName] = useState("");
  const [foundDisplay, setDisplay] = useState("none");
  const [notFoundDisplay, setNdisplay] = useState("none");

  function refreshPage() {
    window.location.reload(false);
  }

  //initiate find to false
  let find = false;
  //  search function
  function handleSearch() {
    let searchImput = searchRef.current.value;
    console.log("The search input is " + searchRef.current.value);

    /// getting data from firebase real time database

    const todoRef = app.database().ref("Todo").orderByKey();
    todoRef.once("value").then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        // key will be "ada" the first time and "alan" the second time
        let value = childSnapshot.child("theCompanyName").val();
        console.log("The CompanyName to push is " + value);
        if (value === searchImput) {
          // if find , find=true
          find = true;
        }
      });
      if (find === true) {
        setName(searchImput);
        setDisplay("block");
        setTimeout(function () {
          setDisplay("None");
          searchRef.current.value =""
        }, 4000);
        console.log("i Foud it");
      } else if (find === false && searchImput !== "") {
        setName(searchImput);
        setNdisplay("block");
        setTimeout(function () {
          setNdisplay("None");
          searchRef.current.value =""
        }, 4000);
        console.log("not Foud it");
      }
    });
  }
  return (
    <Navbar bg="" variant="blue" className="nav justify-content-end">
      <Navbar.Brand href="#home" onClick={refreshPage}>
        Home
      </Navbar.Brand>
      <Popup
        trigger={<Nav.Link href="#Testimony">Testimonies</Nav.Link>}
        className="mt-4"
      >
        <div className="text-warning ">
          <strong>Very Usefull</strong> since I start using this app, my mailbox
          got cleaner thank guys!!!!!!
        </div>
        <div className="text-success mt-2">
          <span>Unbelievable , This app stoped all the junk mails. Great</span>
        </div>
      </Popup>
      <Form inline>
        <FormControl
          type="text"
          placeholder="Type Mail details here"
          className="mr-sm-2"
          ref={searchRef}
        />
        <Button
          variant=""
          className="btn btn-outline-primary"
          onClick={handleSearch}
        >
          Search
        </Button>
      </Form>
      <div className="searchResult" style={{ display: foundDisplay }}>
        <h3>{nameResult}</h3>
        is already in our watchlist.
      </div>
      <div className="searchResult2 " style={{ display: notFoundDisplay }}>
        <h3>{nameResult}</h3>
        <p> is not in our watchlist.</p>
        <p> Enter the information to be catch and filter</p>
        <p>Thank you</p>
      </div>
    </Navbar>
  );
}
