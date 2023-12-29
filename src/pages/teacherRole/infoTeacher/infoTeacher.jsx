import React from "react";
import { useState } from "react";
import "./infoTeacher.css";
import { FormOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, Modal, Select } from "antd";

export default function InfoTeacher() {
  const [option, setOption] = "";
  var teacher = {
    avatarUrl: "./avatar.jpg",
    name: "Nguyễn Cẩm Tú",
    teacherId: "NVC22091998",
    email: "vietnguyen0305@gmail.com",
    rank: "64",
    school_institute: "CNTT&TT",
    research_area: [
      {
        name: "Xử lý ngôn ngữ tự nhiên",
        experience: 3,
      },
      {
        name: "Xử lý ngôn ngữ tự nhiên",
        experience: 3,
      },
    ],
  };
  const options1 = [
    {
      value: "Công nghệ thông tin",
      label: "Trường CNTT&TT",
      index: 0,
    },
    {
      value: "Điện tử",
      label: "Trường Điện tử",
      index: 1,
    },
    {
      value: "Cơ khí",
      label: "Trường Cơ khí",
      index: 2,
    },
  ];
  const options2 = [
    {
      value: "CNTT&TT",
      label: "Xử lý ngôn ngữ tự nhiên",
    },
    {
      value: "dt",
      label: "Machine Learning",
    },
    {
      value: "ck",
      label: "An ninh mạng",
    },
  ];

  const handleOption = () => {
    return [
      {
        value: "CNTT&TT",
        label: "Xử lý ngôn ngữ tự nhiên",
      },
      {
        value: "dt",
        label: "Machine Learning",
      },
      {
        value: "ck",
        label: "An ninh mạng",
      },
    ];
  };

  const [selectedSchool, setSelectedSchool] = useState("");
  const [researchFieldOptions, setResearchFieldOptions] = useState([]);

  const handleSchoolChange = (value) => {
    setSelectedSchool(value);

    const updatedOptions = fetchResearchFieldOptions(value);

    setResearchFieldOptions(updatedOptions);
  };

  const fetchResearchFieldOptions = (school) => {
    if (school === "School1") {
      return ["Field1", "Field2", "Field3"];
    } else if (school === "School2") {
      return ["Field4", "Field5", "Field6"];
    } else {
      return [];
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
          onOk={() => setModal1Open(false)}
          onCancel={() => setModal1Open(false)}
        >
          <Form layout="vertical">
            <Form.Item label="Họ và tên">
              <Input />
            </Form.Item>
            <Form.Item label="CCCD">
              <Input />
            </Form.Item>
            <Form.Item label="Email">
              <Input />
            </Form.Item>
            <Form.Item label="Cấp bậc">
              <Input />
            </Form.Item>

            <Form.Item label="Trường/Viện">
              <Select
                defaultValue=""
                style={{ width: "100%" }}
                onChange={handleSchoolChange}
              >
                {/* Replace with your actual options for schools */}
                <Select.Option value="School1">School1</Select.Option>
                <Select.Option value="School2">School2</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Lĩnh vực nghiên cứu">
              <Select
                defaultValue=""
                style={{ width: "100%" }}
                options={researchFieldOptions.map((field) => ({
                  value: field,
                  label: field,
                }))}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div className="body">
        <div className="body_avatar">
          <Image
            width={"100%"}
            height={300}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div>
        <div className="body_content">
          <div className="body_content_left">
            <div className="body_content_left--inner">
              <strong>Họ và tên: </strong>
              <p className="body_content_left--inner--name">{teacher.name}</p>
            </div>
            <div className="body_content_left--inner">
              <strong>Mã số giảng viên: </strong>
              <p>{teacher.teacherId}</p>
            </div>
            <div className="body_content_left--inner">
              <strong>Email: </strong>
              <p className="body_content_left--inner--name">{teacher.email}</p>
            </div>
          </div>

          <div className="body_content_right">
            <div className="body_content_right--inner">
              <strong>Cấp bậc: </strong>
              <p>{teacher.rank}</p>
            </div>
            <div className="body_content_right--inner">
              <strong>Trường/Viện: </strong>
              <p>{teacher.school_institute}</p>
            </div>
            <div className="body_content_right--inner">
              <strong>Lĩnh vực nghiên cứu: </strong>
              <div>
                {teacher.research_area.map((item) => {
                  return (
                    <div className="research_area">
                      <p>{item.name}</p>
                      <p>{item.experience}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
