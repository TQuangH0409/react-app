import "./App.css";
import Menu from "./components/menu/menu.jsx"
import Navbar from "./components/navbar/navbar";
import ForgetPassword from "./page/ForgetPassword/ForgetPassword";
// import Input from "./components/Input/Input";
// import Navbar from "./components/header/Navbar";
// import Menu from "./components/menu/Menu";
import FormLogin from "./page/Login/FormLogin";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="app-container">
      {/* <FormLogin />

      <ForgetPassword /> */}
      <Menu />
      <div className="app-container-right">
        <Navbar title={"Thông tin giảng viên"} />
        {/* <Content/> */}
      </div>
    </div>

    // <div className="App">
    //   <div className='menu'>
    //     <Menu />
    //   </div>
    //   <div className='container'>
    //     <div className='headerContainer'>
    //       <Navbar />
    //     </div>
    //     <div className='contentContainer'>
    //       //...
    //     </div>
    //   </div>
    // </div>
  );
}

export default App;
