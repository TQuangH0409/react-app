import React, { useEffect } from "react";
import { useState } from "react";
import "./infoTeacher.css";
import {
  FormOutlined,
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
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
  getResearchAreas,
  getTeacherOrStudentById,
  postFile,
  putInfoTeacher,
} from "../../../apis/apiTeacher";
export default function InfoTeacher() {
  const [modal1Open, setModal1Open] = useState(false);

  const [teacherInfo, setTeacherInfo] = useState({});
  const [avatar, setAvatar] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherRank, setTeacherRank] = useState("");
  const [teacherSchool, setTeacherSchool] = useState("Trường CNTT&TT");
  const [teacherResearchArea, setTeacherResearchArea] = useState([]);
  const [isReload, setIsReload] = useState(true);
  const [researchArea, setResearchArea] = useState([]);
  const [experience, setExperience] = useState(1);

  const handleResearchAreaChange = (selectedValues, valueSelected) => {
    try {
      if (selectedValues.length <= 3) {
        console.log(selectedValues, valueSelected);
        setTeacherResearchArea(
          selectedValues.map((value, index) => {
            return {
              name: value,
              number: valueSelected[index].number,
              experience: experience,
            };
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTeacherOrStudentById(
          localStorage.getItem("userId")
        );
        setTeacherInfo(data);
        setAvatar(data.avatar);
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
  const handleUpdateTeacher = async () => {
    try {
      let avatar = {};
      if (formData) {
        console.log(formData);
        avatar = await postFile(formData);
      }
      await putInfoTeacher(teacherInfo.id, {
        ...teacherInfo,
        avatar: avatar.objectId,
        fullname: teacherName,
        number: teacherId,
        email: teacherEmail,
        research_area: [...teacherResearchArea],
      });
      setModal1Open(false);
      setIsReload(!isReload);
    } catch (error) {
      console.error("Error updating teacher:", error);
    }
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
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
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              beforeUpload={beforeUpload}
              onChange={handleChange}
              customRequest={handleUpload}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: "100%",
                  }}
                />
              ) : (
                uploadButton
              )}
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
                value={teacherResearchArea[0]?.experience}
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
                <p className="body_content_left--inner--name">{teacherName}</p>
              </div>
              <div className="body_content_left--inner">
                <strong>Mã số giảng viên: </strong>
                <p>{teacherId}</p>
              </div>
              <div className="body_content_left--inner">
                <strong>Email: </strong>
                <p className="body_content_left--inner--name">{teacherEmail}</p>
              </div>
            </div>

            <div className="body_content_right">
              <div className="body_content_right--inner">
                <strong>Cấp bậc: </strong>
                <p>Tiến sĩ</p>
              </div>
              <div className="body_content_right--inner">
                <strong>Trường/Viện: </strong>
                <p>Công nghệ thông tin & truyền thông</p>
              </div>
              <div className="body_content_right--inner">
                <strong>Lĩnh vực nghiên cứu: </strong>
                <div>
                  {teacherResearchArea.map((item) => {
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
