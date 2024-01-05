import { Link } from "react-router-dom";
import "./UpdatePassword.css";
import { useState } from "react";
import { changePassword } from "../../apis/apiLogin";

function UpdatePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      changePassword(oldPassword, newPassword);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <div className="v-formLogin-container">
        <div className="v-formLogin-inner">
          <h1>Đổi mật khẩu</h1>
          <form>
            <div className="v-input-container">
              <span className="v-label">Mật khẩu cũ</span>
              <input
                value={oldPassword}
                className="v-input"
                placeholder="Mật khẩu cũ"
                type="password"
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="v-input-container">
              <span className="v-label">Mật khẩu mới</span>
              <input
                value={newPassword}
                type="password"
                placeholder="Mật khẩu mới"
                className="v-input"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div
              style={{
                justifyContent: "flex-end",
              }}
              className="v-formLogin-footer"
            >
              <Link to="/forgetPassword">Quên mật khẩu?</Link>
            </div>
            <button
              className="v-formLogin-button"
              onClick={(e) => handleSubmit(e)}
            >
              Đổi mật khẩu
            </button>
          </form>
          <Link
            style={{
              marginTop: "40px",
            }}
            to="/login"
          >
            Quay lại
          </Link>
        </div>
      </div>
    </div>
  );
}
export default UpdatePassword;
