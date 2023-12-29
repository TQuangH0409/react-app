import React, { useState } from "react";
import { Button, Input, Select, Space, Table } from "antd";
import { Option } from "antd/es/mentions";
import { getAssReview } from "../../../apis/apiAss";
import { getUserById } from "../../../apis/apiStudent";

const AssignCriticism = () => {
  const [review, setReview] = useState([]);
  const [array, setArray] = useState([]);
  const [listTeacher, setListTeacher] = useState([]);
  const [limit, setLimit] = useState(0);
  const subTable = [];

  const expandedRowRenderFunc = (datas) => {
    console.log(
      "🚀 ~ file: Assignedreviewion.jsx:14 ~ expandedRowRenderFunc ~ datas:",
      datas
    );
    const columns = [
      {
        title: "STT",
        dataIndex: "STT",
        key: "STT",
      },
      {
        title: "Tên đề tài",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Tên sinh viên",
        dataIndex: "student",
        key: "student",
      },
      {
        title: "Mã số sinh viên",
        dataIndex: "number",
        key: "number",
      },
      {
        title: "Tên giảng viên hướng dẫn",
        dataIndex: "teacher",
        key: "teacher",
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
    ];
    const data = [];
    let i = 0;
    if (datas.length > 0) {
      for (const d of datas) {
        data.push({
          STT: i.toString(),
          name: d.name,
          student: d.student.fullname,
          number: d.student.number,
          school: d.school || "Trường công nghệ thông tin và truyền thông",
          teacher: d.teacher.fullname,
          email: d.student.email,
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
  if (review.length > 0) {
    let i = 0;
    for (const e of review) {
      const project = [];

      for (const p of e.project) {
        const res = async (px) => {
          const instruct = await getUserById(px.teacher_instruct_id);
          const student = await getUserById(px.student_id);
          project.push({
            ...px,
            student: student,
            teacher: instruct,
          });
        };
        res(p);
      }
      console.log(project);

      data.push({
        key: i.toString(),
        STT: i.toString(),
        name: e.teacher.fullname,
        number: e.teacher.number,
        school:
          e.teacher.school || "Trường công nghệ thông tin và truyền thông",
        project: project,
        teacher: e.teacher,
      });
      //   subTable.push(expandedRowRenderFunc(e.student));
      i++;
    }
  }
  return (
    <div className="list-student mb-4">
      <div className="content-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">
          Danh sách phân công giáo viên phản biện
        </h6>

        <div className="select-semester">
          <span style={{ color: "black", marginLeft: "10px" }}>Kỳ học: </span>
          <Select defaultValue="20231" style={{ width: 120 }}>
            <Option value="20231">20231</Option>
          </Select>
        </div>

        <Space.Compact size="large" style={{ marginLeft: "20px" }}>
          <Input
            addonBefore="số lượng đồ án/giảng viên"
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
              const res = await getAssReview(limit, "DRAFT");
              setReview(res.assignment);
              if(res.listProject && res.listProject > 0){
                alert("có giáo viên chưa đk được phân công")
              }
            }}
          >
            Tạo nháp
          </Button>
        </div>

        <div>
          <Button
            type="primary"
            onClick={async () => {
              const res = await getAssReview(limit, "SAVE");
              setReview(res.assignment);
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
              // console.log(
              //   "🚀 ~ file: Assignedreviewion.jsx:1 ~ Assignedreviewion ~ record:",
              //   record
              // );
              return expandedRowRenderFunc(record.project);
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
export default AssignCriticism;
