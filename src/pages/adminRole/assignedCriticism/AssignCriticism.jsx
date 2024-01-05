import React, { useState, useEffect } from "react";
import { Button, Input, Select, Space, Table } from "antd";
import unorm from "unorm";
import { Option } from "antd/es/mentions";
import { getAssReview } from "../../../apis/apiAss";
import { getUserById, optionYear, getListAssign } from "../../../apis/apiAdmin";

const AssignCriticism = () => {
  const [review, setReview] = useState([]);
  const [array, setArray] = useState([]);
  const [listTeacher, setListTeacher] = useState([]);
  const [limit, setLimit] = useState(0);
  const [page, setPage] = useState(1);
  const [paginationSize, setPaginationSize] = useState(10)
  const [value, setValue] = useState('');
  const [semester, setSemester] = useState('20231');
  const [loading, setLoading] = useState(true);
  const subTable = [];

  const expandedRowRenderFunc = (datas) => {
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
      title: 'STT',
      key: 'index',
      render: (text: string, record: any, index: number) => (page - 1) * paginationSize + index + 1,
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
const [data, setData] = useState([]);

  const getDataCriticism = async () => {
    if (review.length > 0) {
      const newData = await Promise.all(review.map(async (e, i) => {
        const project = await Promise.all(e.project.map(async (p) => {
          const instruct = await getUserById(p.teacher_instruct_id);
          const student = await getUserById(p.student_id);
          return {
            ...p,
            student: student,
            teacher: instruct,
          };
        }));
  
        return {
          key: i.toString(),
          STT: i.toString(),
          name: e.teacher.fullname,
          number: e.teacher.number,
          school: e.teacher.school || "Trường công nghệ thông tin và truyền thông",
          project: project,
          teacher: e.teacher,
        };
      }));
  
      setData(newData);
    }
  };
  
  useEffect(() => {
    getDataCriticism();
  }, [review]);

  const onSearch = (value) => {
    setLoading(true)
    const normalizedValue = unorm.nfd(value); // Chuẩn hóa văn bản đầu vào
    const filterData = data.filter((o) =>
      Object.keys(o).some((k) => {
        // Nếu giá trị của thuộc tính là mảng đối tượng
        if (Array.isArray(o[k])) {
          return o[k].some((nestedObj) =>
            Object.values(nestedObj).some((nestedValue) =>
              unorm.nfd(String(nestedValue)).toLowerCase().includes(normalizedValue.toLowerCase())
            )
          );
        }
        // Nếu giá trị của thuộc tính không phải là mảng đối tượng
        return unorm.nfd(String(o[k])).toLowerCase().includes(normalizedValue.toLowerCase());
      })
    );
    setData(filterData);
    setLoading(false)
  };
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      if (value.trim() === '') {
        // Fetch all users with the position "STUDENT"
        getDataCriticism();
      }
    };
  
    fetchData();
    setLoading(false)
    setPage(1);
  }, [value]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const res = await getListAssign(semester, "REVIEW")
      if(res.data.length > 0 ) {
        setReview(res.assignment);
        getDataCriticism();
      }
      setLoading(false)
    }
  })

  const handleSemesterChange = async (selectedSemester) => {
    setSemester(selectedSemester);
    setLoading(true)
    const res = await getListAssign(selectedSemester, "REVIEW")
    if(res.data.length > 0 ) {
      setReview(res.assignment);
      getDataCriticism();
    }
    setLoading(false)
  };

  return (
    <div className="list-student mb-4">
      <div className="content-header py-3">
        <h6 style={{ width: "180px" }} className="m-0 font-weight-bold text-primary">
          Danh sách phân công giáo viên phản biện
        </h6>

        <div className='select-semester'>
          <span style={{ color: "black" }} >Kỳ học: </span>
          <Select defaultValue="20231"
            onChange={handleSemesterChange}
            options={optionYear}
            style={{ width: 120 }} >
          </Select>
        </div>

        <div className="select-number-ofStudent">
        <span style={{ color: "black", marginLeft: "10px" }}>Số lượng sinh viên/giảng viên: </span>
            <Input
              style={{ width: 120 }}
              placeholder="Number"
              onChange={(e) => {
                setLimit(e.target.value);
              }}
            />
        </div>

        <div>
          <Button style={{ margin: "0 5px 0 5px" }}
            type="primary"
            onClick={async () => {
              const res = await getAssReview(limit, "DRAFT", semester);
              console.log(res)
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
            type="primary" style={{ margin: "0" }}
            onClick={async () => {
              const res = await getAssReview(limit, "SAVE", semester);
              setReview(res.assignment);
            }}
          >
            Lưu
          </Button>
        </div>

        <Input.Search
          className="input-search"
          placeholder="Tìm kiếm theo tên"
          value={value}
          onSearch={onSearch}
          onChange={(e) => {setValue(e.target.value)}}
          style={{
            width: 300,
            paddingLeft: 10,
          }}
        />
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
          loading={loading}
        />
      </div>
    </div>
  );
};
export default AssignCriticism;
