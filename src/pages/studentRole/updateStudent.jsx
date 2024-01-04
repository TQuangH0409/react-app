import React, { useState } from "react";
import { Button, Col, Image, Input, Modal, Row } from "antd";
import { useSelector } from "react-redux";
const UpdateStudent = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(props.isModalOpen);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const student = useSelector((state) => {
    return state.store.student;
  });

  return (
    <>
      <Modal
        title="Chỉnh sửa thông tin cá nhân"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row>
          <Col className="update-student-key" span={24}>
            Ảnh đại diện <span style={{ color: "red" }}>*</span>
          </Col>
          <Col
            className="update-student-value"
            span={24}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              width={200}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </Col>
          <Col className="update-student-key" span={24}>
            Họ và tên <span style={{ color: "red" }}>*</span>
          </Col>
          <Col className="update-student-value" span={24}>
            <Input placeholder="" value={student.fullname} />
          </Col>
          <Col className="update-student-key" span={24}>
            Mã số sinh viên <span style={{ color: "red" }}>*</span>
          </Col>
          <Col className="update-student-value" span={24}>
            <Input placeholder="" value={student.number} />
          </Col>
          <Col className="update-student-key" span={24}>
            Khóa <span style={{ color: "red" }}>*</span>
          </Col>
          <Col className="update-student-value" span={24}>
            <Input placeholder="" value={student.gen} />
          </Col>
          <Col className="update-student-key" span={24}>
            Lớp <span style={{ color: "red" }}>*</span>
          </Col>
          <Col className="update-student-value" span={24}>
            <Input placeholder="" value={student.class} />
          </Col>
          <Col className="update-student-key" span={24}>
            Trường/Viện <span style={{ color: "red" }}>*</span>
          </Col>
          <Col className="update-student-value" span={24}>
            <Input placeholder="" value={student.school} />
          </Col>
          <Col className="update-student-key" span={24}>
            Lĩnh vực nghiên cứu <span style={{ color: "red" }}>*</span>
          </Col>
          <Col className="update-student-value" span={24}>
            <Input placeholder="" value={student.research_area} />
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default UpdateStudent;
