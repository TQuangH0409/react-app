import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Input, Table } from "antd";
import "../../adminRole/globalCSS.css";
import { EyeOutlined, FormOutlined } from "@ant-design/icons";

import getData from "../api/apiData.js";
import axios from "axios";
const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);
export const ListProject = () => {
  const [page, setPage] = useState(1);
  const [paginationSize, setPaginationSize] = useState(10);

  const [dataTable, setDataTable] = useState([]);
  const [dataFake, setDataFake] = useState(dataTable);

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);

  const login = async () => {
    const res = await axios.post(
      `http://35.213.168.72:8000/api/v1/auth/login`,
      {
        email: "quangh204299@gmail.com",
        password: "1",
      }
    );
    if (res) {
      const token = res.data.accessToken;
      localStorage.setItem("token", token);
    }
  };
  useEffect(() => {
    login();
  }, []);

  const getAllProject = async (current) => {
    try {
      const token = localStorage.getItem("token");
      const response = await getData(`/projects/?size=10&page=0`, {
        headers: {
          token: token,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(async () => {
        try {
          const data = await getAllProject();
          setDataTable(data.data);
          setDataFake(data.data)
          setLoading(false);
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      }, 1000);
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "ID",
      key: "index",
      render: (text, record, index) => (page - 1) * paginationSize + index + 1,
    },
    {
      title: "Tên đề tài",
      dataIndex: "name",
    },
    {
      title: "Điểm",
      dataIndex: "mark",
    },
    {
      title: "Sinh viên",
      sorter: true,
      dataIndex: "student_name",
    },
    {
      title: "MSSV",
      dataIndex: "student_id",
    },
    {
      title: "Giảng viên phản biện",
      dataIndex: "teacher_instruct_id",
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_time",
    },
    {
      title: "Người tạo",
      dataIndex: "created_by",
    },
    {
      title: "Tác vụ",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <div className="action-button" size="middle">
          <Button
            href={`/teacher/info-project/${record.student_id}`}
            className="button-view"
            shape="circle"
            icon={<EyeOutlined />}
          >
            {" "}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="list-student mb-4">
      <div className="content-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Danh sách đồ án</h6>
        <Search
        placeholder="Tên đề tài..."
          className="input-search"
          value={value}
          onChange={(e) => {
            const currentValue = e.target.value;
            setValue(currentValue);
            let filteredData = dataFake.filter((entry) =>
              entry.name.toLowerCase().includes(currentValue.toLowerCase())
            );
            setDataTable(filteredData);
          }}
          onSearch={onSearch}
          style={{
            width: 500,
            paddingLeft: 10,
          }}
        />
      </div>

      <div className="content-main">
        <Table
          pagination={{
            onChange(current, pageSize) {
              setPage(current);
              setPaginationSize(pageSize);
            },
            defaultPageSize: 20,
            hideOnSinglePage: false,
            showSizeChanger: true,
          }}
          columns={columns}
          dataSource={dataTable}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ListProject;
