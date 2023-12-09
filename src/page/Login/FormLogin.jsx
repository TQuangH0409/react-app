import Input from "../../components/Input/input";
import "./FormLogin.css";
function FormLogin({ errorLogin = false }) {
  return (
    <div>
      <div className="v-formLogin-container">
        <div className="v-formLogin-inner">
          <h1>Đăng nhập</h1>
          <Input label={"Email"} placeholder={"Example@gmail.com"} />

          <Input label={"Mật khẩu"} placeholder={"Nhập mật khẩu"} />

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
