import React, { useEffect, useState } from "react";
import { Dropdown, Space } from "antd";
import "./navbar.css";
import { Link } from "react-router-dom";
import { getTeacherOrStudentById } from "../../apis/apiTeacher";
import avatar from "../../assets/images/avatar.png"

const Navbar = () => {
  const [teacherInfo, setTeacherInfo] = useState({});
  const [isReload, setIsReload] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacher = await getTeacherOrStudentById(
          localStorage.getItem("userId")
        );
        setTeacherInfo(teacher);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchData();
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("fullname");
    localStorage.removeItem("roles");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

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
                  {teacherInfo.fullname}
                </span>
                <img
                  className="img-profile rounded-circle"
                  src = {avatar}
                  alt="avatar"
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
