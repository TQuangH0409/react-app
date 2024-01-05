import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Input, Select, Table } from "antd";
import "../../adminRole/globalCSS.css";
import { EyeOutlined } from "@ant-design/icons";
import { getAllProject } from "../../../apis/apiTeacher";
import { Link } from "react-router-dom";
import { optionYear } from "../../../apis/apiAdmin";
const { Search } = Input;

export const ListProject = () => {
  const [page, setPage] = useState(1);
  const [paginationSize, setPaginationSize] = useState(10);

  const [dataAll, setDataAll] = useState({});
  const [dataTable, setDataTable] = useState([]);
  const [dataFake, setDataFake] = useState([]);
  const [dataTeacher, setDataTeacher] = useState({});

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);

  const onSearch = (currentValue) => {
    if (typeof currentValue === "string") {
      if (currentValue) {
        let filteredData = dataFake.filter((entry) => {
          return entry.fullname
            .toLowerCase()
            .includes(currentValue.toLowerCase());
        });
        console.log(filteredData);
        setDataTable(filteredData);
      } else {
        setDataTable(dataFake);
      }
    } else if (typeof currentValue === "number") {
      console.log(123);

      if (!isNaN(currentValue)) {
        const filteredData = dataFake.filter((entry) =>
          entry.number.toString().includes(currentValue.toString())
        );
        setDataTable(filteredData);
      } else {
        console.log("Invalid number");
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProject(localStorage.getItem("userId"));
        setDataAll(data);
        setDataTable(data.students);
        setDataFake(data.students);
        setDataTeacher(data.teacher);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
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
      key: "index",
      render: (text, record, index) =>
        (text = record.project?.name ? record.project.name : ""),
    },
    {
      title: "Sinh viên",
      dataIndex: "fullname",
    },
    {
      title: "MSSV",
      dataIndex: "number",
    },
    {
      title: "Giảng viên hướng dẫn",
      key: "index",

      render: (text, record, index) => {
        // return (text = "Nguyễn Trường Việt");
        return (text = dataTeacher.fullname);
      },
    },
    {
      title: "Ngày tạo",
      render: (text, record, index) => {
        let dateObj = new Date(dataAll.created_time);

        const year = dateObj.getFullYear();
        const month = (dateObj.getMonth() + 1).toString().padStart(2, "0"); 
        const day = dateObj.getDate().toString().padStart(2, "0");

        const formattedDate = `${day}-${month}-${year}`;

        return (text = formattedDate);
      },
    },
    {
      title: "Tác vụ",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <div className="action-button" size="middle">
          <Link to={`/teacher/info-project/${record.id}`}>
            <Button
              className="button-view"
              shape="circle"
              icon={<EyeOutlined />}
            >
              {""}
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  const [semester, setSemester] = useState('20231');

  // const handleSemesterChange = async (selectedSemester) => {
  //   setSemester(selectedSemester);
  //   const data = await getAllUserByPosition(`STUDENT&semester=${selectedSemester}`);
  //   setDataAll(data);
  // };

  return (
    <div className="list-student mb-4">
      <div className="content-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">
          Danh sách sinh viên được phân công hướng dẫn
        </h6>
        <Search
          placeholder="Tên sinh viên..."
          className="input-search"
          value={value}
          onChange={(e) => {
            const currentValue = e.target.value;
            setValue(e.target.value);
            if (!currentValue) {
              setDataTable(dataFake);
            }
          }}
          onSearch={(value) => {
            onSearch(value);
          }}
          style={{
            width: 500,
            paddingLeft: 10,
          }}
        />
        <div className='select-semester'>
          <span style={{ color: "black" }} >Kỳ học: </span>
          <Select defaultValue="20231" 
          // onChange={handleSemesterChange}
          options={optionYear}
          style={{ width: 120 }} >

          </Select>
        </div>
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
