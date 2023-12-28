import { useState } from "react";
import Input from "../../components/Input/input";
import "./FormLogin.css";
import axios from "axios"
function FormLogin({ errorLogin = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = async () => {
    const res = await axios.post(`http://35.213.168.72:6801/api/v1/auth/login`, {email: email, password: password})
  }

  return (
    <div>
      <div className="v-formLogin-container">
        <div className="v-formLogin-inner">
          <h1>Đăng nhập</h1>
          <Input label={"Email"} placeholder={"Example@gmail.com"} onChange={(e) => {
            setEmail(e.target.value);
          }}/>

          <Input label={"Mật khẩu"} placeholder={"Nhập mật khẩu"} onChange={(e) => {
            setPassword(e.target.value)};
          } />

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

          <button className="v-formLogin-button">Đăng nhập</button>
        </div>
      </div>
    </div>
  );
}

export default FormLogin;
