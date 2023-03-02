import GetUser from "./GetUser";

function Welcome() {
  return (
    <div>
        <p>
          Velkommen til Chatten
        </p>
        <div className="mt-0">
          <GetUser />
        </div>
    </div>
  )
}

export default Welcome;