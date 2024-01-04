import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Divider, Table, Space,
  message, Upload,
  SelectProps
} from 'antd';
import { useDispatch, useSelector } from "react-redux";
import {
  optionSchool, getAllResearchArea, updateUserById
} from "../../apis/apiAdmin"
import { sendAvatar } from "../../apis/apiStudent";
import { setIsShow } from "../../hook/slice";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const UpdateStudent = (props) => {
  const [update] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(props.isModalOpen);
  const [dataResearch, setDataResearch] = useState([]);
  const [avatar, setAvatar] = useState();
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    const formValues = await update.validateFields();
    const researchAreaArray = formValues.research_area.map(area => ({ number: area }));
    const additionalFields = {
      research_area: researchAreaArray
    };

    const values = { ...formValues, ...additionalFields };
    const res = await updateUserById(student.id, values);
    if (avatar) {
      const formData = new FormData();
      formData.append("file", avatar);
      const resAvatar = await sendAvatar(formData);
      console.log(resAvatar);
      const value = resAvatar.objectId;
      console.log(value)
      const avt = { avatar: value }
      console.log(avt)
      const res = await updateUserById(student.id, avt)
    }
    setIsModalOpen(false);
    dispatch(setIsShow(false))
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    dispatch(setIsShow(false))
  };

  const student = useSelector((state) => {
    return state.store.student;
  });

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
        const data = await getAllResearchArea();
        setDataResearch(data)
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (student) {
      update.setFieldsValue(student);
      const researchAreas = student.research_area.map(area => area.number);
      update.setFieldsValue({ research_area: researchAreas });
    }
  }, [student, update]);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    setAvatar(file);
    return isJpgOrPng && isLt2M;
  };

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
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
        background: 'none',
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
    <>
      <Modal
        title="Chi tiết"
        centered
        open={isModalOpen}
        okText="OK"
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="Cancle"
      >
        <Form form={update} layout="vertical">
          <Form.Item style={{ textAlign: 'center' }}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: '100%',
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <Form.Item label="Họ và tên" name="fullname" fieldId='fullname'>
            <Input />
          </Form.Item>
          <Form.Item label="CCCD" name="cccd">
            <Input />
          </Form.Item>
          <Form.Item label="Mã số sinh viên" name="number">
            <Input />
          </Form.Item>
          <Form.Item label="Khóa" name="gen">
            <Input />
          </Form.Item>
          <Form.Item label="Lớp" name="class">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Trường/Viện:" name="school">
            <Select options={optionSchool} >
            </Select>
          </Form.Item>
          <Form.Item label="Lĩnh vực nghiên cứu:" name="research_area">
            <Select mode='multiple' labelInValue optionLabelProp="label" options={dataSelect}>

            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UpdateStudent;
