import React, { useEffect, useState } from "react";
import Input from "../../components/Input/input";
import "./FormLogin.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../apis/apiLogin";
import { Checkbox } from "antd";

function FormLogin({ errorLogin = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      if (localStorage.getItem("roles") === "SA") {
        navigate("/admin/list-student");
      } else if (localStorage.getItem("roles") === "T") {
        navigate("/teacher/info-teacher");
      } else {
        navigate("/student");
      }
      // Reset the form fields after submission if needed
    } catch (error) {
      alert("Tài khoản hoặc mật khẩu bị sai");
    }
  };

  return (
    <div className="login-container">
      <div className="v-formLogin-container">
        <div className="v-formLogin-inner">
          <h1>Đăng nhập</h1>
          <form>
            <div className="v-input-container">
              <span className="v-label">Email</span>
              <input
                value={email}
                className="v-input"
                placeholder="Email"
                onChange={handleEmailChange}
              />
            </div>

            <div className="v-input-container">
              <span className="v-label">Email</span>
              <input
                value={password}
                type="password"
                className="v-input"
                placeholder="Password"
                onChange={handlePasswordChange}
              />
            </div>

            <div style={{ marginTop: "20px" }}>
            </div>
            <div className="v-formLogin-footer">
              <Link to="/updatePassword">Đổi mật khẩu?</Link>

              <Link to="/forgetPassword">Quên mật khẩu?</Link>
            </div>

            <button
              className="v-formLogin-button"
              onClick={(e) => handleSubmit(e)}
            >
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormLogin;
