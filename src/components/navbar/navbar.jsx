import React, { useEffect, useState } from "react";
import { Dropdown, Space } from "antd";
import "./navbar.css";
import { Link } from "react-router-dom";
import { getTeacherById } from "../../apis/apiTeacher";

const Navbar = () => {
  const [teacherName, setTeacherName] = useState("");

  useEffect(() => {
    setTeacherName(localStorage.getItem("fullname"));
    console.log(teacherName);
  }, [localStorage.getItem("fullname")]);

  const handleLogOut = () => {
    localStorage.removeItem("fullname");
    localStorage.removeItem("roles");
    localStorage.removeItem("token");
  };
  const items = [
    {
      key: "1",
      label: (
        <Link to={"/login"} rel="noopener noreferrer" onClick={handleLogOut}>
          Thoát đăng nhập
        </Link>
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
                  {teacherName}
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
