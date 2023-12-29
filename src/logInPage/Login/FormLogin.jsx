import React, { useState } from "react";
import Input from "../../components/Input/input";
import "./FormLogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FormLogin({ errorLogin = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [falseLogin, setFalseLogin] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const res = await axios.post(
        `http://35.213.168.72:8000/api/v1/auth/login`,
        {
          email: email,
          password: password,
        }
      );
      if (res) {
        const token = res.data.accessToken;
        localStorage.setItem("token", token);
        navigate('/info-teacher');
      }
      // Here, you can handle the form submission, e.g., call an authentication API
      // console.log({
      //   email,
      //   password,
      // });

      // Reset the form fields after submission if needed
      setEmail("");
      setPassword("");
    } catch (error) {
      setFalseLogin(true);
    }
  };

  return (
    <div>
      <div className="v-formLogin-container">
        <div className="v-formLogin-inner">
          <h1>Đăng nhập</h1>
          <form onSubmit={handleSubmit}>
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

            {falseLogin && (
              <div>
                <span>Tài khoản hoặc mật khẩu bị sai</span>
                <br />
                <span>
                  Vui lòng đăng nhập lại 30 phút sau hoặc liên hệ admin để được
                  hỗ trợ
                </span>
              </div>
            )}
            {errorLogin && (
              <div>
                <span>
                  Tài khoản của bạn bị khóa do đăng nhập sai 5 lần liên tiếp
                </span>
                <br />
                <span>
                  Vui lòng đăng nhập lại 30 phút sau hoặc liên hệ admin để được
                  hỗ trợ
                </span>
              </div>
            )}

            <div className="v-formLogin-footer">
              <div className="v-formLogin-footer-left">
                <input type="checkbox" />
                <span>Duy trì đăng nhập</span>
              </div>
              <a href="">Quên mật khẩu?</a>
            </div>

            <button className="v-formLogin-button" type="submit">
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormLogin;
