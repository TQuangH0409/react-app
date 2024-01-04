import React from "react";
import { Dropdown, Space } from "antd";
import "./navbar.css";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Xóa token khỏi localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    localStorage.removeItem("userId");
    localStorage.removeItem("fullname");


    // Chuyển hướng đến trang đăng nhập hoặc trang chính
    navigate("/login");
  };

  const items = [
    {
      key: "1",
      label: (
        <a rel="noopener noreferrer" onClick={handleLogout}>
          Thoát đăng nhập
        </a>
      ),
    },
  ];

  return (
    <div className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <ul className="navbar-nav ml-auto">
        <li className="navitem no-arrow">
          <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                  {localStorage.getItem("fullname")}
                </span>
                <img
                  className="img-profile rounded-circle"
                  src="../img/avatar.png"
                ></img>
              </Space>
            </a>
          </Dropdown>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
