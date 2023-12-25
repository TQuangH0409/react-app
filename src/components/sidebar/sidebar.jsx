import React, { useState } from 'react'
import "./sidebar.css"
import { Menu } from 'antd'
import { BrowserRouter as Router,  Routes,  Route, Link } from "react-router-dom";

const Sidebar = ({ user }) => {

    return (
        <div className='sidebar'>
            <Link to="/admin" className='sidebar-logo ' href='#'>
                <div className="sidebar-brand-icon align-items-center justify-content-center">
                    <img className='sidebar-img' src="../img/logo-dai-hoc-bach-khoa.png" />
                </div>

            </Link>

            <hr className="sidebar-divider my-0"></hr>

            <div >
                {/*admin */}
                {/* {user.isAdmin &&*/} <Menu mode='inline'> 
                    <Menu.Item key="list-student">
                        Danh sách sinh viên
                        <Link to="/admin/list-student"></Link>
                    </Menu.Item>
                    <hr className="sidebar-divider my-0"></hr>

                    <Menu.Item key="list-teacher">
                        Danh sách giảng viên
                        <Link to="/admin/list-teacher"></Link>
                    </Menu.Item>
                    <hr className="sidebar-divider my-0"></hr>

                    <Menu.Item key="field-of-study">
                        Lĩnh vực nghiên cứu
                        <Link to="/admin/list-field-of-study"></Link>
                    </Menu.Item>
                    <hr className="sidebar-divider my-0"></hr>

                    <Menu.Item key="assigned-instructions">
                        Phân công hướng dẫn
                        <Link to="/admin/assigned-instructions"></Link>
                    </Menu.Item>
                    <hr className="sidebar-divider my-0"></hr>

                    <Menu.Item key="assign-criticism">
                        Phân công phản biện
                        <Link to="/admin/assign-criticism"></Link>
                    </Menu.Item>
                    <hr className="sidebar-divider my-0"></hr>
                    </Menu>
                }

                {/*student */}
                 {/* {user.isStudent} && <Menu>

                    <Menu.Item key="student-information">
                        Thông tin cá nhân
                        <Link to="/student/infi"></Link>
                    </Menu.Item>
                    <hr className="sidebar-divider my-0"></hr>

                    <Menu.Item key="project-iformation">
                        Thông tin đồ án
                        <Link to="/"></Link>
                    </Menu.Item>
                    <hr className="sidebar-divider my-0"></hr>

                </Menu>  */}
                {/*teacher */}

                {/* {user.isTeacher} && */}<Menu> 
                    <Menu.Item key="teacher">
                        Thông tin cá nhân
                        <Link to="/teacher"></Link>
                    </Menu.Item>

                    <hr className="sidebar-divider my-0"></hr>
                    <Menu.Item key="list-project">
                        Danh sách đồ
                        <Link to="/list-project"></Link>
                    </Menu.Item>

                    <hr className="sidebar-divider my-0"></hr>
                    <Menu.Item key="info-project">
                        Thông tin đồ án
                        <Link to="/info-project"></Link>
                    </Menu.Item>

                    <hr className="sidebar-divider my-0"></hr>
                    <Menu.Item key="list-review-project">
                        Danh sách đồ án phản biện
                        <Link to="/list-review-project"></Link>
                    </Menu.Item>
                    
                    <hr className="sidebar-divider my-0"></hr>
                    <Menu.Item key="list-assignment">
                        Danh sách sinh viên được phân công hướng dẫn
                        <Link to="/list-assignment"></Link>
                    </Menu.Item>
                    <hr className="sidebar-divider my-0"></hr>
                </Menu>
            </div>
        </div>
    )
}

export default Sidebar