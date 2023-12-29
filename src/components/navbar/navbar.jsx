import React from 'react'
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import "./navbar.css"

const items = [
  {
    key: '1',
    label: (
      <a rel="noopener noreferrer" href="/login">
        Thoát đăng nhập
      </a>
    ),
    
  },
];

const Navbar = () => {
  return (
    <div className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <ul className='navbar-nav ml-auto'>
        <li className='navitem no-arrow'>
          <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
              <span class="mr-2 d-none d-lg-inline text-gray-600 small">Admin</span>
                <img class="img-profile rounded-circle" src='../img/avatar.png'></img>
              </Space>
            </a>
          </Dropdown>
        </li>
      </ul>


    </div>
  )
}

export default Navbar