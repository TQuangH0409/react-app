import React, { useState, useEffect } from "react";
import { Button, Input, Select, Space, Table } from "antd";
import { Option } from "antd/es/mentions";
import { getAssInstruct } from "../../../apis/apiAss";
import { optionYear, getListAssign } from "../../../apis/apiAdmin";
import unorm from "unorm";



const AssignedInstruction = () => {
  const [instruct, setInstruct] = useState([]);
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
      title: 'STT',
      key: 'index',
      render: (text, record, index) => (page - 1) * paginationSize + index + 1,
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
  const getDataInstruction = async () => {
    let i = 0;
    const newData = instruct.map((e, index) => ({
      key: index,
      STT: i.toString(),
      name: e.teacher.fullname,
      number: e.teacher.number,
      school: e.teacher.school || "Trường công nghệ thông tin và truyền thông",
      student: e.students || e.student,
    }));
    setData(newData)
  }

  useEffect(() => {
    getDataInstruction();
  }, [instruct]);

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
        getDataInstruction();
      }
    };

    fetchData();
    setLoading(false)
    setPage(1);
  }, [value]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const res = await getListAssign(semester, "INSTRUCT")
      if (res) {
        setInstruct(res.assignment);
        getDataInstruction();
      }

    }
    fetchData();
    setLoading(false)
  }, [])

  const handleSemesterChange = async (selectedSemester) => {
    setSemester(selectedSemester);
    setLoading(true)
    const res = await getListAssign(selectedSemester, "INSTRUCT")
    if (res) {
      setInstruct(res.assignment);
      getDataInstruction();
    }
    setLoading(false)
  };

  return (
    <div className="list-student mb-4">
      <div className="content-header py-3">
        <h6 style={{ width: "180px" }} className="m-0 font-weight-bold text-primary">
          Danh sách phân công giáo viên hướng dẫn
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
        <Button style={{ margin: "0 5px 0 5px" }}
          type="primary"
          onClick={async () => {
            setLoading(true);
            const res = await getAssInstruct(limit, "DRAFT", semester);
            if (res.listStudent.length > 0) {
              alert("Tồn tại sinh viên chưa được chia cho giáo viên nào! Cần tăng giới hạn sinh viên / 1 giáo viên")
            }
            setInstruct(res.assignment);
            setLoading(false)
          }}
        >
          Tạo nháp
        </Button>

        <Button style={{ margin: "0" }}
          type="primary"
          onClick={async () => {
        
            
              const res = await getAssInstruct(limit, "SAVE", semester);
              setInstruct(res.assignment);
           
          }}
        >
          Lưu
        </Button>
        <Input.Search
          className="input-search"
          placeholder="Tìm kiếm theo tên"
          value={value}
          onSearch={onSearch}
          onChange={(e) => setValue(e.target.value)}
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

              return expandedRowRenderFunc(record.student);
            },
          }}
          dataSource={data}
          size="10"
          loading={loading}
        />
      </div>
    </div>
  );
};
export default AssignedInstruction;
