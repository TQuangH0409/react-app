import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DefaultLayout from "./Layout/defaultLayout/Layout";
import { PublicRoutes, Login,updatePassword, forgetPassword } from "./routes/index.js";
import { Switch } from "antd";
import { useSelector } from "react-redux";

const AuthenticatedRoute = ({ element }) => {
  const isLoggedIn = !!localStorage.getItem("token");

  // Nếu đã đăng nhập, hiển thị nội dung của route, ngược lại chuyển hướng đến trang đăng nhập
  return isLoggedIn ? element : <Navigate to="/login" />;
};
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path={Login.path}
            element={<Login.component></Login.component>}
          ></Route>
          <Route
            path={updatePassword.path}
            element={<updatePassword.component></updatePassword.component>}
          ></Route>
          <Route
            path={forgetPassword.path}
            element={<forgetPassword.component></forgetPassword.component>}
          ></Route>
          {PublicRoutes.map((route, index) => {
            const Page = route.component;
            const Layout = route.layout || DefaultLayout;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <AuthenticatedRoute
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
