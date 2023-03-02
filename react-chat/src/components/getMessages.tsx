import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getFirestore, collection, limit, query, orderBy } from 'firebase/firestore';
import { FIREBASE_CONFIG } from "../constants/firebase";
import { initializeApp } from "firebase/app";

const app = initializeApp(FIREBASE_CONFIG);
const db = getFirestore(app);


function GetMessages(props: {user: string}) {
    type Message = {
        user?: string;
        text?: string;
        createdAt?: Date;
      };
      
    const msgRef = collection(db, "messages");
    const msgQuery = query(msgRef, orderBy("createdAt", "desc"), limit(10));
    const [messages, loading, error] = useCollectionData<Message>(msgQuery);

    if(error){
        console.log(error);
    }
    
    return (
        <>
        {loading ? (
                <div>Loading...</div>
            ) : (
                <ul id="messages">
                    {messages?.slice(0).reverse().map((value: any, index: number) => {
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
        </>
    )
}

export default GetMessages;