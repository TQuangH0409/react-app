import React, { useState, useEffect } from 'react'
import axios from 'axios';
import * as XLSX from 'xlsx';
import unorm from 'unorm';
import { getAllUserByPosition, getAllResearchArea, getUserById, optionYear, optionSchool, updateUserById, createUser, deleteUserById, createUserByFile } from "../../../apis/apiAdmin"
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
const { confirm } = Modal;

const { Search } = Input;
//const onSearch = (value, _e, info) => console.log(info?.source, value);
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
        value: value.number,
        label: value.name,
      }
    });

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

        // Create table data
        const tableData = rows.map((row, index) => ({

          ...row.reduce((acc, value, colIndex) => {
            acc[headers[colIndex]] = value;
            return acc;
          }, {}),
          roles: ['T'],
          position: "TEACHER",
          is_active: true,
          password: "1",
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

  const columns = [
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

  const handleDelete = async (id, body) => {
    try {
      const body = { is_active: false }
      console.log(id, body)
      const res = await deleteUserById(id, body)
      const data = await getAllUserByPosition("TEACHER");
      setData(data);
      console.log(data)

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
        handleDelete(record.id)
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
      const researchAreaNames = dataTeacher.research_area.map(area => area.number);
      detail.setFieldsValue({ research_area: researchAreaNames });
      update.setFieldsValue({ research_area: researchAreaNames });
    }
  }, [dataTeacher, detail]);

  const handleOk = async () => {

    const formValues = await update.validateFields();
    const researchAreaArray = formValues.research_area.map(area => ({ number: area }));
    console.log("Research Area Objects:", researchAreaArray);
    // Tạo một đối tượng mới với các trường bổ sung
    const additionalFields = {
      research_area: researchAreaArray
    };

    // Kết hợp formValues và additionalFields
    const values = { ...formValues, ...additionalFields };
    const res = await updateUserById(id, values);
    update.resetFields()
    setModalUpdate(false)
    const data = await getAllUserByPosition("TEACHER");
    setData(data);
  };

  const handleCreate = async () => {
    try {
      // Kiểm tra và lấy giá trị từ form
      const formValues = await create.validateFields();
      const researchAreaArray = formValues.research_area.map(area => ({ number: area }));

      // Tạo một đối tượng mới với các trường bổ sung
      const additionalFields = {
        roles: ['T'],
        position: "TEACHER",
        is_active: true,
        password: "1",
        research_area: researchAreaArray
      };

      // Kết hợp formValues và additionalFields
      const values = { ...formValues, ...additionalFields };
      console.log(values)
      const res = await createUser(values);
      create.resetFields()
      setModal1Open(false)
      const data = await getAllUserByPosition("TEACHER");
      setData(data);
    } catch (error) {
      console.error('Error updating user:', error);
      // Xử lý lỗi nếu cần
    }
  };
  const handleCreateUserByFile = async () => {
    const body = tableDataExcel
    const res = await createUserByFile(body);
    console.log(res)
    setModalExcel(false)
    setModal2Open(false)
    const data = await getAllUserByPosition("TEACHER");
    console.log(res)
    setData(data);
  }

  const onSearch = (value) => {
    const normalizedValue = unorm.nfd(value); // Chuẩn hóa văn bản đầu vào
    const filterData = data.filter((o) =>
    Object.keys(o).some((k) => {
      // Nếu giá trị của thuộc tính là mảng đối tượng
      if (Array.isArray(o[k])) {
        return o[k].some((nestedObj) =>
          Object.values(nestedObj).some((nestedValue) =>
            unorm.nfd(String(nestedValue)).toLowerCase().includes(normalizedValue.toLowerCase())
          )
        );
      }
      // Nếu giá trị của thuộc tính không phải là mảng đối tượng
      return unorm.nfd(String(o[k])).toLowerCase().includes(normalizedValue.toLowerCase());
    })
  );
    setData(filterData);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (value.trim() === '') {
        // Fetch all users with the position "STUDENT"
        const newData = await getAllUserByPosition("TEACHER");
        setData(newData);
      }
    };

    fetchData();
    setPage(1);
  }, [value]);


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
          onOk={handleCreate}
          onCancel={() => setModal1Open(false)}
        >
          <Form
            layout="vertical"
            form={create}
          >
            <Form.Item label="Họ và tên" name="fullname">
              <Input />
            </Form.Item>
            <Form.Item label="CCCD" name="cccd">
              <Input />
            </Form.Item>
            <Form.Item label="Mã số giảng viên" name="number">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Trường/Viện:" name="school">
              <Select options={optionSchool}>

              </Select>
            </Form.Item>
            <Form.Item label="Lĩnh vực nghiên cứu" name="research_area">
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
          onOk={handleCreateUserByFile}
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
          <Form.Item label="CCCD" name="cccd">
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
          <Form.Item label="CCCD" name="cccd">
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