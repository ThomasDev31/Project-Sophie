import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "../styles/Login.css";
import "../styles/contact.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, []);

    async function submit(e) {
        try {
            e.preventDefault();
            const response = await fetch(
                "http://localhost:5678/api/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            );

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                navigate("/");
            } else {
                alert("Email ou mot de passe incorrect");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function resetPassword() {}

    return (
        <div className="login">
            <h1 className="title">Login</h1>
            <form className="form">
                <div className="input">
                    <input
                        className="email"
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input">
                    <input
                        className="password"
                        type="password"
                        placeholder="Mot de passe"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    className="button-connexion"
                    onClick={submit}
                    type="submit"
                >
                    Login
                </button>
            </form>
            <a onClick={resetPassword}>Mot de passe oublié</a>
        </div>
    );
}

export default Login;
