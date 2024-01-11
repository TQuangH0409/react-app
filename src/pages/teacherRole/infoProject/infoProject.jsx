import React, { useEffect, useState } from "react";
import "./infoProject.css";
import {
  Alert,
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Upload,
  message,
} from "antd";
import {
  downFileReport,
  getAllProject,
  getInfoProject,
  getInfoProjectByStudentId,
  getResearchAreas,
  getTeacherOrStudentById,
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
import { getAllResearchArea } from "../../../apis/apiAdmin";

export default function InfoProject() {
  const [dataProject, setDataProject] = useState([]);
  const [teacherRank, setTeacherRank] = useState("");
  const [teacherSchool, setTeacherSchool] = useState("");

  const [isNotProject, setIsNotProject] = useState(false);
  const [dataStudent, setDataStudent] = useState({});
  const [dataTeacher, setDataTeacher] = useState({});
  const [modal1Open, setModal1Open] = useState(false);
  const [nameProject, setNameProject] = useState("");
  const [descProject, setDescProject] = useState("");
  const [reportFileLink, setReportLinkFile] = useState("");

  const [commentTeacher, setCommentTeacher] = useState("");
  const [middleMark, setMiddleMark] = useState(null);
  const [finalMark, setFinalMark] = useState(null);

  const [isReload, setIsReload] = useState(true);
  const [success, setSusccess] = useState(false);
  const [warning, setWarning] = useState(false);
  const [infomation, setInfomation] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const [researchArea, setResearchArea] = useState([]);
  const [selectedArea, setSelectedArea] = useState([]);

  const student_id = window.location.pathname.slice(
    22,
    window.location.pathname.length
  );

  useEffect(() => {
    const getInfoTeacher = async () => {
      try {
        const teacherInfo = await getTeacherOrStudentById(
          localStorage.getItem("userId")
        );
        setDataTeacher(teacherInfo);
        setTeacherRank("Tiến sĩ")
        setTeacherSchool("Trường công nghệ thông tin & truyền thông")
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    getInfoTeacher();
  }, [isReload]);

  useEffect(() => {
    const getData = async () => {
      try {
        const dataResearchAreas = await getResearchAreas();
        setResearchArea(dataResearchAreas);
      } catch (error) {
        console.error("Error get research areas teacher:", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getInfoStudent = async () => {
      try {
        const studentInfo = await getTeacherOrStudentById(student_id);
        setDataStudent(studentInfo);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    getInfoStudent();
  }, [isReload]);

  useEffect(() => {
    const getInfoProject = async () => {
      try {
        const projectByStudentId = await getProjectByStudent(student_id);
        const projectById = await getProjectById(projectByStudentId.id);
        setDataProject(projectById);

        setIsNotProject(true);
      } catch (error) {}
    };
    getInfoProject();
  }, [isReload]);

  const handleChangeNameProject = (e) => {
    setNameProject(e.target.value);
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

  const [postSelectedArea, setPostSelectedArea] = useState([]);

  const handleResearchAreaChange = (selectedValues, OptionSelected) => {
    setSelectedArea(
      selectedValues.map((value, index) => {
        return {
          name: value,
          number: OptionSelected[index].number,
        };
      })
    );

    setPostSelectedArea(OptionSelected.map((item) => item.number));
  };

  const [formData, setFormData] = useState(null);
  const handleUpload = async ({ file, onSuccess, onError }) => {
    try {
      const newFormData = new FormData();
      newFormData.append("file", file);
      setFormData(newFormData);
      message.success("Thêm thành công!");
      onSuccess();
    } catch (error) {
      console.error("File upload error:", error);
      onError();
    }
  };
  const handleInfoProject = (id) => {
    if (isNotProject) {
      const putDataProject = async () => {
        try {
          await putProject(
            { name: nameProject, research_area: [...postSelectedArea] },
            id
          );
          setModal1Open(false);
          setSusccess(true);
          setIsReload(!isReload);
          setTimeout(() => {
            setSusccess(false);
          }, 3000);
        } catch (error) {
          console.error("Error fetching student data:", error);
          setErrorMsg(true);
          setModal1Open(true);
        }
      };
      putDataProject();
    } else {
      const postDataProject = async () => {
        try {
          const fileReport = await postFile(formData);
          const data = {
            name: nameProject,
            student_id: student_id,
            discription: {
              content: descProject,
              attach: fileReport.objectId,
            },
            research_area: [...postSelectedArea],
          };
          await postProject(data);
          setModal1Open(false);
          setIsReload(!isReload);
        } catch (error) {
          console.error("Error fetching student data:", error);
          setErrorMsg(true);

          setModal1Open(true);
        }
      };
      postDataProject();
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

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container_project">
      <Space
        direction="vertical"
        style={{
          width: "100%",
          position: "absolute",
          zIndex: "100",
          width: "400px",
          top: 20,
          right: "50%",
          transform: "translateX(50%)",
        }}
      >
        {success && (
          <Alert message="Thành công!" type="success" showIcon closable />
        )}
      </Space>
      <div className="container_project--info">
        <div className="container_project--top">
          <div className="container_project--topLeft">
            <h6>Thông tin sinh viên</h6>
            <div className="infoStudent">
              <Image width={"90%"} height={"100%"} src={dataStudent.avatar} />
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
                  <p>{dataStudent?.class}</p>
                </div>
                <div className="infoStudent-inner">
                  <strong>Khóa:</strong>
                  <p>{dataStudent?.gen}</p>
                </div>
                <div className="infoStudent-inner">
                  <strong>Trường/Viện:</strong>
                  <p>{dataStudent?.school}</p>
                </div>
                <div className="infoStudent-inner">
                  <strong>Email:</strong>
                  <p>{dataStudent?.email}</p>
                </div>
                <div className="infoStudent-inner">
                  <strong>Kỳ học:</strong>
                  <p>{dataStudent?.semester}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="container_project--topRight">
            <h6>Thông tin giảng viên</h6>
            <div className="infoTeacher">
              <Image width={"90%"} height={"100%"} src={dataTeacher.avatar} />
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
                  <p>{teacherRank}</p>
                </div>
                <div className="infoTeacher-inner">
                  <strong>Trường/Viện:</strong>
                  <p>{teacherSchool}</p>
                </div>
                <div className="infoTeacher-inner">
                  <strong>Email:</strong>
                  <p>{dataTeacher?.email}</p>
                </div>
                <div className="infoTeacher-inner">
                  <strong>Lĩnh vực nghiên cứu:</strong>
                  <div>
                    {dataTeacher.research_area?.map((item) => (
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
            {isNotProject ? "Thông tin đồ án" : "Tạo đồ án"}
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
          {isNotProject && (
            <div className="container_project--middle-content">
              <div className="infoProject-inner">
                <strong>Tên đề tài</strong>
                <p>{dataProject.name}</p>
              </div>
              <div className="infoProject-inner">
                <strong>Source code</strong>
                <a
                  style={{ marginBottom: "16px" }}
                  href={dataProject?.source_code}
                  target="_blank"
                >
                  {dataProject?.source_code}
                </a>
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
          title={isNotProject ? "Chỉnh sửa đồ án" : "Thêm mới đồ án"}
          centered
          open={modal1Open}
          okText={isNotProject ? "Lưu" : "Thêm mới"}
          cancelText="Hủy"
          onOk={() => handleInfoProject(dataProject.id)}
          onCancel={() => setModal1Open(false)}
        >
          <Form
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            Báo cáo="off"
          >
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập tên đề tài!",
                },
              ]}
              name="projectname"
              label="Tên đề tài"
            >
              <Input
                value={nameProject}
                onChange={handleChangeNameProject}
                placeholder="Đề tài..."
              />
            </Form.Item>
            <Form.Item label="Lĩnh vực nghiên cứu">
              <Select
                mode="multiple"
                value={selectedArea.map((item) => item.name)}
                defaultValue={dataProject.research_area?.map(
                  (item) => item.name
                )}
                style={{ width: "100%" }}
                options={researchArea.map((field) => {
                  return {
                    value: field.name,
                    label: field.name,
                    number: field.number,
                  };
                })}
                onChange={handleResearchAreaChange}
              />
            </Form.Item>
            <Form.Item label="Họ tên sinh viên">
              <Input disabled value={dataStudent?.fullname} />
            </Form.Item>
            <Form.Item label="Mã số sinh viên">
              <Input disabled value={dataStudent?.number} />
            </Form.Item>

            <Form.Item label="Mô tả" name={["user", "introduction"]}>
              <Input.TextArea
                rows={5}
                placeholder="Mô tả yêu cầu đồ án"
                onChange={(e) => setDescProject(e.target.value)}
              />
            </Form.Item>

            <Upload
              action={`http://localhost:3000/teacher/info-project/${student_id}`}
              listType="picture"
              multiple
              customRequest={handleUpload}
              accept=".pdf,.doc,.ppt,.pptx"
            >
              <Button style={{ margin: 0 }} icon={<UploadOutlined />}>
                Upload
              </Button>
            </Upload>
          </Form>
        </Modal>

        <div className="container_project--footer">
          <div className="project_evaluate">
            <h6>Đánh giá</h6>
            {isNotProject && (
              <div className="project_evaluate-content">
                <Input.TextArea
                  placeholder="Thêm nhận xét"
                  rows={6}
                  value={commentTeacher}
                  onChange={(e) => setCommentTeacher(e.target.value)}
                ></Input.TextArea>
                <div style={{ display: "grid", flex: "1" }}>
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
                    style={{ margin: "0" }}
                    type="primary"
                    htmlType="submit"
                    onClick={() => handleEvaluateProject(dataProject.id)}
                  >
                    Gửi
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
