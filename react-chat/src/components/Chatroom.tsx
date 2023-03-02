import {  useState } from 'react';
import { Button } from 'react-bootstrap';
import { getFirestore, collection, addDoc, Timestamp  } from 'firebase/firestore';
import { FIREBASE_CONFIG } from "../constants/firebase";
import { initializeApp } from "firebase/app";
import GetMessages from './getMessages';

const app = initializeApp(FIREBASE_CONFIG);
const db = getFirestore(app);


function Chatroom(props: {user: string}) {

    const [inputValue, setInputValue] = useState("");

    const onInput = (event:any) => setInputValue(event.target.value);
    const onSubmit = (event: any) => {
        event.preventDefault();
        
        addDoc(collection(db, "messages"), {
            createdAt:  Timestamp.fromDate(new Date()),
            text: inputValue,
            user: props.user
        });

       setInputValue("");
    };

 
  return (
    <>
        <GetMessages user={props.user} />
        <form id="form" onSubmit={onSubmit}>
            <input id="input" autoComplete="off" value={inputValue} onInput={onInput} />
            <Button  type="submit" variant="secondary">Send</Button>
        </form>    
    </>
  )
}

export default Chatroom;