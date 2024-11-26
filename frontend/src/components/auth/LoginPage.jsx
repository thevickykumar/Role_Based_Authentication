import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await UserService.login(email, password);
      console.log(userData);
      if (userData.token) {
        localStorage.setItem('token', userData.token);
        localStorage.setItem('role', userData.role);
        navigate('/profile');
      } else {
        setError(userData.message);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  const navigateToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        New User?{" "}
        <span onClick={navigateToRegister} className="register-link">
          Register Here
        </span>
      </p>
    </div>
  );
}

export default LoginPage;
