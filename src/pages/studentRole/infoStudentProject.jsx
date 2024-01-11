import { Col, Row, Upload, message, Modal, Input, } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../apis/apiStudent";
import { getProjectById, getProjectByStudent, updateProject } from "../../apis/apiProject";
import { sendReport } from "../../apis/apiStudent";
import {
  setInfoInstruct,
  setInfoProject,
  setInfoStudent,
  setInfoReview,
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

  console.log(fileList)

  const uploadProps = {
    name: "file",
    fileList,
    multiple: true,
    onChange: handleFileChange,
    beforeUpload: async (file) => {
      // Add custom file type validation if needed
      const isFileTypeValid =
        file.type === "application/msword" ||
        file.type === "application/vnd.ms-excel" ||
        file.type ===
        "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      if (!isFileTypeValid) {
        message.error("Only .doc, .xlsx, and .pptx files are allowed!");
        return false;
      }

      if(fileList) {
      try {
        // Assuming this block is within an asynchronous function
        const reportData = [];
        
        for (const file of fileList) {
          const formData = new FormData();
          formData.append("file", file);
          const res = await sendReport(formData);
          
          reportData.push(res.objectId)

        }

        console.log(reportData)
      
        // The rest of your logic after successful API calls
      
      } catch (error) {
        console.error("API Error:", error);
        // Handle API error if needed
        message.error("File upload failed. Please try again.");
        return false; // Prevent the upload if the API call fails
      }
    }

      // Return false to prevent immediate upload, since we'll handle it in the API call
      return false;
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
  const [project, setProject] = useState(undefined);
  const [projectDetail, setProjectDetail] = useState(undefined);
  const [modalSourceCode, isModalSourceCode] = useState(false);
  const [sourceCode, setSourceCode] = useState('');
  const dispatch = useDispatch();

  const handleSourceCodeChange = (event) => {
    setSourceCode(event.target.value);
  }

  const handleUpdateSourceCode = async () => {
    try {
      const body = { source_code: sourceCode }
      const res = await updateProject(projectDetail.id, body);
      isModalSourceCode(false);
    }
    catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const s = await getUserById();
        setStudent(s);

        const ass = await getAss({
          student: localStorage.getItem("userId"),
          type: "INSTRUCT",
        });
        if (ass) {
          const instruct = await getUserById(ass?.teacher.id);
          setInstruct(instruct);
        }

        const rev = await getAss({
          student: localStorage.getItem("userId"),
          type: "REVIEW",
        });

        if (rev) {
          const review = await getUserById(rev?.teacher.id);
          setReview(review);
        }
        const project = await getProjectByStudent(s.id);
        if (project) {
          setProject(project);

          const projectDetail = await getProjectById(project.id);

          setProjectDetail(projectDetail);
        }

        dispatch(setInfoStudent(s));
        dispatch(setInfoInstruct(instruct));
        dispatch(setInfoReview(review));
        dispatch(setInfoProject(projectDetail));
      } catch (error) { }
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
                    src={instruct.avatar}
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
                      <Col span={16}>{instruct?.fullname}</Col>
                    </Row>
                  </Col>
                  <Col
                    span={24}
                    style={{ marginBottom: "5px", marginTop: "5px" }}
                  >
                    <Row span={24}>
                      <Col span={8}>Mã số giảng viên:</Col>
                      <Col span={16}>{instruct?.number}</Col>
                    </Row>
                  </Col>
                  <Col
                    span={24}
                    style={{ marginBottom: "5px", marginTop: "5px" }}
                  >
                    <Row span={24}>
                      <Col span={8}>Cấp bậc:</Col>
                      <Col span={16}>{instruct?.class}</Col>
                    </Row>
                  </Col>
                  <Col
                    span={24}
                    style={{ marginBottom: "5px", marginTop: "5px" }}
                  >
                    <Row span={24}>
                      <Col span={8}>Trường/Viện:</Col>
                      <Col span={16}>{instruct?.school}</Col>
                    </Row>
                  </Col>
                  <Col
                    span={24}
                    style={{ marginBottom: "5px", marginTop: "5px" }}
                  >
                    <Row span={24}>
                      <Col span={8}>Email:</Col>
                      <Col span={16}>{instruct?.email}</Col>
                    </Row>
                  </Col>
                  <Col
                    span={24}
                    style={{ marginBottom: "5px", marginTop: "5px" }}
                  >
                    <Row span={24}>
                      <Col span={8}>Lĩnh vực nghiên cứu:</Col>
                      <Col span={16}>
                        {instruct?.research_area &&
                          instruct?.research_area.map((r, idx) => {
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
                    src={review?.avatar}
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
                      <Col span={16}>{review?.fullname}</Col>
                    </Row>
                  </Col>
                  <Col
                    span={24}
                    style={{ marginBottom: "5px", marginTop: "5px" }}
                  >
                    <Row span={24}>
                      <Col span={8}>Mã số giảng viên:</Col>
                      <Col span={16}>{review?.number}</Col>
                    </Row>
                  </Col>
                  <Col
                    span={24}
                    style={{ marginBottom: "5px", marginTop: "5px" }}
                  >
                    <Row span={24}>
                      <Col span={8}>Cấp bậc:</Col>
                      <Col span={16}>{review?.class}</Col>
                    </Row>
                  </Col>
                  <Col
                    span={24}
                    style={{ marginBottom: "5px", marginTop: "5px" }}
                  >
                    <Row span={24}>
                      <Col span={8}>Trường/Viện:</Col>
                      <Col span={16}>{review?.schooln}</Col>
                    </Row>
                  </Col>
                  <Col
                    span={24}
                    style={{ marginBottom: "5px", marginTop: "5px" }}
                  >
                    <Row span={24}>
                      <Col span={8}>Email:</Col>
                      <Col span={16}>{review?.email}</Col>
                    </Row>
                  </Col>
                  <Col
                    span={24}
                    style={{ marginBottom: "5px", marginTop: "5px" }}
                  >
                    <Row span={24}>
                      <Col span={8}>Lĩnh vực nghiên cứu:</Col>
                      <Col span={16}>
                        {review?.research_area &&
                          review?.research_area.map((r, idx) => {
                            return (
                              <Col span={24} key={review + idx}>
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
      </Row>
      <Row>
        <Col className="info-student-title" span={24}>
          {`Thông tin đồ án ${projectDetail ? "" : `(chưa có đồ án)`}`}
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Row style={{ margin: "20px" }}>
            <Col span={8}>Tên đề tài:</Col>
            <Col span={12}>{projectDetail?.name}</Col>
          </Row>
          <Row style={{ margin: "20px" }}>
            <Col span={8}>
              Source code
              {projectDetail && <EditOutlined
                onClick={() => isModalSourceCode(true)}
                style={{ marginLeft: 8 }}
              />}
              :
            </Col>
            <Col span={12}>
              <a href={projectDetail ? projectDetail.source_code : ""}>
                {projectDetail ? projectDetail.source_code : ""}
              </a>
            </Col>
          </Row>
          <Row style={{ margin: "20px" }}>
            <Col span={12} style={{ display: "flex" }}>
              <p>Báo cáo</p>
              {projectDetail && <Upload
                {...uploadProps}

              >
                <VerticalAlignTopOutlined />
              </Upload>}
              <p>:</p>
            </Col>
            <Col span={12}>
              <Row>
                {projectDetail && projectDetail?.report && projectDetail.report.map(r => {
                  return <Col span={8} style={{ display: "flex" }}>
                    <p>{r.name}</p>
                    {projectDetail && <Dragger
                      {...uploadProps}
                      style={{
                        maxHeight: "24px",
                        width: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <VerticalAlignTopOutlined />
                    </Dragger>}
                    <p>:</p>
                  </Col>
                })}
              </Row>
            </Col>
          </Row>
          <Row style={{ margin: "20px" }}>
            <Col span={8}>Điểm quá trình:</Col>
            <Col span={12}>{projectDetail?.rate?.mark_mid}</Col>
          </Row>
          <Row style={{ margin: "20px" }}>
            <Col span={8}>Điểm cuối kì:</Col>
            <Col span={12}>{projectDetail?.rate?.mark_final}</Col>
          </Row>
          <Row style={{ margin: "20px" }}>
            <Col span={8}>Đánh giá:</Col>
            <Col span={12}>{projectDetail?.rate?.comment}</Col>
          </Row>
        </Col>
      </Row>
      <Modal title="Thêm source code" open={modalSourceCode} onOk={handleUpdateSourceCode} onCancel={() => isModalSourceCode(false)}>
        <Input value={sourceCode} onChange={handleSourceCodeChange} />
      </Modal>
    </>
  );
};

export default InfoStudentProject;
