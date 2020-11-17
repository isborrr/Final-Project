import React, { Component } from "react";
import firebase from "firebase";
import app from "../firebase";

class ViewTheList extends React.Component {
  constructor(props) {
    super(props);
    //original state
    this.state = {
      displayInfo: [],
    };
  }
  componentDidMount() {
    // Create a copy array based on current state:
    let copyDisplayInfo = [...this.state.displayInfo];

    /// getting data from firebase real time database
    this.app = app;
    this.firebase = this.app.database().ref("Todo").orderByKey();
    this.firebase.once("value").then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var key = childSnapshot.key;
        console.log("the key is", key);
        // childData will be the actual contents of the child
        var companyNameData = childSnapshot.child("theCompanyName").val();
        var companyAdressData = childSnapshot.child("theCompanyAdress").val();
        var companyEmailData = childSnapshot.child("theCompanyEmail").val();
        var companyNumbData = childSnapshot.child("theCompanyPhoneNumb").val();
        // var companyPictData = childSnapshot.child("theCompanyPicture").val();                                                                                     ///////
        console.log("the value type is", companyNameData);
        // create an object skeleton to be polpulated by the retreived datas and pushed
        //to the display info array in the constructor
        let temp = {
          name: companyNameData,
          adress: companyAdressData,
          email: companyEmailData,
          numb: companyNumbData,
          pict: { picUrl: "", picId: "" },
          id: key,
        };

        //pushing the data to the Copydisplayinfo
        // Add item to it
        copyDisplayInfo.push(temp);
        // Set state
        this.setState({ displayInfo: copyDisplayInfo });
        console.log("the array is", this.state.displayInfo);
        var listRef = app.storage().ref().child("images");
        // Find all the prefixes and items.
        listRef
          .listAll()
          .then((res) => {
            res.prefixes.forEach((folderRef) => {
              // All the prefixes under listRef.
              // You may call listAll() recursively on them.
            });
            let i = 0;
            res.items.forEach((itemRef) => {
              // All the items under listRef.
              console.log(
                "this is comming back for the storage",
                itemRef.toString()
              );

              displayImage(i, itemRef);

              console.log("what is i", i);
              i++;
            });
          })
          .catch(function (error) {
            console.log("Uh-oh, an error occurred!", error);
          });
      });
    });
    // getting image data from firebase strorage
    //////                                                                                        /////
    /////1111
    // var listRef = storageRef.child('files/uid');

    // function to get the https format of itemRef it is call inside the above function
    function displayImage(i, images) {
      images.getDownloadURL().then((url) => {
        console.log("this is Url", url);
        //  let j = this.state.displayInfo.lenght;
        console.log("second copy", copyDisplayInfo);
        copyDisplayInfo[i].pict.picUrl = url;
        //  this.setState({ displayInfo[i].pict.picUrl:url});
      });
    }
  }
  render() {
    const copyDisplayInfo = this.state.displayInfo;
    return (
      <ul className="d-flex flex-wrap ">
        {copyDisplayInfo.map((comp) => (
          <div className="companyDetails" key={comp.id}>
            <li className="listContaint">
              <div className="rectangleWithInfo">
                <div className="">
                  <img
                    src={comp.pict.picUrl}
                    className="pic"
                    alt="logo"
                    className="companyPic"
                  />
                </div>
                <div className="cardInformation">
                <div className="companyName m-2 ">{comp.name}</div>
                <div className="companyAdress m-2">{comp.adress}</div>
                <div className="companyEmail m-2">{comp.email}</div>
                <div className="companyNumber m-2">{comp.numb}</div>
                <div className="complainNumber mt-2">200 Complaints</div>
                </div>
              </div>
            </li>
          </div>
        ))}
      </ul>
    );
  }
}
export default ViewTheList;

