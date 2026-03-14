import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  //State för användarnamn
  const [username, setUsername] = useState("");
  //State för lösenord
  const [password, setPassword] = useState("");
  //State för felhantering
  const [error, setError] = useState<string | null>(null);

  const { login, user } = useAuth();
  const navigate = useNavigate();

  //Inloggad användare omdirigeras till admin
  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      //Försök logga in
      await login({
        login: username,
        password
      });

      //Vid lyckad inloggning, omdirigera till admin
      navigate("/admin");
    } catch (error) {
      setError("Inloggningen misslyckades. Kontrollera att du använt rätt användarnamn och lösenord.")
    }
  };

  return (
    <div>
      <h1>Logga in</h1>
      <form className="loginForm" onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <label htmlFor="username">Användarnamn:</label>
        <br />
        <input id="username" type="text" required value={username} onChange={(e) => setUsername(e.target.value)} />
        <br />
        <label htmlFor="password">Lösenord:</label>
        <br />
        <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="submit" className="loginBtn">Logga in</button>
      </form>
    </div>
  )
}

export default LoginPage
