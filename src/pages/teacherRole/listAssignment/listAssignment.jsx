import React from "react";
import { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  Table,
  message,
  Upload,
} from "antd";
import "../../adminRole/globalCSS.css";
import {
  UserAddOutlined,
  FileAddOutlined,
  DeleteOutlined,
  FormOutlined,
  EyeOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import type { ColumnsType, TablePaginationConfi } from "antd/es/table";

interface DataType {}
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
  ];

  const { Dragger } = Upload;
  const [droppedFile, setDroppedFile] = useState(0);
  const props = {
    name: "file",
    multiple: false,
    maxCount: 1,
    accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    beforeUpload: (file) => {
      console.log(file);
      if (droppedFile > 1) {
        message.warning(
          `Multiple files are not allowed. Only one CSV file will be uploaded at a time.`
        );
        return false;
      }
      if (
        file.type !=
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        message.error(`Invalid file format. Please upload a CSV file.`);
        return false;
      }
      return true;
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const Option = Select.Option;
  const [page, setPage] = useState(1);
  const [paginationSize, setPaginationSize] = useState(10);
  const [dataSource, setDataSource] = useState(data);
  const [value, setValue] = useState("");

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      key: "index",
      render: (text: string, record: any, index: number) =>
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
          <Button className="button-fix" shape="circle" icon={<FormOutlined />}>
            {" "}
          </Button>
          <Button
            className="button-delete"
            shape="circle"
            icon={<DeleteOutlined />}
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

export default ListAssignment;
