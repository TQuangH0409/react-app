import React, { useState } from "react";
import "./ForgetPassword.css";
import { Link } from "react-router-dom";
import { forgetPassword } from "../../apis/apiLogin";
export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      forgetPassword(email);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login-container">
      <div className="v-formLogin-container">
        <div className="v-formLogin-inner">
          <h1>Quên mật khẩu</h1>
          <form>
            <div className="v-input-container">
              <span className="v-label">Email</span>
              <input
                value={email}
                className="v-input"
                placeholder="Nhập email..."
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              className="v-formLogin-button"
              onClick={(e) => handleSubmit(e)}
            >
              Gửi
            </button>
          </form>
          <Link
            style={{
              marginTop: "260px",
              textAlign: "center",
              display: "block",
            }}
            to="/login"
          >
            Trở lại
          </Link>
        </div>
      </div>
    </div>
  );
}
