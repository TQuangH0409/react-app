import React from "react";
import { useState } from "react";
import {
  Button,
  Input,
  Table,
} from "antd";
import "../../adminRole/globalCSS.css";
import {
  EyeOutlined,
} from "@ant-design/icons";

const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);
export const ListReviewProject = () => {
  const data = [
    {
      topic_name: "Project III",
      mark: "10/10",
      student_name: "Nguyễn Trường Việt",
      student_id: "20198273",
      teacher_argument: "Nguyễn Đăng Hải",
      createDate: "25-12-2023",
      peopleCreate: "Nguyễn Trường Việt",
    },
  ];
  const [page, setPage] = useState(1);
  const [paginationSize, setPaginationSize] = useState(10);
  const [dataSource, setDataSource] = useState(data);
  const [value, setValue] = useState("");

  const columns = [
    {
      title: "ID",
      key: "index",
      render: (text, record, index) =>
        (page - 1) * paginationSize + index + 1,
    },
    {
      title: "Tên đề tài",
      dataIndex: "topic_name",
    },
    {
      title: "Điểm",
      dataIndex: "mark",
    },
    {
      title: "Sinh viên",
      dataIndex: "student_name",
    },
    {
      title: "MSSV",
      dataIndex: "student_id",
    },
    {
      title: "Giảng viên phản biện",
      dataIndex: "teacher_argument",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createDate",
    },
    {
      title: "Người tạo",
      dataIndex: "peopleCreate",
    },
    
  ];

  return (
    <div className="list-student mb-4">
      <div className="content-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Danh sách đồ án phản biện</h6>
        <Search
          className="input-search"
          value={value}
          onChange={(e) => {
            const currValue = e.target.value;
            setValue(currValue);
            const filteredData = data.filter((entry) =>
              entry.topic_name.toLowerCase().includes(currValue.toLowerCase())
            );
            setDataSource(filteredData);
          }}
          placeholder="Tìm kiếm"
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
            defaultPageSize: 10,
            hideOnSinglePage: true,
            showSizeChanger: true,
          }}
          columns={columns}
          dataSource={dataSource}
        />
      </div>
    </div>
  );
};

export default ListReviewProject;
