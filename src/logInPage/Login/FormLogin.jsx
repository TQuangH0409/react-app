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
  const [falseLogin, setFalseLogin] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPassword = localStorage.getItem("rememberedPassword");

    if (rememberedEmail && rememberedPassword) {
      setEmail(rememberedEmail);
      setPassword(rememberedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
    console.log(rememberMe);
  };

  const handleSaveLogin = () => {
    if (rememberMe) {
      console.log(rememberMe + "123");

      localStorage.setItem("rememberedEmail", email);
      localStorage.setItem("rememberedPassword", password);
    } else {
      console.log(rememberMe + "456");
      // Clear stored values if "Remember Me" is not checked
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);

      // Save email and password to localStorage if "Remember Me" is checked
      await handleSaveLogin();

      if (localStorage.getItem("roles")[0] === "SA") {
        navigate("/student");
      } else if (localStorage.getItem("roles")[0] === "T") {
        navigate("/info-teacher");
      } else {
        navigate("/info-teacher");
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
                // icon={icon}
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
                // icon={icon}
              />
            </div>

            <div style={{ marginTop: "20px" }}>
              <Checkbox value={rememberMe} onChange={handleRememberMeChange}>
                Ghi nhớ tài khoản mật khẩu
              </Checkbox>
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
