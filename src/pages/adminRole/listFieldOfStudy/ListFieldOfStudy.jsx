import React, { useEffect, useState } from 'react'
import { getAllResearchArea, createResearchArea, deleteResearchArea, updateResearchArea, getResearchAreaById } from "../../../apis/apiAdmin"
import axios from 'axios';
import unorm from 'unorm';
import {
  Button, Modal, Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Divider, Table, Space
} from 'antd';
import "../../adminRole/globalCSS.css"
import {
  UserAddOutlined,
  FileAddOutlined,
  DeleteOutlined, FormOutlined, EyeOutlined,
  ExclamationCircleFilled
} from '@ant-design/icons';

const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);
const ListFieldOfStudy = () => {
  const [data, setData] = useState([])
  const [dataResearch, setDataResearch] = useState();
  const [id, setId] = useState();
  const [detail] = Form.useForm();
  const [update] = Form.useForm();
  const [create] = Form.useForm();

  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const Option = Select.Option;
  const [page, setPage] = useState(1);
  const [paginationSize, setPaginationSize] = useState(10)
  const [dataSource, setDataSource] = useState(data);
  const [value, setValue] = useState('');
  const [modalView, setModalView] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllResearchArea();
        setData(data)
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
    fetchData();
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      key: 'index',
      render: (text: string, record: any, index: number) => (page - 1) * paginationSize + index + 1,
    },
    {
      title: 'Tên hiển thị',
      dataIndex: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Mã số',
      dataIndex: 'number',
    },
    {
      title: 'Tác vụ',
      fixed: 'right',
      width: 100,
      render: (_, record) => (<div className='action-button' size="middle">
        <Button className='button-view' onClick={() => handleView(record)} shape="circle" icon={<EyeOutlined />}> </Button>
        <Button className='button-fix' onClick={() => handleUpdate(record)} shape="circle" icon={<FormOutlined />}> </Button>
        <Button className='button-delete' onClick={() => showDeleteConfirm(record)} shape="circle" icon={<DeleteOutlined />}> </Button>
      </div>
      ),
    },
  ];

  const handleView = async (record) => {
    try {
      const researchData = await getResearchAreaById(record.id);
      setId(record.id)
      setDataResearch(researchData);
      setModalView(true);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  const handleUpdate = async (record) => {
    try {
      const userData = await getResearchAreaById(record.id);
      setId(record.id)
      setDataResearch(userData);
      setModalUpdate(true);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  const handleDelete = async (id) => {
    try {
      const res = await deleteResearchArea(id)
      const data = await getAllResearchArea();
      setData(data);
      console.log(data)

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  const showDeleteConfirm = async (record) => {
    const userData = await getResearchAreaById(record.id);
    setId(record.id);
    confirm({
      title: 'Bạn có muốn xóa lĩnh vực này?',
      icon: <ExclamationCircleFilled />,
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
        handleDelete(record.id)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  useEffect(() => {
    if (dataResearch) {
      detail.setFieldsValue(dataResearch);
      update.setFieldsValue(dataResearch);
    }
  }, [dataResearch, detail]);

  const handleOk = async () => {

    const formValues = await update.validateFields();
    console.log(formValues)
    const res = await updateResearchArea(id, formValues);
    update.resetFields()
    setModalUpdate(false)
    const data = await getAllResearchArea();
    setData(data);
};

  const handleCreate = async () => {

      const formValues = await create.validateFields();
      console.log(formValues)
      const res = await createResearchArea(formValues);
      create.resetFields()
      setModal1Open(false)
      const data = await getAllResearchArea();
      setData(data);
  };

  const onSearch = (value) => {
    const normalizedValue = unorm.nfd(value); // Chuẩn hóa văn bản đầu vào
    const filterData = data.filter((o) =>
      Object.keys(o).some((k) =>
        unorm.nfd(String(o[k])).toLowerCase().includes(normalizedValue.toLowerCase())
      )
    );
    setData(filterData);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (value.trim() === '') {
        // Fetch all users with the position "STUDENT"
        const newData = await getAllResearchArea();
        setData(newData);
      }
    };

    fetchData();
    setPage(1);
  }, [value]);

  return (

    <div className='list-student mb-4'>
      <div className='content-header py-3'>
        <h6 className='m-0 font-weight-bold text-primary'>Danh sách lĩnh vực nghiên cứu</h6>
        <Button type="primary" onClick={() => setModal1Open(true)} >
          Thêm mới
        </Button>
        <Modal
          title="Thêm mới"
          centered
          open={modal1Open}
          okText="Thêm"
          cancelText="Từ chối"
          onOk={handleCreate}
          onCancel={() => setModal1Open(false)}
        >
          <Form
            layout="vertical"
            form={create}
          >

            <Form.Item label="Tên" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Mã số" name="number">
              <Input />
            </Form.Item>

          </Form>
        </Modal>

        <Input.Search
          className="input-search"
          placeholder="Tìm kiếm theo tên"
          value={value}
          onSearch={onSearch}
          onChange={(e) => setValue(e.target.value)}
          style={{
            width: 500,
            paddingLeft: 10,
          }}
        />


      </div>

      <div className='content-main'>
        <Table className='table-list-student'
          pagination={{
            onChange(current, pageSize) {
              setPage(current);
              setPaginationSize(pageSize)
            },
            defaultPageSize: 10, hideOnSinglePage: true, showSizeChanger: true
          }}
          columns={columns}
          dataSource={data}
        />
      </div>

      <Modal
        title="Chi tiết"
        centered
        open={modalView}
        okText="OK"
        onOk={() => setModalView(false)}
        onCancel={() => setModalView(false)}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <Form layout="vertical"
          form={update}>
          <Form.Item label="Tên" name="name">
            <Input />
          </Form.Item>
          
          <Form.Item label="Mã số" name="number">
            <Input />
          </Form.Item>
          
        </Form>
      </Modal>

      <Modal
        title="Chi tiết"
        centered
        open={modalUpdate}
        okText="OK"

        onOk={handleOk}
        onCancel={() => setModalUpdate(false)}
        cancelText="Cancle"
      >
        <Form layout="vertical"
          form={update}>
          <Form.Item label="Tên" name="name">
            <Input />
          </Form.Item>
          
          <Form.Item label="Mã số" name="number">
            <Input />
          </Form.Item>
          
        </Form>
      </Modal>

    </div >
  )
}

export default ListFieldOfStudy