import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import Header from "./assets/layout/header.jsx";
import Footer from "./assets/layout/footer.jsx";
import Works from "./assets/pages/works.jsx";
import Login from "./assets/pages/login.jsx";
import Logout from "./assets/pages/logout.jsx";
import Contact from "./assets/pages/contact.jsx";
import Categories from "./assets/pages/categories.jsx";
import Copyrights from "./assets/pages/copyrights.jsx";
import Error from "./assets/pages/error.jsx";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Works />} />
                <Route path="/works" element={<Works />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/*" element={<Error />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
