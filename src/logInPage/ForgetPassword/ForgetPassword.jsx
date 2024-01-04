import React from "react";
import "./ForgetPassword.css";
import { Link } from "react-router-dom";
export default function ForgetPassword() {
  return (
    <div className="login-container">
      <div className="v-formLogin-container">
        <div className="v-formLogin-inner">
          <h1>Quên mật khẩu</h1>
          <form>
            <div className="v-input-container">
              <span className="v-label">Email</span>
              <input
                // value={email}
                className="v-input"
                placeholder="Nhập email..."
                type="password"
                // onChange={handleEmailChange}
                // icon={icon}
              />
            </div>

            <button
              className="v-formLogin-button"
              // onClick={(e) => handleSubmit(e)}
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
