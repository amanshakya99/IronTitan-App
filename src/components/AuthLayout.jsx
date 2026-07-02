// Accept a `variant` prop ("login" or "signup") to apply the correct background class
export default function AuthLayout({ children, variant = "login" }) {
  return (
    // Dynamically applies either "login-bg" or "signup-bg" alongside "auth-container"
    <div className={`auth-container ${variant}-bg`}>
      <div className="auth-card">{children}</div>
    </div>
  );
}