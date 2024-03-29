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
import avatarUser from "../../../assets/images/avatar.png";
export default function InfoTeacher() {
  const [modal1Open, setModal1Open] = useState(false);

  const [teacherInfo, setTeacherInfo] = useState({});
  const [avatar, setAvatar] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherRank, setTeacherRank] = useState("");
  const [teacherSchool, setTeacherSchool] = useState("");
  const [selectedArea, setSeletedArea] = useState([]);
  const [isReload, setIsReload] = useState(true);

  const [teacherSchoolSelected, setTeacherSchoolSelected] =
    useState("Trường CNTT&TT");
  const [researchArea, setResearchArea] = useState([]);
  const [experience, setExperience] = useState(1);

  const handleResearchAreaChange = (selectedValues, valueSelected) => {
    try {
      console.log(valueSelected);
      setSeletedArea(
        selectedValues.map((value, index) => {
          console.log(value);
          return {
            name: value,
            number: valueSelected[index].number,
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
        const data = await getTeacherOrStudentById(
          localStorage.getItem("userId")
        );
        setTeacherInfo(data);
        setAvatar(data.avatar);
        setTeacherName(data.fullname);
        setTeacherId(data.number);
        setTeacherEmail(data.email);
        setTeacherRank(data.degree);
        setSeletedArea(data.research_area);
        setTeacherSchool("Trường Công nghệ thông tin & Truyền thông");
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
    setTeacherSchoolSelected(school);
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
        avatar = await postFile(formData);
      }
      await putInfoTeacher(teacherInfo.id, {
        ...teacherInfo,
        avatar: avatar.objectId,
        fullname: teacherName,
        number: teacherId,
        email: teacherEmail,
        research_area: [...selectedArea],
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
                value={teacherSchoolSelected}
                style={{ width: "100%" }}
                onChange={handleSchoolChange}
              >
                <Select.Option value="School1">
                  Trường Công nghệ thông tin & truyền thông
                </Select.Option>
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
                value={selectedArea.map((item) => item.name)}
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
              {selectedArea.map((item, index) => {
                return (
                  <InputNumber
                    min={1}
                    max={20}
                    value={item?.experience}
                    onChange={(value) => setExperience(value)}
                  />
                );
              })}
            </Form.Item>
          </Form>
        </Modal>
      </div>

      <div className="body">
        <div className="body_avatar">
          <Image width={"100%"} height={"100%"} src={avatarUser} />
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
                <p>{teacherInfo.degree}</p>
              </div>
              <div className="body_content_right--inner">
                <strong>Trường/Viện: </strong>
                <p>{teacherSchool}</p>
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
