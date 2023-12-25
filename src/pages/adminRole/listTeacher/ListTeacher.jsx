import React, { useState } from 'react'
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
import type { ColumnsType, TablePaginationConfig } from 'antd/lib/table';

const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);
const ListTeacher = () => {
  const data = [
    {

      name: 'test',
      msgv: 32,
      class: 'test',
    }]

    

  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const Option = Select.Option;
  const [page, setPage] = useState(1);
  const [paginationSize, setPaginationSize] = useState(10)
  const [dataSource, setDataSource] = useState(data);
  const [value, setValue] = useState('');

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
      title: 'Mã số giảng viên',
      dataIndex: 'msgv',
    },
    {
      title: 'Cấp bậc',
      dataIndex: 'class',
    },
    {
      title: 'Trường/Viện',
      dataIndex: 'School',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Lĩnh vực nghiên cứu',
      dataIndex: 'study',
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
            setDataSource(filteredData);
          }}
          placeholder ="Tìm kiếm"
          onSearch={onSearch}
          style={{
            width: 500,
            paddingLeft: 10,
          }}
        />


      </div>

      <div className='content-main'>
        <Table className='table-list-student'
          rowSelection={{
            type: "Checkbox",
          }}
          pagination={{
            onChange(current, pageSize) {
              setPage(current);
              setPaginationSize(pageSize)
            },
            defaultPageSize: 10, hideOnSinglePage: true, showSizeChanger: true
          }}
          columns={columns}
          dataSource={dataSource}
        />
      </div>
    </div >
  )
}

export default ListTeacher