import React, { useEffect, useState } from 'react'
import { getAllResearchArea } from "../../../apis/apiAdmin"
import axios from 'axios';
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
  DeleteOutlined, FormOutlined, EyeOutlined
} from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfi } from 'antd/es/table';

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

  const login = async () => {
    const res = await axios.post(`http://35.213.168.72:8000/api/v1/auth/login`, { email: "quang.vt198256@sis.hust.edu.vn", password: "X9)e=P_CE!Yw" })
    if (res) {
      const token = res.data.accessToken;
      localStorage.setItem("token", token);
    }
  }
  useEffect(() => {
    login()
  }, [])

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
      render: () => (<div className='action-button' size="middle">
        <Button className='button-view' shape="circle" icon={<EyeOutlined />}> </Button>
        <Button className='button-fix' shape="circle" icon={<FormOutlined />}> </Button>
        <Button className='button-delete' shape="circle" icon={<DeleteOutlined />}> </Button>
      </div>
      ),
    },
  ];

  useEffect(() => {
    if (dataResearch) {
      detail.setFieldsValue(dataResearch);
      update.setFieldsValue(dataResearch);
    }
  }, [dataResearch, detail]);


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
          onOk={() => setModal1Open(false)}
          onCancel={() => setModal1Open(false)}
        >
          <Form
            layout="vertical"
          >

            <Form.Item label="Tên">
              <Input />
            </Form.Item>
            <Form.Item label="Mã số">
              <Input />
            </Form.Item>

          </Form>
        </Modal>

        <Search
          className='input-search'
          placeholder="Search Name"
          value={value}
          onChange={e => {
            const currValue = e.target.value;
            setValue(currValue);
            const filteredData = data.filter(entry =>
              entry.name.includes(currValue)
            );
            setDataSource(filteredData);
          }}
          placeholder="Tìm kiếm"
          onSearch={onSearch}
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

    </div >
  )
}

export default ListFieldOfStudy