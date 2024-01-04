import { Col, Row, Upload, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../apis/apiStudent";
import { getProjectById, getProjectByStudent } from "../../apis/apiProject";
import {
  setInfoInstruct,
  setInfoProject,
  setInfoStudent,
} from "../../hook/slice";
import { getAss } from "../../apis/apiAss";
import { EditOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
const InfoStudentProject = () => {
  //   const [instruct, setInstruct] = useState(undefined);
  //   const [review, setReview] = useState(undefined);

  //   const reviewData = useSelector((state) => state.store.review);
  //   const instructData = useSelector((state) => state.store.instruct);

  //   useEffect(() => {
  //     if (reviewData !== 0) {
  //       setReview(reviewData);
  //     }
  //     if (instructData !== 0) {
  //       setInstruct(instructData);
  //     }
  //   }, []);
  const [fileList, setFileList] = useState([]);

  const handleFileChange = ({ file, fileList }) => {
    // Handle file changes here
    setFileList(fileList);
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    fileList,
    onChange: handleFileChange,
    beforeUpload: (file) => {
      // Add custom file type validation if needed
      const isFileTypeValid =
        file.type === "application/msword" ||
        file.type === "application/vnd.ms-excel" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.presentationml.presentation";
      if (!isFileTypeValid) {
        message.error("Only .doc, .xlsx, and .pptx files are allowed!");
        return false;
      }
      return true;
    },
  };

  const handleEditClick = () => {
    // Handle edit click event here
    // For example, update the URL when the edit icon is clicked
    // Replace with your URL logic
  };

  const [student, setStudent] = useState({});
  const [instruct, setInstruct] = useState(undefined);
  const [review, setReview] = useState(undefined);
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
        dispatch(setInfoProject(projectDetail));
      } catch (error) {}
    };

    fetchData();
  }, []);

  return (
    <>
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
          {review && (
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
                      <Col span={16}>{review.fullname}</Col>
                    </Row>
                  </Col>
                  <Col
                    span={24}
                    style={{ marginBottom: "5px", marginTop: "5px" }}
                  >
                    <Row span={24}>
                      <Col span={8}>Mã số giảng viên:</Col>
                      <Col span={16}>{review.number}</Col>
                    </Row>
                  </Col>
                  <Col
                    span={24}
                    style={{ marginBottom: "5px", marginTop: "5px" }}
                  >
                    <Row span={24}>
                      <Col span={8}>Cấp bậc:</Col>
                      <Col span={16}>{review.class}</Col>
                    </Row>
                  </Col>
                  <Col
                    span={24}
                    style={{ marginBottom: "5px", marginTop: "5px" }}
                  >
                    <Row span={24}>
                      <Col span={8}>Trường/Viện:</Col>
                      <Col span={16}>{review.gen}</Col>
                    </Row>
                  </Col>
                  <Col
                    span={24}
                    style={{ marginBottom: "5px", marginTop: "5px" }}
                  >
                    <Row span={24}>
                      <Col span={8}>Email:</Col>
                      <Col span={16}>{review.gen}</Col>
                    </Row>
                  </Col>
                  <Col
                    span={24}
                    style={{ marginBottom: "5px", marginTop: "5px" }}
                  >
                    <Row span={24}>
                      <Col span={8}>Lĩnh vực nghiên cứu:</Col>
                      <Col span={16}>{review.gen}</Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
      <Row>
        <Col className="info-student-title" span={24}>
          Thông tin đồ án
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Row style={{ margin: "20px" }}>
            <Col span={8}>Tên đề tài:</Col>
            <Col span={12}>
              Thiết kế dịch vụ quản trị dữ liệu khách hàng và sản phẩm phục vụ
              cho các phần mềm CPFR
            </Col>
          </Row>
          <Row style={{ margin: "20px" }}>
            <Col span={8}>
              Source code
              <EditOutlined
                onClick={handleEditClick}
                style={{ marginLeft: 8 }}
              />
              :
            </Col>
            <Col span={12}>
              <a href="https://github.com/quangh0409/Decision_help_system_fe/blob/main/src/component/project/index.tsx">
                https://github.com/quangh0409/Decision_help_system_fe/blob/main/src/component/project/index.tsx
              </a>
            </Col>
          </Row>
          <Row style={{ margin: "20px" }}>
            <Col span={8} style={{ display: "flex" }}>
              <p>Báo cáo</p>
              <Dragger
                {...uploadProps}
                style={{
                  maxHeight: "24px",
                  width: "24px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <VerticalAlignTopOutlined />
              </Dragger>
              <p>:</p>
            </Col>
            <Col span={12}>
              Thiết kế dịch vụ quản trị dữ liệu khách hàng và sản phẩm phục vụ
              cho các phần mềm CPFR
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default InfoStudentProject;
