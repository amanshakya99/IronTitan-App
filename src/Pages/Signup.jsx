import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import "../styles/Auth.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signUp({
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
  // Pass variant="signup" so AuthLayout applies the signup background image
  <AuthLayout variant="signup">
    <form onSubmit={handleSignup} className="auth-form">
      <h1 className="auth-title">Create Account</h1>

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

      <button className="signup-button" disabled={loading}>
        {loading ? "Creating..." : "Sign Up"}
      </button>

      <Link to="/login" className="auth-link">
        Already have an account? Login
      </Link>
    </form>
  </AuthLayout>
);
}