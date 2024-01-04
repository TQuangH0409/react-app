import { Link } from "react-router-dom";
import Input from "../../components/Input/input";
import "./UpdatePassword.css";

function UpdatePassword() {
  return (
    <div className="login-container">
      <div className="v-formLogin-container">
        <div className="v-formLogin-inner">
          <h1>Đổi mật khẩu</h1>
          <form>
            <div className="v-input-container">
              <span className="v-label">Mật khẩu cũ</span>
              <input
                // value={email}
                className="v-input"
                placeholder="Mật khẩu cũ"
                type="password"
                // onChange={handleEmailChange}
                // icon={icon}
              />
            </div>

            <div className="v-input-container">
              <span className="v-label">Mật khẩu mới</span>
              <input
                // value={password}
                type="password"
                placeholder="Mật khẩu mới"
                className="v-input"
                // onChange={handlePasswordChange}
                // icon={icon}
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
              // onClick={(e) => handleSubmit(e)}
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
