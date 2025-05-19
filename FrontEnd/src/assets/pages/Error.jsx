import { Link } from "react-router";

function Error() {

  return (
    <>
      <div className="error">
        <h2>404</h2>
        <p> Wtf la page existe pas ????? </p>
        <Link to="/">Retour à l'acceuil </Link>
      </div>
    </>
  )
}

export default Error;