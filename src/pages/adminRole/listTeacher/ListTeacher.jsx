import React, { useState, useEffect } from 'react'
import axios from 'axios';
import * as XLSX from 'xlsx';
import { getAllUserByPosition, getAllResearchArea, getUserById, optionYear, optionSchool, updateUserById, createUser, deleteUserById } from "../../../api/apiAdmin"
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
  InboxOutlined, ExclamationCircleFilled
} from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfi } from 'antd/es/table';
const { confirm } = Modal;

const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);
const ListTeacher = () => {
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalExcel, setModalExcel] = useState(false);

  const Option = Select.Option;
  const [page, setPage] = useState(1);
  const [paginationSize, setPaginationSize] = useState(10)
  const [value, setValue] = useState('');
  const { Dragger } = Upload;
  const [droppedFile, setDroppedFile] = useState();
  const [tableDataExcel, setTableDataExcel] = useState([]);
  const [columnsExcel, setColumnsExcel] = useState([]);
  const [detail] = Form.useForm();
  const [update] = Form.useForm();
  const [create] = Form.useForm();

  const [data, setData] = useState([]);
  const [dataResearch, setDataResearch] = useState([]);
  const [dataTeacher, setDataTeacher] = useState();
  const [id, setId] = useState();
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
  const dataSelect =
    dataResearch?.length &&
    dataResearch.map((value) => {
      return {
        value: value.name,
        label: value.name,
      }
    });
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
        const data = await getAllUserByPosition("TEACHER");
        setData(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
    fetchData();
  }, []);

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
      title: 'Mã số giảng viên',
      dataIndex: 'number',
      key: 'number'
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
      const userData = await getUserById(record.id);
      setId(record.id)
      setDataTeacher(userData);
      setModalView(true);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  const handleUpdate = async (record) => {
    try {
      const userData = await getUserById(record.id);
      setId(record.id)
      setDataTeacher(userData);
      setModalUpdate(true);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  const handleDelete = async (id) => {
    try {
      console.log(id)
      deleteUserById(id)

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  const showDeleteConfirm = async (record) => {
    const userData = await getUserById(record.id);
    setId(record.id);
    confirm({
      title: 'Bạn có muốn xóa người dùng này?',
      icon: <ExclamationCircleFilled />,
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
        handleDelete(id)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  useEffect(() => {
    if (dataTeacher) {
      detail.setFieldsValue(dataTeacher);
      update.setFieldsValue(dataTeacher);
      const researchAreaNames = dataTeacher.research_area.map(area => area.name);
      detail.setFieldsValue({ research_area: researchAreaNames });
      update.setFieldsValue({ research_area: researchAreaNames });
    }
  }, [dataTeacher, detail]);

  const handleOk = async () => {
    try {
      // Kiểm tra và lấy giá trị từ form
      const values = await update.validateFields();
      console.log(values)
      // Gọi hàm cập nhật
      //await updateUserById(id, values);
      // Đóng modal sau khi cập nhật thành công
      setModalUpdate(false);
    } catch (error) {
      console.error('Error updating user:', error);
      // Xử lý lỗi nếu cần
    }
  };

  const handleCreate = async () => {
    try {
      // Kiểm tra và lấy giá trị từ form
      const formValues = await create.validateFields();

      // Tạo một đối tượng mới với các trường bổ sung
      const additionalFields = {
        roles: ['T'],
        position: "TEACHER",
        is_active: true,
        password: "1",
      };

      // Kết hợp formValues và additionalFields
      const values = { ...formValues, ...additionalFields };

      console.log(values);
      // Gọi hàm cập nhật
      //await createTeacher(values);
      create.resetFields()
      // Đóng modal sau khi cập nhật thành công
      setModalUpdate(false);
    } catch (error) {
      console.error('Error updating user:', error);
      // Xử lý lỗi nếu cần
    }
  };


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
            <Form.Item label="Mã số giảng viên">
              <Input />
            </Form.Item>
            <Form.Item label="Email">
              <Input />
            </Form.Item>
            <Form.Item label="Trường/Viện:">
              <Select options={optionSchool}>

              </Select>
            </Form.Item>
            <Form.Item label="Lĩnh vực nghiên cứu">
              <Select mode='multiple' options={dataSelect}>

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
          form={detail}>
          <Form.Item label="Họ và tên" name="fullname" fieldId='fullname'>
            <Input readOnly />
          </Form.Item>
          <Form.Item label="CCCD" name="CCCD">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Mã số giảng viên" name="number">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Trường/Viện:" name="school">
            <Select disabled='true'>
            </Select>
          </Form.Item>
          <Form.Item label="Lĩnh vực nghiên cứu:" name="research_area">
            <Select mode='multiple' disabled='true'>

            </Select>
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
          <Form.Item label="Họ và tên" name="fullname" fieldId='fullname'>
            <Input />
          </Form.Item>
          <Form.Item label="CCCD" name="CCCD">
            <Input />
          </Form.Item>
          <Form.Item label="Mã số giảng viên" name="number">
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
            <Select mode='multiple' options={dataSelect}>

            </Select>
          </Form.Item>
        </Form>
      </Modal>

    </div >
  )
}

export default ListTeacher