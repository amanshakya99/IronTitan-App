import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import "../styles/Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    navigate("/dashboard");
  };

  return (
  // Pass variant="login" so AuthLayout applies the login background image
  <AuthLayout variant="login">
    <form onSubmit={handleLogin} className="auth-form">
      <h1 className="auth-title">IronTitan</h1>

      <input
        type="email"
        placeholder="Email"
        className="auth-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="auth-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="auth-error">{error}</p>}

      <button className="login-button" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <Link to="/signup" className="auth-link">
        No account? Sign up
      </Link>
    </form>
  </AuthLayout>
);
}