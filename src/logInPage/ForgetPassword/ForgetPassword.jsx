import Input from "../../components/Input/input";
import "./ForgetPassword.css";

function ForgetPassword() {
  return (
    <div>
      <div>
        <h1>Quên mật khẩu</h1>
        <span>
          Nhập tài khoản email đã đăng ký để chúng tôi gửi mã xác thực giúp
          reset mật khẩu cho bạn
        </span>
      </div>
      <Input />

      <button></button>
    </div>
  );
}
export default ForgetPassword;
