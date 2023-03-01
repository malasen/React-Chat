import { Container, Button } from 'react-bootstrap';

function Chatroom(props: {user: string}) {
  return (
    <Container>
        <ul id="messages"></ul>
        <form id="form" action="">
            <input id="input" autoComplete="off" />
            <Button variant="secondary">Send</Button>
        </form>
        
    </Container>
  )
}

export default Chatroom;