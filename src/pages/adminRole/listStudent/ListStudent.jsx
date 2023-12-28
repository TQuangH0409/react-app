import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as XLSX from 'xlsx';
import { getAllStudent, getAllResearchArea, getUserById } from "../../../api/apiAdmin"
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
  Divider, Table, Space,
  message, Upload,
  SelectProps
} from 'antd';
import "../../adminRole/globalCSS.css"
import {
  UserAddOutlined,
  FileAddOutlined,
  DeleteOutlined, FormOutlined, EyeOutlined,
  InboxOutlined
} from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfi } from 'antd/es/table';


interface DataType {

}
const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);

export const ListStudent = () => {
  const [data, setData] = useState([]);
  const [dataResearch, setDataResearch] = useState([]);
  const [dataStudent, setDataStudent] = useState([]);
  const dataTable =
    data?.length &&
    data?.map((value) => {
      return {
        ...value,
        key: value.id,
        research_area: value?.research_area?.map((val) => val.name
        ).join(', '),
      };
    });
  const login = async () => {
    const res = await axios.post(`http://35.213.168.72:8000/api/v1/auth/login`, { email: "quang.vt198256@sis.hust.edu.vn", password: "1" })
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
        const data = await getAllStudent();
        console.log(data)
        setData(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
    fetchData(); 
  }, []);

    

  const dataResearchSelect = dataResearch?.data?.map(item => item.name);

  const { Dragger } = Upload;
  const [droppedFile, setDroppedFile] = useState();
  const props = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    beforeUpload: file => {
      console.log(file);
      if (droppedFile > 1) {
        message.warning(`Multiple files are not allowed. Only one CSV file will be uploaded at a time.`);
        return false;
      }
      if (file.type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        message.error(`Invalid file format. Please upload a CSV file.`);
        return false;
      }
      setDroppedFile(file);
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };


  const [tableDataExcel, setTableDataExcel] = useState([]);
  const [columnsExcel, setColumnsExcel] = useState([]);

  const handleFileUpload = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Assuming the first sheet is the one you want to read
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert the sheet data to an array of objects
        const formattedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Assuming the first row contains headers
        const [headers, ...rows] = formattedData;
        console.log('Headers:', headers);

        // Create table data
        const tableData = rows.map((row, index) => ({
          key: index,
          ...row.reduce((acc, value, colIndex) => {
            acc[headers[colIndex]] = value;
            return acc;
          }, {}),
        }));

        setTableDataExcel(tableData);

        // Create columns based on headers
        const tableColumns = headers.map((header) => ({
          title: header,
          dataIndex: header,
          key: header,
        }));

        setColumnsExcel(tableColumns);

      } catch (error) {
        console.error('Error reading Excel file:', error);
        // Handle the error as needed
      }
    };

    reader.readAsArrayBuffer(file);
  };


  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [modalExcel, setModalExcel] = useState(false);


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
      key: 'fullname'
    },
    {
      title: 'Mã số sinh viên',
      dataIndex: 'number',
      key: 'number'
    },
    {
      title: 'Lớp',
      dataIndex: 'class',
      key: 'class'
    },
    {
      title: 'Khóa',
      dataIndex: 'khoa',
      key: 'khoa'
    },
    {
      title: 'Trường/Viện',
      dataIndex: 'School',
      key: 'school'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Lĩnh vực nghiên cứu',
      dataIndex: 'research_area',
      key: 'research_area'

    },
    {
      title: 'Tác vụ',
      fixed: 'right',
      width: 100,
      render: (_, record) => (<div className='action-button' size="middle">
        <Button className='button-view' onClick={() => { setModalView(true); setDataStudent(getUserById(record.id)) }} shape="circle" icon={<EyeOutlined />}> </Button>
        <Button className='button-fix' shape="circle" icon={<FormOutlined />}> </Button>
        <Button className='button-delete' shape="circle" icon={<DeleteOutlined />}> </Button>
      </div>
      ),
    },
  ];


  return (

    <div className='list-student mb-4'>
      <div className='content-header py-3'>
        <h6 className='m-0 font-weight-bold text-primary'>Danh sách sinh viên</h6>
        <Button type="primary" onClick={() => setModal1Open(true)} icon={<UserAddOutlined />}>
          Thêm mới
        </Button>
        <Modal
          title="Thêm mới sinh viên"
          centered
          open={modal1Open}
          okText="Thêm"
          cancelText="Từ chối"
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
            <Form.Item label="Mã số sinh viên">
              <Input />
            </Form.Item>
            <Form.Item label="Khóa">
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
          </Form>
        </Modal>

        <Button type="primary" onClick={() => setModal2Open(true)} icon={<FileAddOutlined />}>
          Thêm mới excel
        </Button>
        <Modal
          title="Thêm mới sinh viên"
          centered
          open={modal2Open}
          cancelText="Từ chối"
          onCancel={() => setModal2Open(false)}
          onOk={() => {
            handleFileUpload(droppedFile)
            setModalExcel(true)
          }}
        >
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from uploading company data or other
              banned files.
            </p>
          </Dragger>
        </Modal>

        <Modal 
          width="2000px"
          centered
          open={modalExcel}
          cancelText="Từ chối"
          onCancel={() => setModalExcel(false)}
          onOk={() => setModalExcel(false)}
        >
          <Table className='table-list-student-excel'
            pagination={{
              onChange(current, pageSize) {
                setPage(current);
                setPaginationSize(pageSize)
              },
              defaultPageSize: 10, hideOnSinglePage: true, showSizeChanger: true
            }}
            columns={columnsExcel}
            dataSource={tableDataExcel}
          />
        </Modal>


        <div className='select-semester'>
          <span style={{ color: "black" }} >Kỳ học: </span>
          <Select defaultValue="20231" style={{ width: 120 }} >
            <Option value="20231">20231</Option>

          </Select>


        </div>

        <Search
          className='input-search'
          placeholder="Search Name"
          value={value}
          onChange={e => {
            // const currValue = e.target.value;
            // setValue(currValue);
            // const filteredData = data.filter(entry =>
            //   entry.name.includes(currValue)
            // );
            // setDataSource(data);
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
          initialValues={dataStudent}>
          <Form.Item label="Họ và tên" name="fullname" fieldId='fullname'>
            <Input readOnly />
          </Form.Item>
          <Form.Item label="CCCD" name="CCCD">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Mã số sinh viên" name="number">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Khóa" name="khoa">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Lớp" name="class">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Trường/Viện:" name="school">
            <Select>

            </Select>
          </Form.Item>
        </Form>
      </Modal>


    </div >
  )
}

export default ListStudent;
