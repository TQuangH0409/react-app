import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import "./infoStudent.css";
import { getUserById } from "../../apis/apiStudent";
import { getAss } from "../../apis/apiAss";
import { getProjectById, getProjectByStudent } from "../../apis/apiProject";
import { useDispatch, useSelector } from "react-redux";
import {
  SetStudent,
  setCheck,
  setInfoInstruct,
  setInfoProject,
  setInfoStudent,
} from "../../hook/slice";
import { EditOutlined } from "@ant-design/icons";
import UpdateStudent from "./updateStudent";

const InfoStudent = () => {
  const [student, setStudent] = useState({});
  const [instruct, setInstruct] = useState(undefined);
  const [review, setReview] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const s = await getUserById();
        setStudent(s);
        const ass = await getAss({
          student: localStorage.getItem("userId"),
          type: "INSTRUCT",
        });
        const instruct = await getUserById(ass?.teacher.id);
        setInstruct(instruct);

        const project = await getProjectByStudent();
        const projectDetail = await getProjectById(project.id);
        dispatch(setInfoStudent(s));
        dispatch(setInfoInstruct(instruct));
        // dispatch(setInfoProject(projectDetail));
        dispatch(setCheck(1));
      } catch (error) {
        console.log("🚀 ~ file: updateStudent.jsx:18 ", error);
      }
    };

    fetchData();
  }, []);
  const studentT = useSelector((state) => {
    console.log(
      "🚀 ~ file: updateStudent.jsx:18 ~ UpdateStudent ~ student:",
      state.store.student,
      state.store.check
    );
    return state.store.student;
  });
  return (
    <div>
      <Row>
        <Col className="info-student-title" span={24}>
          Thông tin sinh viên
          <EditOutlined
            onClick={() => {
              setIsModalOpen(true);
            }}
          />
        </Col>
      </Row>
      {isModalOpen && <UpdateStudent isModalOpen={isModalOpen} />}
      <Row>
        <Col span={12}>
          <Row>
            <Col span={8}>
              <div className="avatar">
                <img
                  src="https://drive.google.com/uc?id=1k6R3GiOpZB6YZSPmvCuJQSNtk1kTgY1s&export=download"
                  alt="Italian Trulli"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </Col>
            <Col span={16}>
              <Row style={{ margin: "20px" }}>
                <Col span={24}>
                  <Row span={24} style={{ marginBottom: "15px" }}>
                    <Col span={8}>Họ và tên:</Col>
                    <Col span={16}>{student.fullname}</Col>
                  </Row>
                </Col>
                <Col
                  span={24}
                  style={{ marginBottom: "15px", marginTop: "15px" }}
                >
                  <Row span={24}>
                    <Col span={8}>Mã số sinh viên:</Col>
                    <Col span={16}>{student.number}</Col>
                  </Row>
                </Col>
                <Col
                  span={24}
                  style={{ marginBottom: "15px", marginTop: "15px" }}
                >
                  <Row span={24}>
                    <Col span={8}>Lớp:</Col>
                    <Col span={16}>{student.class}</Col>
                  </Row>
                </Col>
                <Col
                  span={24}
                  style={{ marginBottom: "15px", marginTop: "15px" }}
                >
                  <Row span={24}>
                    <Col span={8}>Khóa:</Col>
                    <Col span={16}>{student.gen}</Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <Row style={{ margin: "20px" }}>
                <Col span={24}>
                  <Row span={24} style={{ marginBottom: "15px" }}>
                    <Col span={8}>Email:</Col>
                    <Col span={16}>{student.email}</Col>
                  </Row>
                </Col>
                <Col
                  span={24}
                  style={{ marginBottom: "15px", marginTop: "15px" }}
                >
                  <Row span={24}>
                    <Col span={8}>Trường/Viện:</Col>
                    <Col span={16}>{student.school}</Col>
                  </Row>
                </Col>
                <Col
                  span={24}
                  style={{ marginBottom: "15px", marginTop: "15px" }}
                >
                  <Row span={24}>
                    <Col span={8}>Lĩnh vực nghiên cứu:</Col>
                    <Col span={16}>
                      <Row>
                        {student.research_area &&
                          student.research_area.map((r, idx) => {
                            return (
                              <Col span={24} key={student + idx}>
                                {r.name}
                              </Col>
                            );
                          })}
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col className="info-student-title" span={12}>
          Thông tin giảng viên hướng dẫn
        </Col>
        <Col className="info-student-title" span={12}>
          Thông tin giảng viên phản biện
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          {instruct && (
            <Row>
              <Col span={8}>
                <div className="avatar">
                  <img
                    src="https://drive.google.com/uc?id=1k6R3GiOpZB6YZSPmvCuJQSNtk1kTgY1s&export=download"
                    alt="Italian Trulli"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </Col>
              <Col span={16}>
                <Row style={{ margin: "20px" }}>
                  <Col span={24}>
                    <Row span={24} style={{ marginBottom: "5px" }}>
                      <Col span={8}>Họ và tên:</Col>
                      <Col span={16}>{instruct.fullname}</Col>
                    </Row>
                  </Col>
                  <Col
                    span={24}
                    style={{ marginBottom: "5px", marginTop: "5px" }}
                  >
                    <Row span={24}>
                      <Col span={8}>Mã số giảng viên:</Col>
                      <Col span={16}>{instruct.number}</Col>
                    </Row>
                  </Col>
                  <Col
                    span={24}
                    style={{ marginBottom: "5px", marginTop: "5px" }}
                  >
                    <Row span={24}>
                      <Col span={8}>Cấp bậc:</Col>
                      <Col span={16}>{instruct.class}</Col>
                    </Row>
                  </Col>
                  <Col
                    span={24}
                    style={{ marginBottom: "5px", marginTop: "5px" }}
                  >
                    <Row span={24}>
                      <Col span={8}>Trường/Viện:</Col>
                      <Col span={16}>{instruct.gen}</Col>
                    </Row>
                  </Col>
                  <Col
                    span={24}
                    style={{ marginBottom: "5px", marginTop: "5px" }}
                  >
                    <Row span={24}>
                      <Col span={8}>Email:</Col>
                      <Col span={16}>{instruct.email}</Col>
                    </Row>
                  </Col>
                  <Col
                    span={24}
                    style={{ marginBottom: "5px", marginTop: "5px" }}
                  >
                    <Row span={24}>
                      <Col span={8}>Lĩnh vực nghiên cứu:</Col>
                      <Col span={16}>
                        {instruct.research_area &&
                          instruct.research_area.map((r, idx) => {
                            return (
                              <Col span={24} key={instruct + idx}>
                                {r.name}
                              </Col>
                            );
                          })}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
        </Col>
        <Col span={12}>
          <Row>
            <Col span={8}>
              <div className="avatar">
                <img
                  src="https://drive.google.com/uc?id=1k6R3GiOpZB6YZSPmvCuJQSNtk1kTgY1s&export=download"
                  alt="Italian Trulli"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </Col>
            <Col span={16}>
              <Row style={{ margin: "20px" }}>
                <Col span={24}>
                  <Row span={24} style={{ marginBottom: "5px" }}>
                    <Col span={8}>Họ và tên:</Col>
                    <Col span={16}>{student.fullname}</Col>
                  </Row>
                </Col>
                <Col
                  span={24}
                  style={{ marginBottom: "5px", marginTop: "5px" }}
                >
                  <Row span={24}>
                    <Col span={8}>Mã số giảng viên:</Col>
                    <Col span={16}>{student.number}</Col>
                  </Row>
                </Col>
                <Col
                  span={24}
                  style={{ marginBottom: "5px", marginTop: "5px" }}
                >
                  <Row span={24}>
                    <Col span={8}>Cấp bậc:</Col>
                    <Col span={16}>{student.class}</Col>
                  </Row>
                </Col>
                <Col
                  span={24}
                  style={{ marginBottom: "5px", marginTop: "5px" }}
                >
                  <Row span={24}>
                    <Col span={8}>Trường/Viện:</Col>
                    <Col span={16}>{student.gen}</Col>
                  </Row>
                </Col>
                <Col
                  span={24}
                  style={{ marginBottom: "5px", marginTop: "5px" }}
                >
                  <Row span={24}>
                    <Col span={8}>Email:</Col>
                    <Col span={16}>{student.gen}</Col>
                  </Row>
                </Col>
                <Col
                  span={24}
                  style={{ marginBottom: "5px", marginTop: "5px" }}
                >
                  <Row span={24}>
                    <Col span={8}>Lĩnh vực nghiên cứu:</Col>
                    <Col span={16}>{student.gen}</Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default InfoStudent;
