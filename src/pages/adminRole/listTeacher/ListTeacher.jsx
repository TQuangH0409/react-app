import React, { useState, useEffect } from 'react'
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
const ListTeacher = () => {
  const [data, setData] = useState([]);
  const dataTable =
    data?.length &&
    data?.map((value) => {
      console.log(value.research_area)
      
      return {
        ...value,
        key: value.id,
        research_area: value?.research_area?.map((val) => val.name
        ).join(', '),
      };
    });
  const login = async () => {
    const res = await axios.post(`http://35.213.168.72:6801/api/v1/auth/login`, { email: "quang.vt198256@sis.hust.edu.vn", password: "1" })
    if (res) {
      const token = res.data.accessToken;
      localStorage.setItem("token", token);
    }
  }
  useEffect(() => {
    login()
  }, [])

  const getAllTeacher = () => {
    const token = localStorage.getItem("token");
    console.log("token", token)
    axios.get(`http://35.213.168.72:6801/api/v1/users/position?position=TEACHER`, {
      headers: {
        token: token
      }
    })
      .then(res => {
        console.log(res.data)
        setData(res.data);
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    getAllTeacher()
  }, [])



  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const Option = Select.Option;
  const [page, setPage] = useState(1);
  const [paginationSize, setPaginationSize] = useState(10)
  const [value, setValue] = useState('');

  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      key: 'index',
      render: (text: string, record: any, index: number) => (page - 1) * paginationSize + index + 1,
    },
    {
      title: 'Tên hiển thị',
      dataIndex: 'fullname',
      render: (text: string) => <a>{text}</a>,
      key:'fullname'
    },
    {
      title: 'Mã số giảng viên',
      dataIndex: 'number',
      key:'number'
    },
    {
      title: 'Cấp bậc',
      dataIndex: 'class',
    },
    {
      title: 'Trường/Viện',
      dataIndex: 'school',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Lĩnh vực nghiên cứu',
      dataIndex: 'research_area',
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


  return (

    <div className='list-student mb-4'>
      <div className='content-header py-3'>
        <h6 className='m-0 font-weight-bold text-primary'>Danh sách giảng viên</h6>
        <Button type="primary" onClick={() => setModal1Open(true)} icon={<UserAddOutlined />}>
          Thêm mới
        </Button>
        <Modal
          title="Thêm mới giảng viên"
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

            <Form.Item label="Họ và tên">
              <Input />
            </Form.Item>
            <Form.Item label="CCCD">
              <Input />
            </Form.Item>
            <Form.Item label="Mã số sinh viên">
              <Input />
            </Form.Item>
            <Form.Item label="Khóa">
              <Input />
            </Form.Item>
            <Form.Item label="Kỳ học">
              <Input />
            </Form.Item>
            <Form.Item label="Lớp">
              <Input />
            </Form.Item>
            <Form.Item label="Trường/Viện:">
              <Select>
                <Select.Option value="demo">Trường Công nghệ Thông tin và Truyền thông</Select.Option>
                <Select.Option value="demo">Trường Điện - Điện tử</Select.Option>
                <Select.Option value="demo">Trường Hoá và Khoa học sự sống</Select.Option>
                <Select.Option value="demo">Trường Vật liệu</Select.Option>
                <Select.Option value="demo">Viện Toán ứng dụng và Tin học</Select.Option>
                <Select.Option value="demo">Viện Vật lý Kỹ thuật</Select.Option>
                <Select.Option value="demo">Viện Kinh tế và Quản lý</Select.Option>
                <Select.Option value="demo">Viện Ngoại ngữ</Select.Option>
                <Select.Option value="demo">Viện Sư phạm Kỹ thuật</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Lĩnh vực nghiên cứu">
              <Select>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>

          </Form>
        </Modal>

        <Button type="primary" onClick={() => setModal2Open(true)} icon={<FileAddOutlined />}>
          Thêm mới excel
        </Button>
        <Modal
          title="Thêm mới sinh viên"
          centered
          open={modal2Open}
          okText="Thêm"
          cancelText="Từ chối"
          onOk={() => setModal2Open(false)}
          onCancel={() => setModal2Open(false)}
        ></Modal>

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
            setData(filteredData);
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
          dataSource={dataTable}
        />
      </div>
    </div >
  )
}

export default ListTeacher