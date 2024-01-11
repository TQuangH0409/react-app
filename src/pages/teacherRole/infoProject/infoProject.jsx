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
import { getAllResearchArea } from "../../../apis/apiAdmin";

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

  const [isReload, setIsReload] = useState(true)
  const [dataResearch, setDataResearch] = useState([]);
  const [info] = Form.useForm();

  const student_id = window.location.pathname.slice(
    22,
    window.location.pathname.length
  );

  const dataSelect =
    dataResearch?.length &&
    dataResearch.map((value) => {
      return {
        value: value.number,
        label: value.name,
      }
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProject(localStorage.getItem("userId"));
        const getStudentById = data.students.filter(
          (item) => item.id === student_id
        );
        setDataStudent(getStudentById[0]);
        console.log(dataStudent)
        setDataTeacher(data.teacher);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllResearchArea();
        setDataResearch(data)
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getProject = async () => {
      try {
        const proI = await getProjectByStudent(student_id);
        const pro = await getProjectById(proI.id);
        setDataProject(pro);
      } catch (error) {
        setIsProject(false);
        console.error("Error fetching student data:", error);
      }
    };
    getProject();
  }, []);

  useEffect(() => {
    if (dataStudent && isProject === false) {
      const dataIDandName = {
        fullname: dataStudent.fullname,
        id: dataStudent.id
      }
      info.setFieldsValue(dataIDandName);
    }
  }, [dataStudent]);

  const handleChangeNameProject = (e) => {
    setNameProject(e.target.value);
  };

  const handleInfoProject = (id) => {
    if (isProject) {
      const putDataProject = async () => {
        try {
          await putProject({ name: nameProject }, id);
          setModal1Open(false);
          setIsReload(!isReload)
        } catch (error) {
          console.error("Error fetching student data:", error);
          setModal1Open(true);
        }
      };
      putDataProject();
    } else {
      const postData = async () => {
        try {
          
          const formValues = await info.validateFields();
          
          const researchAreaArray = formValues.research_area.map(area => area.value);

          // Tạo một đối tượng mới với các trường bổ sung
          const additionalFields = {
            research_area: researchAreaArray
          };

          // Kết hợp formValues và additionalFields
          const values = { ...formValues, ...additionalFields };
          console.log(values)
          const res = await postProject(values);
          setModal1Open(false);
          setIsReload(!isReload)

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

  const props = {
    name: 'file',
    accept: "application/pdf",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    

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
          {isProject ? "Thông tin đồ án" : "Tạo đồ án"}
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
        title="Thêm mới đồ án"
        centered
        open={modal1Open}
        okText="Lưu"
        cancelText="Hủy"
        onOk={() => handleInfoProject(dataProject.id)}
        onCancel={() => setModal1Open(false)}
      >
        <Form form={info} layout="vertical">
          <Form.Item name="name" label="Tên đề tài">
            <Input
              value={nameProject}
              onChange={handleChangeNameProject}
              placeholder="Đề tài..."
            />
          </Form.Item>
          <Form.Item label="Họ tên sinh viên" name="fullname" >
            <Input readOnly />
          </Form.Item>
          <Form.Item hidden label="Mã số sinh viên" name="id" >
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Lĩnh vực nghiên cứu:" name="research_area">
            <Select mode='multiple' labelInValue optionLabelProp="label" options={dataSelect}>

            </Select>
          </Form.Item>
          <Form.Item label="Mô tả" name="content" >
            <Input.TextArea
              disabled={isProject}
              rows={5}
              placeholder="Mô tả yêu cầu đồ án"
            />
          </Form.Item>

          <Upload
            {...props}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form>
      </Modal>

      <div className="container_project--footer">
        <div className="project_evaluate">
          <h6>Đánh giá</h6>
          {isProject && (
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
