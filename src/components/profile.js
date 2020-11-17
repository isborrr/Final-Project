import React, { useRef, useState } from 'react'

import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import app from '../firebase'
export default function Profile() {
    const nameRef = useRef()
    const stateRef = useRef()
    const adressRef = useRef()
    const phoneContactRef = useRef()
    const emailRef = useRef()
    const filelRef = useRef()
    // const { Profile } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    // const [count, setCount] = useState('');
    //usestate for file uploading
    const [image, setImage] = useState(null);
    // hide submit button after clicked 
    const [sutmitDisplay, setSutmiClicked] = useState('block');
    var companyInfo ={theName:" ",theAdress:" ",theContact:" ", theEmail:" ", theFile:"", theState:'' }
   async function handleSubmit(e){
        e.preventDefault()

        try{
        //  setError('')
        
         
         console.log("The name is "+nameRef.current.value)
         console.log("The adress is good "+adressRef.current.value)
         console.log("The contact is "+phoneContactRef.current.value)
         console.log("The email is "+emailRef.current.value)
        //  console.log("The picture is "+filelRef.current.value)
         // Assigning value to companyInfo
          companyInfo.theName = nameRef.current.value
          companyInfo.theAdress = adressRef.current.value
          companyInfo.theContact = phoneContactRef.current.value
          companyInfo.theEmail = emailRef.current.value
          companyInfo.theState = stateRef.current.value
        //   companyInfo.theFile = filelRef.current.value
          createtoDo();
          console.log("The companyInfo is "+companyInfo.theName)
        //   {setCount(`${count} ${companyInfo.theName} ${companyInfo.theFile}` )}
        } catch{     
            setError('Failed to upload info')
        }
        setLoading(false)
    }

// function to push changes in the database
        function createtoDo(){
            const todoRef = app.database().ref('Todo');
            const todo = {
                theCompanyName: nameRef.current.value,
                theCompanyAdress: adressRef.current.value,
                theCompanyPhoneNumb: phoneContactRef.current.value,
                theCompanyEmail: emailRef.current.value,
                theCompanyState: stateRef.current.value,
                // theCompanyPicture: filelRef.current
            };
        todoRef.push(todo);
        console.log("input was written")
     }
//function to upload picture
  const handleChange = () =>{
    // if (e.target.file[0]){
        try{
        setImage(filelRef.current.files[0]);
        } catch(error){console.log("this is and error",error)}
    // }
}
  const handleUpload = () =>{
    //   setImage(filelRef.current.files);
console.log("image is this name ",image);
    const uploadTask = app.storage().ref(`images/${image.name}`).put(image);  
          uploadTask.on(
            "stage_changed",
            snapshot => {},
            error =>{
                console.log(error);
            },
            () =>{
             app.storage()
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    console.log(url)
                });
            }
        )
}
    
//submit handler function 
          function submitHandler (){
            if(nameRef.current.value !==''&& adressRef.current.value !==''&& 
               stateRef.current.value !==''&& phoneContactRef.current.value!==''&& emailRef.current.value!==''){
                    handleUpload(); 
                    setSutmiClicked('none');
                    setTimeout(function(){ window.location.reload(true); }, 2000);
                }

        }

    return (  
// style={{  maxWidth: '400px'}}
        <div className="mx-auto" style={{display:sutmitDisplay}}> 
            <Card className="subitCard w-100 bg-secondary text-white" style={{ maxWidth: '400px'}}>
                <Card.Body >
                    <h2 className="text-center mb-4">Junk mail details</h2>
                     
                        {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="companyName">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control type="text" ref={nameRef} required />
                        </Form.Group>
                        <Form.Group id="companyAdress">
                            <Form.Label>Adress</Form.Label>
                            <Form.Control type="adress" ref={adressRef} required />
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" ref={stateRef} required />
                        </Form.Group>
                        <Form.Group id="phoneContact">
                            <Form.Label>Phone Contact</Form.Label>
                            <Form.Control type="adress" ref={phoneContactRef} required />
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <div className="custom-file">
                          <input type="file" className="custom-file-input " ref={filelRef} id="inputGroupFile01" 
                            aria-describedby="inputGroupFileAddon01" onChange={handleChange}/>
                          <label className="custom-file-label " >Upload a picture</label>
                        </div>
                        <Button disabled={loading}  onClick={submitHandler} className="w-100 mt-4" type="submit" >
                             Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

