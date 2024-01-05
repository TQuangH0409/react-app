import React, { useEffect } from "react";
import { useState } from "react";
import "./infoTeacher.css";
import { FormOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
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
  getResearchAreas,
  getTeacherById,
  postFile,
  putInfoTeacher,
} from "../../../apis/apiTeacher";
export default function InfoTeacher() {
  const [avatar, setAvatar] = useState("");
  const [teacherInfo, setTeacherInfo] = useState({});
  const [teacherName, setTeacherName] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherRank, setTeacherRank] = useState("");
  const [teacherSchool, setTeacherSchool] = useState("Trường CNTT&TT");
  const [teacherResearchArea, setTeacherResearchArea] = useState([]);
  const [isReload, setIsReload] = useState(true);
  const [researchArea, setResearchArea] = useState([]);
  const [experience, setExperience] = useState(1);

  // const handleSchoolChange = async (value) => {
  //   setTeacherSchool(value);
  //   // const updatedOptions = await fetchResearchFieldOptions(value);
  //   setResearchArea(updatedOptions);
  // };

  const handleResearchAreaChange = (selectedValues, valueSelected) => {
    try {
      // Update the selected research areas when the selection changes
      setTeacherResearchArea(
        selectedValues.map((value, index) => {
          // console.log(value, valueSelected.number);
          return {
            name: value,
            number: valueSelected[index].number,
            experience: experience,
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTeacherById();
        setTeacherInfo(data);
        setTeacherName(data.fullname);
        setTeacherId(data.number);
        setTeacherEmail(data.email);
        setTeacherRank("Tiến sĩ");
        setTeacherResearchArea(data.research_area);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchData();
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
  const handleSchoolChange = (school) => {
    setTeacherSchool(school);
  };

  const handleUpdateTeacher = async () => {
    try {
      const updatedTeacherData = await putInfoTeacher(teacherInfo.id, {
        ...teacherInfo,
        fullname: teacherName,
        number: teacherId,
        email: teacherEmail,
        research_area: [...teacherResearchArea],
      });
      setModal1Open(false);
      setIsReload(!isReload);
      localStorage.setItem("fullname" , teacherName)
    } catch (error) {
      console.error("Error updating teacher:", error);
    }
  };

  useEffect(() => {
    const reportFile = async () => {
      try {
        const reportLink = await downFileReport(localStorage.getItem("avatarId"));
        setAvatar(reportLink.webContentLink);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    reportFile();
  }, [localStorage.getItem("avatarId")]);

  const handleUpload = async ({ file, onSuccess, onError }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await postFile(formData);
      localStorage.setItem("avatarId", response.objectId);
      message.success("Tải lên thành công");
      onSuccess();
    } catch (error) {
      console.error("File upload error:", error);
      onError();
    }
  };

  const [modal1Open, setModal1Open] = useState(false);

  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <div className="content__container">
      <div className="content-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Thông tin cá nhân</h6>
        <Button
          className="button-fix"
          onClick={() => setModal1Open(true)}
          shape="circle"
          icon={<FormOutlined />}
        >
          {" "}
        </Button>
        <Modal
          title="Chỉnh sửa thông tin"
          centered
          open={modal1Open}
          okText="Lưu"
          cancelText="Hủy"
          onOk={handleUpdateTeacher}
          onCancel={() => setModal1Open(false)}
        >
          <Form layout="vertical">
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              customRequest={handleUpload}
            >
              {fileList.length < 1 && "+ Upload"}
            </Upload>
            <Form.Item label="Họ và tên">
              <Input
                onChange={(e) => setTeacherName(e.target.value)}
                value={teacherName}
              />
            </Form.Item>
            <Form.Item label="Mã số giảng viên">
              <Input
                onChange={(e) => setTeacherId(e.target.value)}
                value={teacherId}
              />
            </Form.Item>
            <Form.Item label="Email">
              <Input
                onChange={(e) => setTeacherEmail(e.target.value)}
                value={teacherEmail}
              />
            </Form.Item>
            <Form.Item label="Cấp bậc">
              <Input
                onChange={(e) => setTeacherRank(e.target.value)}
                value={teacherRank}
              />
            </Form.Item>

            <Form.Item label="Trường/Viện">
              <Select
                value={teacherSchool}
                style={{ width: "100%" }}
                onChange={handleSchoolChange}
              >
                <Select.Option value="School1">Trường CNTT&TT</Select.Option>
                <Select.Option value="School2">
                  Trường Điện - điện tử
                </Select.Option>
                <Select.Option value="School3">Trường Cơ khí</Select.Option>
                <Select.Option value="School4">
                  Trường Hóa và Khoa học sự sống
                </Select.Option>
                <Select.Option value="School5">Trường Vật liệu</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Lĩnh vực nghiên cứu">
              <Select
                mode="multiple"
                value={teacherResearchArea.map((item) => item.name)}
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
            <Form.Item label="Năm kinh nghiệm">
              <InputNumber
                min={1}
                max={20}
                value={experience}
                onChange={(value) => setExperience(value)}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>

      <div className="body">
        <div className="body_avatar">
          <Image width={"100%"} height={"100%"} src={avatar} />
        </div>
        {
          <div className="body_content">
            <div className="body_content_left">
              <div className="body_content_left--inner">
                <strong>Họ và tên: </strong>
                <p className="body_content_left--inner--name">
                  {teacherInfo.fullname}
                </p>
              </div>
              <div className="body_content_left--inner">
                <strong>Mã số giảng viên: </strong>
                <p>{teacherInfo.number}</p>
              </div>
              <div className="body_content_left--inner">
                <strong>Email: </strong>
                <p className="body_content_left--inner--name">
                  {teacherInfo.email}
                </p>
              </div>
            </div>

            <div className="body_content_right">
              <div className="body_content_right--inner">
                <strong>Cấp bậc: </strong>
                {/* <p>{teacherInfo?.degree}</p> */}
                <p>Tiến sĩ</p>
              </div>
              <div className="body_content_right--inner">
                <strong>Trường/Viện: </strong>
                <p>CNTT&TT</p>
              </div>
              <div className="body_content_right--inner">
                <strong>Lĩnh vực nghiên cứu: </strong>
                <div>
                  {teacherInfo.research_area?.map((item) => {
                    return (
                      <div className="research_area">
                        <p>{item.name}</p>
                        <p>{item.experience} năm</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
