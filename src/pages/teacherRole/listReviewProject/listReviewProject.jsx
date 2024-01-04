import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Input, Table } from "antd";
import "../../adminRole/globalCSS.css";
import { EyeOutlined } from "@ant-design/icons";
import { getAllProjectReview } from "../../../apis/apiTeacher";

const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);
export const ListReviewProject = () => {
  // const data = [
  //   {
  //     topic_name: "Project III",
  //     mark: "10/10",
  //     student_name: "Nguyễn Trường Việt",
  //     student_id: "20198273",
  //     teacher_argument: "Nguyễn Đăng Hải",
  //     createDate: "25-12-2023",
  //     peopleCreate: "Nguyễn Trường Việt",
  //   },
  // ];
  const [page, setPage] = useState(1);
  const [paginationSize, setPaginationSize] = useState(10);

  const [dataAll, setDataAll] = useState({});
  const [dataTable, setDataTable] = useState([]);
  const [dataTableFake, setDataTableFake] = useState([]);

  const [dataTeacher, setTeacher] = useState([]);

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(async () => {
        try {
          const data = await getAllProjectReview(
            localStorage.getItem("userId")
          );
          setDataAll(data)
          setDataTable(data.projects);
          setDataTableFake(data.projects);

          // setDataFake(data.students);
          // setTeacher(data);
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
      title: "Sinh viên",
      render: (text, record, index) => (text = record.student.fullname),
    },
    {
      title: "MSSV",
      render: (text, record, index) => (text = record.student.number),
    },
    {
      title: "Giảng viên phản biện",
      render: (text, record, index) => (text = record.teacher.fullname),
    },
    {
      title: "Ngày tạo",
      render: (text, record, index) => {
        let dateObj = new Date(dataAll.created_time);

        const year = dateObj.getFullYear();
        const month = (dateObj.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
        const day = dateObj.getDate().toString().padStart(2, "0");

        const formattedDate = `${day}-${month}-${year}`;

        return (text = formattedDate);
      },
    },
  ];

  return (
    <div className="list-student mb-4">
      <div className="content-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">
          Danh sách đồ án phản biện
        </h6>
        <Search
          className="input-search"
          value={value}
          onChange={(e) => {
            const currValue = e.target.value;
            setValue(currValue);
            if (currValue) {
              const filteredData = dataTable.filter((entry) =>
                entry.student.fullname
                  .toLowerCase()
                  .includes(currValue.toLowerCase())
              );
              setDataTable(filteredData);
            } else {
              setDataTable(dataTableFake);
            }
          }}
          placeholder="Tên sinh viên..."
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
          dataSource={dataTable}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ListReviewProject;
