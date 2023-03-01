import User from "./GenerateUser";

function Welcome() {
  return (
    <div>
        <p>
          Velkommen til Chatten
        </p>
        <div className="mt-0">
          <User />
        </div>
    </div>
  )
}

export default Welcome