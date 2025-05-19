import { Link } from "react-router";
import "../styles/footer.css";

function Footer() {
   
  return (
    <>
    <div className="copyright">
      <Link to='/copyrights'> Mentions Légales </Link>
    </div>
    </>
  )
}

export default Footer