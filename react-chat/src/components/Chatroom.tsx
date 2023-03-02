import { useEffect, useState, useRef } from 'react';
import { Container, Button } from 'react-bootstrap';
import { getFirestore, collection, limit, query, orderBy, addDoc, doc, setDoc, Timestamp  } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { FIREBASE_CONFIG } from "../constants/firebase";
import { initializeApp } from "firebase/app";


const app = initializeApp(FIREBASE_CONFIG);
const db = getFirestore(app);


function Chatroom(props: {user: string}) {

    type Message = {
        user?: string;
        text?: string;
        createdAt?: Date;
      };
      
    const msgRef = collection(db, "messages");
    const msgQuery = query(msgRef, orderBy("createdAt", "desc"), limit(10));

    const [messages, loading, error] = useCollectionData<Message>(msgQuery);
    const [inputValue, setInputValue] = useState("");

    const onInput = (event:any) => setInputValue(event.target.value);
    const onSubmit = (event: any) => {
        event.preventDefault();
        console.log(props.user);
        console.log(inputValue);
        
        addDoc(collection(db, "messages"), {
            createdAt:  Timestamp.fromDate(new Date()),
            text: inputValue,
            user: props.user
        });

       setInputValue("");
    };

    if(error){
        console.log(error);
    }
 
  return (
    <>
        {loading ? (
                <div>Loading...</div>
            ) : (
                <ul id="messages">
                    {messages?.slice(0).reverse().map((value, index, array) => {
                        return(
                            <li key={index} className="msg-container d-flex">
                                {props.user === value.user ? (
                                    <div className="msg-username text-primary">{value.user} </div> 
                                ):(
                                    <div className="msg-username text-secondary">{value.user}: </div>
                                )}
                                <div className="msg-text ">{value.text}</div>
                            </li>)
                        })
                    }
                </ul>
            )}
        <form id="form" onSubmit={onSubmit}>
            <input id="input" autoComplete="off" value={inputValue} onInput={onInput} />
            <Button  type="submit" variant="secondary">Send</Button>
        </form>    
    </>
  )
}

export default Chatroom;