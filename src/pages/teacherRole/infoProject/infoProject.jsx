import React, { useEffect, useState } from "react";
import "./infoProject.css";
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Select,
  Upload,
  message,
} from "antd";
import {
  downFileReport,
  getAllProject,
  getInfoProject,
  getInfoProjectByStudentId,
  postFile,
  postProject,
  putProject,
} from "../../../apis/apiTeacher";
import {
  DownloadOutlined,
  FormOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { Link } from "react-router-dom";
import { getProjectById, getProjectByStudent } from "../../../apis/apiProject";

export default function InfoProject() {
  const [dataProject, setDataProject] = useState([]);
  const [isProject, setIsProject] = useState(true);
  const [dataStudent, setDataStudent] = useState({});
  const [dataTeacher, setDataTeacher] = useState({});
  const [modal1Open, setModal1Open] = useState(false);
  const [nameProject, setNameProject] = useState("");
  const [descProject, setDescProject] = useState("");
  const [reportFileLink, setReportLinkFile] = useState("");

  const [commentTeacher, setCommentTeacher] = useState("");
  const [middleMark, setMiddleMark] = useState(null);
  const [finalMark, setFinalMark] = useState(null);

  const student_id = window.location.pathname.slice(
    22,
    window.location.pathname.length
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProject(localStorage.getItem("userId"));
        const getStudentById = data.students.filter(
          (item) => item.id === student_id
        );
        setDataStudent(getStudentById[0]);
        setDataTeacher(data.teacher);
        const proI = await getProjectByStudent(student_id);
        const pro = await getProjectById(proI.id);
        // const project = getInfoProject(getStudentById.project.id);
        setDataProject(pro);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const getProject = async () => {
  //     try {
  //       const project = await getInfoProject(dataProject.project?.id);
  //       setDataProject(project);
  //     } catch (error) {
  //       setIsProject(false);
  //       console.error("Error fetching student data:", error);
  //     }
  //   };
  //   getProject();
  // }, []);

  const handleChangeNameProject = (e) => {
    setNameProject(e.target.value);
  };

  const handleInfoProject = (id) => {
    if (isProject) {
      const putDataProject = async () => {
        try {
          await putProject({ name: nameProject }, id);
          setModal1Open(false);
        } catch (error) {
          console.error("Error fetching student data:", error);
          setModal1Open(true);
        }
      };
      putDataProject();
    } else {
      const postData = async () => {
        try {
          const data = {
            name: nameProject,
            student_id: student_id,
            discription: {
              content: descProject,
              attach: "1k6E0tsBbZm2QzVRqcaoXdRzPwx5qUyOm",
            },
            research_area: function () {
              dataTeacher.research_area.map((item) => item.number);
            },
          };
          await postProject(data);
          setModal1Open(false);
        } catch (error) {
          console.error("Error fetching student data:", error);
          setModal1Open(true);
        }
      };
      postData();
    }
  };

  const handleEvaluateProject = (id) => {
    const evaluateProject = async () => {
      try {
        await putProject(
          {
            rate: {
              comment: commentTeacher,
              mark_mid: middleMark,
              mark_final: finalMark,
            },
          },
          id
        );
      } catch (error) {
        console.error("Error fetching student data:", error);
        setModal1Open(true);
      }
    };
    evaluateProject();
  };

  const handleUpload = async ({ file, onSuccess, onError }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      // You may need to adjust the API endpoint based on your server setup
      const response = await postFile(formData);

      // Assuming the server returns a success message
      message.success(response.data.message);

      // Invoke onSuccess to indicate a successful upload
      onSuccess();
    } catch (error) {
      // Handle errors
      console.error("File upload error:", error);

      // Invoke onError to indicate a failed upload
      onError();
    }
  };

  const handleDownFile = (idReportFile) => {
    const reportFile = async () => {
      try {
        const reportLink = await downFileReport(idReportFile);
        setReportLinkFile(reportLink.webContentLink);
      } catch (error) {
        console.error("Error fetching student data:", error);
        setModal1Open(true);
      }
    };
    reportFile();
  };

  return (
    <div className="container_project">
      <div className="container_project--info">
        <div className="container_project--top">
          <div className="container_project--topLeft">
            <h6>Thông tin sinh viên</h6>
            <div className="infoStudent">
              <Image
                width={"90%"}
                height={"100%"}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
              <div>
                <div className="infoStudent-inner">
                  <strong>Họ và tên:</strong>
                  <p>{dataStudent?.fullname}</p>
                </div>
                <div className="infoStudent-inner">
                  <strong>Mã số sinh viên:</strong>
                  <p>{dataStudent?.number}</p>
                </div>
                <div className="infoStudent-inner">
                  <strong>Lớp:</strong>
                  <p>IT-LTU</p>
                </div>
                <div className="infoStudent-inner">
                  <strong>Khóa:</strong>
                  <p>64</p>
                </div>
                <div className="infoStudent-inner">
                  <strong>Trường/Viện:</strong>
                  <p>CNTT&TT</p>
                </div>
                <div className="infoStudent-inner">
                  <strong>Email:</strong>
                  <p>{dataStudent?.email}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="container_project--topRight">
            <h6>Thông tin giảng viên</h6>
            <div className="infoTeacher">
              <Image
                width={"90%"}
                height={"100%"}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
              <div>
                <div className="infoTeacher-inner">
                  <strong>Họ và tên:</strong>
                  <p>{dataTeacher?.fullname}</p>
                </div>
                <div className="infoTeacher-inner">
                  <strong>Mã số giảng viên:</strong>
                  <p>{dataTeacher?.number}</p>
                </div>
                <div className="infoTeacher-inner">
                  <strong>Cấp bậc:</strong>
                  <p>Tiến sĩ</p>
                </div>
                <div className="infoTeacher-inner">
                  <strong>Trường/Viện:</strong>
                  <p>CNTT&TT</p>
                </div>
                <div className="infoTeacher-inner">
                  <strong>Email:</strong>
                  <p>{dataTeacher?.email}</p>
                </div>
                <div className="infoTeacher-inner">
                  <strong>Lĩnh vực nghiên cứu:</strong>
                  <div>
                    {dataTeacher.reseach_areas?.map((item) => (
                      <div className="infoTeacher-inner_researhch-area">
                        <p style={{ marginRight: "50px" }}>{item.name}</p>
                        <p>{item.experience} năm</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container_project--middle">
          <h6>
            Tạo đồ án{" "}
            <p style={{ "margin-bottom": "4px" }}>
              <Button
                className="button-fix"
                onClick={() => setModal1Open(true)}
                shape="circle"
                icon={<FormOutlined />}
              >
                {" "}
              </Button>
            </p>
          </h6>
          {isProject && (
            <div className="container_project--middle-content">
              <div className="infoProject-inner">
                <strong>Tên đề tài</strong>
                <p>{dataProject.name}</p>
              </div>
              <div className="infoProject-inner">
                <strong>Source code</strong>
                <Link
                  style={{ marginBottom: "16px" }}
                  to={`https://www.google.com/`}
                >
                  {dataProject?.source_code}
                </Link>
              </div>
              <div className="infoProject-inner">
                <strong>Báo cáo</strong>
                <div style={{ display: "flex" }}>
                  {dataProject.report?.map((item, index) => {
                    return (
                      <a
                        onClick={() => handleDownFile(item.objectId)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                          fontSize: "13px",
                        }}
                        href={reportFileLink}
                        download
                      >
                        <DownloadOutlined />
                        <p style={{ margin: "0 20px 0 4px" }}>
                          Báo cáo lần {index + 1}
                        </p>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
        <Modal
          title="Thêm mới đồ án"
          centered
          open={modal1Open}
          okText="Lưu"
          cancelText="Hủy"
          onOk={() => handleInfoProject(dataProject.id)}
          onCancel={() => setModal1Open(false)}
        >
          <Form layout="vertical">
            <Form.Item label="Tên đề tài">
              <Input
                value={nameProject}
                onChange={handleChangeNameProject}
                placeholder="Đề tài..."
              />
            </Form.Item>
            <Form.Item label="Họ tên sinh viên">
              <Input disabled value={dataStudent[0]?.fullname} />
            </Form.Item>
            <Form.Item label="Mã số sinh viên">
              <Input disabled value={dataStudent[0]?.number} />
            </Form.Item>
            <Form.Item label="Mô tả" name={["user", "introduction"]}>
              <Input.TextArea
                disabled={isProject}
                rows={5}
                placeholder="Mô tả yêu cầu đồ án"
              />
            </Form.Item>

            <Upload
              action={`http://localhost:3000/teacher/info-project/${student_id}`}
              listType="picture"
              multiple
              customRequest={handleUpload}
              accept=".pdf,.doc,.ppt,.pptx"
            >
              <Button
                disabled={isProject}
                style={{ margin: 0 }}
                icon={<UploadOutlined />}
              >
                Upload
              </Button>
            </Upload>
          </Form>
        </Modal>

        <div className="container_project--footer">
          <div className="project_exchange">
            <h6>Trao đổi</h6>
            <div className="project_exchanger-content"></div>
          </div>
          <div className="project_evaluate">
            <h6>Đánh giá</h6>
            {isProject && (
              <div className="project_evaluate-content">
                <Form>
                  <Input.TextArea
                    placeholder="Thêm nhận xét"
                    rows={6}
                    value={commentTeacher}
                    onChange={(e) => setCommentTeacher(e.target.value)}
                  ></Input.TextArea>
                  <div style={{ width: "100%" }}>
                    <InputNumber
                      width={"100%"}
                      min={0}
                      max={10}
                      size="large"
                      placeholder="Nhập điểm quá trình"
                      value={middleMark}
                      onChange={(e) => setMiddleMark(e)}
                    />
                  </div>
                  <div style={{ width: "100%" }}>
                    <InputNumber
                      min={0}
                      max={10}
                      size="large"
                      placeholder="Nhập điểm cuối kì"
                      value={finalMark}
                      onChange={(e) => setFinalMark(e)}
                    />
                  </div>
                  <Button
                    style={{ margin: "0", marginTop: "30px" }}
                    type="primary"
                    htmlType="submit"
                    onClick={() => handleEvaluateProject(dataProject.id)}
                  >
                    Gửi
                  </Button>
                </Form>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="container_project--bottom"></div>
    </div>
  );
}
