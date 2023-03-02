import { useState } from "react";
import './App.css';
import { Button } from "react-bootstrap";
import Welcome from "./components/Welcome";
import Chatroom from "./components/Chatroom";

function App() {
  const [user, setUser] = useState<string | null>();

  function logIn() {
    const selectedUser = document.querySelector(".username");
    setUser(String(selectedUser?.childNodes[0].nodeValue));
  }
  function logOut() {
    setUser(null);
  }

  return (
    <div className="App">
      <header className="App-header">
      {!user ? (
                <>
                  <Welcome />
                  <div className="mt-5">
                    <Button href="#" variant="primary" size="lg" onClick={logIn}>
                      Fortsett til Chatten 
                      <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16"> 
                         <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                      </svg>
                    </Button>
                  </div>
                </>
            ) : (
                <>
                  <div className="Chat-header d-flex justify-content-between">
                    <h1>Chatroom</h1>
                    <Button variant="dark" onClick={logOut}>Logout</Button>
                  </div>
                  <Chatroom user={user}/>
                </>
            )}
      </header>
    </div>
  );
}

export default App;
