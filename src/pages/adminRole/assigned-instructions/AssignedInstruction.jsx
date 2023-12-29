import React, { useState } from "react";
import { Button, Input, Select, Space, Table } from "antd";
import { Option } from "antd/es/mentions";
import { getAssInstruct } from "../../../apis/apiAss";

const AssignedInstruction = () => {
  const [instruct, setInstruct] = useState([]);
  const [array, setArray] = useState([]);
  const [listTeacher, setListTeacher] = useState([]);
  const [limit, setLimit] = useState(0);
  const subTable = [];

  const expandedRowRenderFunc = (datas) => {
    console.log(
      "🚀 ~ file: AssignedInstruction.jsx:14 ~ expandedRowRenderFunc ~ datas:",
      datas
    );
    const columns = [
      {
        title: "STT",
        dataIndex: "STT",
        key: "STT",
      },
      {
        title: "Tên sinh viên",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Mã số sinh viên",
        dataIndex: "number",
        key: "number",
      },
      {
        title: "Độ phù hợp",
        dataIndex: "coincidence",
        key: "coincidence",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Trường/Viện",
        dataIndex: "school",
        key: "school",
      },
    ];
    const data = [];
    let i = 0;
    if (datas.length > 0) {
      for (const d of datas) {
        data.push({
          STT: i.toString(),
          name: d.fullname,
          number: d.number,
          school: d.school || "Trường công nghệ thông tin và truyền thông",
          email: d.email,
          coincidence: d.coincidence,
        });
        i++;
      }
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mã số giảng viên",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Trường/Viện",
      dataIndex: "school",
      key: "school",
    },
  ];
  const data = [];
  if (instruct.length > 0) {
    let i = 0;
    for (const e of instruct) {
      data.push({
        key: i.toString(),
        STT: i.toString(),
        name: e.teacher.fullname,
        number: e.teacher.number,
        school:
          e.teacher.school || "Trường công nghệ thông tin và truyền thông",
        student: e.student,
      });
      //   subTable.push(expandedRowRenderFunc(e.student));
      i++;
    }
  }
  return (
    <div className="list-student mb-4">
      <div className="content-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">
          Danh sách phân công giáo viên hướng dẫn
        </h6>

        <div className="select-semester">
          <span style={{ color: "black", marginLeft: "10px" }}>Kỳ học: </span>
          <Select defaultValue="20231" style={{ width: 120 }}>
            <Option value="20231">20231</Option>
          </Select>
        </div>

        <Space.Compact size="large" style={{ marginLeft: "20px" }}>
          <Input
            addonBefore="số lượng sinh viên/giảng viên"
            placeholder="number"
            onChange={(e) => {
              setLimit(e.target.value);
            }}
          />
        </Space.Compact>

        <div>
          <Button
            type="primary"
            onClick={async () => {
              const res = await getAssInstruct(limit, "DRAFT");
              setInstruct(res.assignment);
            }}
          >
            Tạo nháp
          </Button>
        </div>

        <div>
          <Button
            type="primary"
            onClick={async () => {
              const res = await getAssInstruct(limit, "SAVE");
              setInstruct(res.assignment);
            }}
          >
            Lưu
          </Button>
        </div>
      </div>

      <div className="content-main">
        <Table
          className="table-list-student"
          columns={columns}
          expandable={{
            expandedRowRender: (record) => {
              //   console.log(
              //     "🚀 ~ file: AssignedInstruction.jsx:1 ~ AssignedInstruction ~ record:",
              //     record
              //   );
              return expandedRowRenderFunc(record.student);
            },
            // defaultExpandedRowKeys: ["0"],
            // rowExpandable: (record) => record.student > 0 !== 'Not Expandable',
          }}
          dataSource={data}
          size="10"
        />
      </div>
    </div>
  );
};
export default AssignedInstruction;
