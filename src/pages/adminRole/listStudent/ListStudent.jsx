import React, { useState } from "react";
import {
  Button,
  Modal,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Divider,
  Table,
  Space,
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
export const ListStudent = () => {
  const data = [
    {
      name: "test",
      mssv: 32,
      class: "test",
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
      title: "STT",
      key: "index",
      render: (text: string, record: any, index: number) =>
        (page - 1) * paginationSize + index + 1,
    },
    {
      title: "Tên hiển thị",
      dataIndex: "name",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Mã số sinh viên",
      dataIndex: "mssv",
    },
    {
      title: "Lớp",
      dataIndex: "class",
    },
    {
      title: "Khóa",
      dataIndex: "khoa",
    },
    {
      title: "Trường/Viện",
      dataIndex: "School",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Lĩnh vực nghiên cứu",
      dataIndex: "study",
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

  const options = [
    {
      value: "jack",
      label: "Jack",
    },
    {
      value: "lucy",
      label: "Lucy",
    },
    {
      value: "Yiminghe",
      label: "yiminghe",
    },
  ];

  return (
    <div className="list-student mb-4">
      <div className="content-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">
          Danh sách sinh viên
        </h6>
        <Button
          type="primary"
          onClick={() => setModal1Open(true)}
          icon={<UserAddOutlined />}
        >
          Thêm mới
        </Button>
        <Modal
          title="Thêm mới sinh viên"
          centered
          open={modal1Open}
          okText="Thêm"
          cancelText="Từ chối"
          onOk={() => setModal1Open(false)}
          onCancel={() => setModal1Open(false)}
        >
          <Form layout="vertical">
            <Form.Item label="Họ và tên">
              <Input />
            </Form.Item>
            <Form.Item label="CCCD">
              <Input />
            </Form.Item>
            <Form.Item label="Mã số sinh viên">
              <Input />
            </Form.Item>
            <Form.Item label="Khóa">
              <Input />
            </Form.Item>
            <Form.Item label="Kỳ học">
              <Input />
            </Form.Item>
            <Form.Item label="Lớp">
              <Input />
            </Form.Item>
            <Form.Item label="Trường/Viện:">
              <Select
                defaultValue="lucy"
                style={{
                  width: "100%",
                }}
                options={options}
              />
            </Form.Item>
          </Form>
        </Modal>

        <Button
          type="primary"
          onClick={() => setModal2Open(true)}
          icon={<FileAddOutlined />}
        >
          Thêm mới excel
        </Button>
        <Modal
          title="Thêm mới sinh viên"
          centered
          okButtonProps={{ style: { display: "none" } }}
          open={modal2Open}
          cancelText="Từ chối"
          onCancel={() => setModal2Open(false)}
        >
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
        </Modal>

        <div className="select-semester">
          <span style={{ color: "black" }}>Kỳ học: </span>
          <Select defaultValue="20231" style={{ width: 120 }}>
            <Option value="20231">20231</Option>
          </Select>
        </div>

        <Search
          className="input-search"
          placeholder="Search Name"
          value={value}
          onChange={(e) => {
            const currValue = e.target.value;
            setValue(currValue);
            const filteredData = data.filter((entry) =>
              entry.name.includes(currValue)
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
          className="table-list-student"
          rowSelection={{
            type: "Checkbox",
          }}
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

export default ListStudent;
