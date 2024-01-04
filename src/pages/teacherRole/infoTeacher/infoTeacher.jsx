import React, { useEffect } from "react";
import { useState } from "react";
import "./infoTeacher.css";
import { FormOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, InputNumber, Modal, Select } from "antd";
import { getTeacherById, putInfoTeacher } from "../../../apis/apiTeacher";
export default function InfoTeacher() {
  const [teacherInfo, setTeacherInfo] = useState({});
  const [teacherName, setTeacherName] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherRank, setTeacherRank] = useState("");
  const [teacherSchool, setTeacherSchool] = useState("Trường CNTT&TT");
  const [researchArea, setResearchArea] = useState([]);

  const handleSchoolChange = (value) => {
    const updatedOptions = fetchResearchFieldOptions(value);
    setResearchArea(updatedOptions);
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
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchData();
  }, []);

  const fetchResearchFieldOptions = (school) => {
    if (school === "School1") {
      return [
        "Khoa học máy tính",
        "Truyền thông dữ liệu và mạng máy tính​",
        "Công nghệ phần mềm​",
        "Kỹ thuật máy tính",
        "Kỹ thuật mạng",
        "Hệ thống quản lý thông tin",
        "Robot và Trí tuệ nhân tạo",
      ];
    } else if (school === "School2") {
      return [
        "Kỹ thuật Điện – Điện tử",
        "Kỹ thuật Điều khiển và Tự động hoá",
        "Kỹ thuật Điện Tử – Viễn thông",
      ];
    } else if (school === "School3") {
      return [
        "Động học",
        "Tĩnh học",
        "Sức bền vật liệu, truyền nhiệt",
        "Động lực dòng chảy",
        "Cơ học vật rắn",
        "Điều khiển học",
        "Khí động học",
        "Thủy lực",
        "Chuyển động học và các ứng dụng nhiệt động lực học",
      ];
    } else if (school === "School4") {
      return [
        "Hóa học",
        "Kỹ thuật hóa học",
        "Kỹ thuật hóa dược",
        "Kỹ thuật sinh học",
        "Kỹ thuật thực phẩm",
        "Kỹ thuật môi trường",
        "Quản lý tài nguyên và môi trường",
      ];
    } else if (school === "School5") {
      return [
        "Cơ học biến dạng và Cán kim loại",
        "Vật liệu và Công nghệ đúc",
        "Luyện kim màu và Luyện kim bột",
        "Vật liệu và Nhiệt luyện",
        "Luyện kim đen",
        "Vật liệu Polyme",
        "Vật liệu màng mỏng",
      ];
    } else {
      return [];
    }
  };

  const handleUpdateTeacher = async () => {
    try {
      // Assuming you have teacherId and teacherData state variables
      const updatedTeacherData = await putInfoTeacher(teacherInfo.id, {
        ...teacherInfo,
        fullname: teacherName,
        number: teacherId,
        email: teacherEmail,
        research_area: [...researchArea],
      });
      console.log("Teacher updated:", updatedTeacherData);

      // Close the modal after successful update
      setModal1Open(false);
    } catch (error) {
      console.error("Error updating teacher:", error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const [modal1Open, setModal1Open] = useState(false);

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
                {/* Replace with your actual options for schools */}
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
                value={teacherInfo.research_area?.map(item => item.name)}
                style={{ width: "100%" }}
                options={researchArea.map((field) => ({
                  value: field,
                  label: field,
                }))}
              />
            </Form.Item>
            <Form.Item label="Năm kinh nghiệm">
              <InputNumber
                min={1}
                max={20}
                defaultValue={1}
                onChange={console.log(123)}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>

      <div className="body">
        <div className="body_avatar">
          <Image
            width={"100%"}
            height={"100%"}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
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
