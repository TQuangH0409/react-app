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
export const ListAssignment = () => {
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
    {
      topic_name: "Project III",
      mark: "10/10",
      student_name: "Nguyễn Trường Việt",
      student_id: "20198273",
      teacher_argument: "Nguyễn Đăng Hải",
      createDate: "25-12-2023",
      peopleCreate: "Nguyễn Trường Việt",
    },{
      topic_name: "Project III",
      mark: "10/10",
      student_name: "Nguyễn Trường Việt",
      student_id: "20198273",
      teacher_argument: "Nguyễn Đăng Hải",
      createDate: "25-12-2023",
      peopleCreate: "Nguyễn Trường Việt",
    },{
      topic_name: "Project III",
      mark: "10/10",
      student_name: "Nguyễn Trường Việt",
      student_id: "20198273",
      teacher_argument: "Nguyễn Đăng Hải",
      createDate: "25-12-2023",
      peopleCreate: "Nguyễn Trường Việt",
    },{
      topic_name: "Project III",
      mark: "10/10",
      student_name: "Nguyễn Trường Việt",
      student_id: "20198273",
      teacher_argument: "Nguyễn Đăng Hải",
      createDate: "25-12-2023",
      peopleCreate: "Nguyễn Trường Việt",
    },{
      topic_name: "Project III",
      mark: "10/10",
      student_name: "Nguyễn Trường Việt",
      student_id: "20198273",
      teacher_argument: "Nguyễn Đăng Hải",
      createDate: "25-12-2023",
      peopleCreate: "Nguyễn Trường Việt",
    },{
      topic_name: "Project III",
      mark: "10/10",
      student_name: "Nguyễn Trường Việt",
      student_id: "20198273",
      teacher_argument: "Nguyễn Đăng Hải",
      createDate: "25-12-2023",
      peopleCreate: "Nguyễn Trường Việt",
    },{
      topic_name: "Project III",
      mark: "10/10",
      student_name: "Nguyễn Trường Việt",
      student_id: "20198273",
      teacher_argument: "Nguyễn Đăng Hải",
      createDate: "25-12-2023",
      peopleCreate: "Nguyễn Trường Việt",
    },{
      topic_name: "Project III",
      mark: "10/10",
      student_name: "Nguyễn Trường Việt",
      student_id: "20198273",
      teacher_argument: "Nguyễn Đăng Hải",
      createDate: "25-12-2023",
      peopleCreate: "Nguyễn Trường Việt",
    },{
      topic_name: "Project III",
      mark: "10/10",
      student_name: "Nguyễn Trường Việt",
      student_id: "20198273",
      teacher_argument: "Nguyễn Đăng Hải",
      createDate: "25-12-2023",
      peopleCreate: "Nguyễn Trường Việt",
    },{
      topic_name: "Project III",
      mark: "10/10",
      student_name: "Nguyễn Trường Việt",
      student_id: "20198273",
      teacher_argument: "Nguyễn Đăng Hải",
      createDate: "25-12-2023",
      peopleCreate: "Nguyễn Trường Việt",
    },{
      topic_name: "Project III",
      mark: "10/10",
      student_name: "Nguyễn Trường Việt",
      student_id: "20198273",
      teacher_argument: "Nguyễn Đăng Hải",
      createDate: "25-12-2023",
      peopleCreate: "Nguyễn Trường Việt",
    },{
      topic_name: "Project III",
      mark: "10/10",
      student_name: "Nguyễn Trường Việt",
      student_id: "20198273",
      teacher_argument: "Nguyễn Đăng Hải",
      createDate: "25-12-2023",
      peopleCreate: "Nguyễn Trường Việt",
    },{
      topic_name: "Project III",
      mark: "10/10",
      student_name: "Nguyễn Trường Việt",
      student_id: "20198273",
      teacher_argument: "Nguyễn Đăng Hải",
      createDate: "25-12-2023",
      peopleCreate: "Nguyễn Trường Việt",
    },{
      topic_name: "Project III",
      mark: "10/10",
      student_name: "Nguyễn Trường Việt",
      student_id: "20198273",
      teacher_argument: "Nguyễn Đăng Hải",
      createDate: "25-12-2023",
      peopleCreate: "Nguyễn Trường Việt",
    },{
      topic_name: "Project III",
      mark: "10/10",
      student_name: "Nguyễn Trường Việt",
      student_id: "20198273",
      teacher_argument: "Nguyễn Đăng Hải",
      createDate: "25-12-2023",
      peopleCreate: "Nguyễn Trường Việt",
    },{
      topic_name: "Project III",
      mark: "10/10",
      student_name: "Nguyễn Trường Việt",
      student_id: "20198273",
      teacher_argument: "Nguyễn Đăng Hải",
      createDate: "25-12-2023",
      peopleCreate: "Nguyễn Trường Việt",
    },{
      topic_name: "Project III",
      mark: "10/10",
      student_name: "Nguyễn Trường Việt",
      student_id: "20198273",
      teacher_argument: "Nguyễn Đăng Hải",
      createDate: "25-12-2023",
      peopleCreate: "Nguyễn Trường Việt",
    },{
      topic_name: "Project III",
      mark: "10/10",
      student_name: "Nguyễn Trường Việt",
      student_id: "20198273",
      teacher_argument: "Nguyễn Đăng Hải",
      createDate: "25-12-2023",
      peopleCreate: "Nguyễn Trường Việt",
    },{
      topic_name: "Project III",
      mark: "10/10",
      student_name: "Nguyễn Trường Việt",
      student_id: "20198273",
      teacher_argument: "Nguyễn Đăng Hải",
      createDate: "25-12-2023",
      peopleCreate: "Nguyễn Trường Việt",
    },{
      topic_name: "Project III",
      mark: "10/10",
      student_name: "Nguyễn Trường Việt",
      student_id: "20198273",
      teacher_argument: "Nguyễn Đăng Hải",
      createDate: "25-12-2023",
      peopleCreate: "Nguyễn Trường Việt",
    },{
      topic_name: "Project III",
      mark: "10/10",
      student_name: "Nguyễn Trường Việt",
      student_id: "20198273",
      teacher_argument: "Nguyễn Đăng Hải",
      createDate: "25-12-2023",
      peopleCreate: "Nguyễn Trường Việt",
    },{
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
      title: "Sinh viên",
      dataIndex: "student_name",
    },
    {
      title: "MSSV",
      dataIndex: "student_id",
    },
    {
      title: "Ngày phân công",
      dataIndex: "createDate",
    },
    {
      title: "Người phân công",
      dataIndex: "peopleCreate",
    },
    {
      title: "Tác vụ",
      fixed: "right",
      width: 100,
      render: () => (
        <div className="action-button" size="middle">
          <Button className="button-view" shape="circle" icon={<EyeOutlined />}>
            {" "}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="list-student mb-4">
      <div className="content-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Danh sách sinh viên được phân công hướng dẫn</h6>
        <Search
          className="input-search"
          placeholder="Search Name"
          value={value}
          onChange={(e) => {
            const currValue = e.target.value;
            setValue(currValue);
            const filteredData = data.filter((entry) =>
              entry.student_name.toLowerCase().includes(currValue.toLowerCase())
            );
            setDataSource(filteredData);
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

export default ListAssignment;
