import { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { getFirestore, collection, limit, query, orderBy } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { FIREBASE_CONFIG } from "../constants/firebase";
import { initializeApp } from "firebase/app";

const app = initializeApp(FIREBASE_CONFIG);
const db = getFirestore(app);



function Chatroom(props: {user: string}) {
    type Message = {
        user?: number;
        text?: string;
        createdAt?: Date;
      };
      
    const msgRef = collection(db, "messages");
    const msgQuery = query(msgRef, orderBy("createdAt", "asc"), limit(10));
    const [messages, loading, error] = useCollectionData<Message>(msgQuery);
 
  return (
    <Container>
        <ul id="messages">
        {messages?.map((value, index, array) => {
            return(
                <div key={index}>
                    <p >{value.user}: {value.text}</p>
                </div>)
            })}
        </ul>
        <form id="form" action="">
            <input id="input" autoComplete="off" />
            <Button variant="secondary">Send</Button>
        </form>
        
    </Container>
  )
}

export default Chatroom;