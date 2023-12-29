import { useState } from "react";
import axiosData from "../../apis/axiosData";
import Input from "../../components/Input/input";
import "./FormLogin.css";
import { login } from "../../apis/apiLogin";
import { useNavigate } from "react-router-dom";
function FormLogin({ errorLogin = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="container-custom">
      <div className="v-formLogin-container">
        <div className="v-formLogin-inner">
          <h1>Đăng nhập</h1>
          <Input
            label={"Email"}
            placeholder={"Example@gmail.com, Example@sis.hust.edu.vn"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <Input
            label={"Mật khẩu"}
            placeholder={"Nhập mật khẩu"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          {errorLogin && (
            <div>
              <span>
                Tài khoản của bạn bị khóa do đăng nhập sai 5 lần liên tiếp
              </span>
              <br />
              <span>
                Vui lòng đăng nhập lại 30 phút sau hoặc liên hệ admin để được hỗ
                trợ
              </span>
            </div>
          )}

          <div className="v-formLogin-footer">
            <div className="v-formLogin-footer-left">
              {" "}
              <input type="checkbox" />
              <span>Duy trì đăng nhập</span>
            </div>
            <a href="">Quên mật khẩu?</a>
          </div>

          <button
            className="v-formLogin-button"
            onClick={() => {
              login(email, password);
              navigate("/student");
            }}
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormLogin;
