import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios';
import * as XLSX from 'xlsx';
import unorm from 'unorm';
import {
  getAllUserByPosition, getAllResearchArea, getUserById, optionYear,
  optionSchool, updateUserById, createUser, deleteUserById, createUserByFile
} from "../../../apis/apiAdmin"
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
import "../../adminRole/globalCSS.css"
import {
  UserAddOutlined,
  FileAddOutlined,
  DeleteOutlined, FormOutlined, EyeOutlined,
  InboxOutlined, ExclamationCircleFilled
} from '@ant-design/icons';
import create from '@ant-design/icons/lib/components/IconFont';
const { confirm } = Modal;

const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);

export const ListStudent = () => {
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalExcel, setModalExcel] = useState(false);
  const [loading, setLoading] = useState(true);


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
  const [dataStudent, setDataStudent] = useState();
  const [id, setId] = useState();
  const [semester, setSemester] = useState('20231');

  const dataTable = useMemo(() => {
    return data?.map((value) => {
      return {
        ...value,
        key: value.id,
        research_area: value?.research_area?.map((val) => val.name).join(', '),
      };
    });
  }, [data]);
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
        const data = await getAllUserByPosition(`STUDENT&semester=${semester}`);
        setData(data);
        setLoading(false);
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
    name: "file",
    multiple: false,
    maxCount: 1,
    accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    beforeUpload: (file) => {
      if (droppedFile > 1) {
        message.warning(
          `Multiple files are not allowed. Only one CSV file will be uploaded at a time.`
        );
        return false;
      }
      if (
        file.type !=
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        message.error(`Invalid file format. Please upload a CSV file.`);
        return false;
      }
      setDroppedFile(file);
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
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
        const tableData = rows.map((row, index) => {
          return row.reduce((acc, value, colIndex) => {
            if (headers[colIndex] === 'research_area' && typeof value === 'string') {
              const researchAreas = value.split(',').map(area => area.trim());
              acc[headers[colIndex]] = researchAreas.map(area => ({ number: area }));
            } else {
              acc[headers[colIndex]] = value;
            }
            return acc;
          }, {
            roles: ['S'],
            position: "STUDENT",
            is_active: true,
            password: "1",
            semester: `${semester}`
          });
        });

        setTableDataExcel(tableData);
        console.log(tableData)

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
      title: "STT",
      key: "index",
      render: (text, record, index) =>
        (page - 1) * paginationSize + index + 1,
    },
    {
      title: 'Tên hiển thị',
      dataIndex: 'fullname',
      render: (text) => <a>{text}</a>,
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
      dataIndex: 'gen',
      key: 'gen'
    },
    {
      title: 'Trường/Viện',
      dataIndex: 'school',
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
      title: "Tác vụ",
      fixed: "right",
      width: 100,
      render: (_, record) => (<div className='action-button' size="middle">
        <Button className='button-view' onClick={() => handleView(record)} shape="circle" icon={<EyeOutlined />}> </Button>
        <Button className='button-fix' onClick={() => handleUpdate(record)} shape="circle" icon={<FormOutlined />}> </Button>
        <Button className='button-delete' onClick={() => showDeleteConfirm(record)} shape="circle" icon={<DeleteOutlined />}> </Button>
      </div>
      ),
    },
  ];
  //console.log(tableDataExcel) 
  const handleView = async (record) => {
    try {
      const userData = await getUserById(record.id);
      setId(record.id)
      setDataStudent(userData);
      console.log(userData)
      setModalView(true);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  const handleUpdate = async (record) => {
    try {
      const userData = await getUserById(record.id);
      setId(record.id)
      setDataStudent(userData);
      setModalUpdate(true);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  const handleDelete = async (id) => {
    try {
      const body = { is_active: false }
      console.log(id, body)
      const res = await deleteUserById(id, body)
      const data = await getAllUserByPosition(`STUDENT&semester=${semester}`);
      setData(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  const showDeleteConfirm = async (record) => {
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
        handleDelete(record.id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  useEffect(() => {
    if (dataStudent) {
      detail.setFieldsValue(dataStudent);
      update.setFieldsValue(dataStudent);
      //const researchAreas = dataStudent.research_area.map(area => area.value);
      
      const researchAreas = dataStudent.research_area.map(area => area.number);
      console.log(researchAreas)
      const researchOptions = dataStudent.research_area.map(area => ({
        value: area.value,
        label: area.label,
      }));

      console.log('Research Areas:', researchAreas);

      detail.setFieldsValue({ research_area: researchAreas });
      update.setFieldsValue({ research_area: researchAreas });

      // You may also set options for the Select component
      detail.setFieldsValue({ researchOptions });
      update.setFieldsValue({ researchOptions });
    }
  }, [dataStudent, detail]);

  const handleOk = async () => {
    setLoading(true)
    // Kiểm tra và lấy giá trị từ form
    const formValues = await update.validateFields();
    const researchAreaArray = formValues.research_area.map((area) => ({ number: area }));
    console.log(formValues.research_area)
    console.log("Research Area Objects:", researchAreaArray);
    // Tạo một đối tượng mới với các trường bổ sung
    const additionalFields = {
      research_area: researchAreaArray
    };
    console.log(additionalFields);

    // Kết hợp formValues và additionalFields
    const values = { ...formValues, ...additionalFields };
    
    const res = await updateUserById(id, values);
    update.resetFields()
    setModalUpdate(false)
    const data = await getAllUserByPosition(`STUDENT&semester=${semester}`);
    setData(data);
    setLoading(false);
  };

  const handleCreate = async () => {
    create.validateFields();
    try {
      // Kiểm tra và lấy giá trị từ form
      const formValues = await create.validateFields();
      const researchAreaArray = formValues.research_area.map(area => ({ number: area }));

      // Tạo một đối tượng mới với các trường bổ sung
      const additionalFields = {
        roles: ['S'],
        position: "STUDENT",
        is_active: true,
        password: "1",
        research_area: researchAreaArray,
        semester: `${semester}`
      };
      // Kết hợp formValues và additionalFields
      const values = { ...formValues, ...additionalFields };
      const res = await createUser(values);
      create.resetFields()
      setModal1Open(false)
      setLoading(true)
      const data = await getAllUserByPosition(`STUDENT&semester=${semester}`);
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleCreateUserByFile = async () => {
    const body = tableDataExcel
    console.log(body)
    const res = await createUserByFile(body);
    setModalExcel(false)
    setModal2Open(false)
    setLoading(true)
    const data = await getAllUserByPosition(`STUDENT&semester=${semester}`);
    setData(data);
    setLoading(false)
  }

  const onSearch = (value) => {
    setLoading(true)
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
        setLoading(true)
        const newData = await getAllUserByPosition(`STUDENT&semester=${semester}`);
        setData(newData);
        setLoading(false)
      }
    };

    fetchData();
    setPage(1);
  }, [value]);

  const handleSemesterChange = async (selectedSemester) => {
    setSemester(selectedSemester);
    setLoading(true)
    const data = await getAllUserByPosition(`STUDENT&semester=${selectedSemester}`);
    setData(data);
    setLoading(false)
  };

  return (
    <div className="list-student mb-4">
      <div className="content-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">
          Danh sách sinh viên
        </h6>
        <Button
          type="primary"
          onClick={() => setModal1Open(true)}
          icon={<UserAddOutlined />}
        >
          Thêm mới
        </Button>
        <Modal
          title="Thêm mới sinh viên"
          centered
          open={modal1Open}
          okText="Thêm"
          cancelText="Từ chối"
          onOk={handleCreate}
          onCancel={() => setModal1Open(false)}
        >
          <Form form={create} layout="vertical">
            <Form.Item label="Họ và tên" name="fullname" fieldId='fullname' rules={[{ required: true, message: 'Please input your content!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="CCCD" name="cccd" rules={[{ required: true, message: 'Please input your content!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Mã số sinh viên" name="number" rules={[{ required: true, message: 'Please input your content!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Khóa" name="gen" rules={[{ required: true, message: 'Please input your content!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Lớp" name="class" rules={[{ required: true, message: 'Please input your content!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your content!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Trường/Viện:" name="school" rules={[{ required: true, message: 'Please input your content!' }]}>
              <Select options={optionSchool} >
              </Select>
            </Form.Item>
            <Form.Item label="Lĩnh vực nghiên cứu:" name="research_area" rules={[{ required: true, message: 'Please input your content!' }]}>
              <Select mode='multiple' options={dataSelect}>

              </Select>
            </Form.Item>
          </Form>
        </Modal>

        <Button
          type="primary"
          onClick={() => setModal2Open(true)}
          icon={<FileAddOutlined />}
        >
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
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
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
            dataSource={tableDataExcel.map(record => ({
              ...record,
              research_area: record.research_area?.map(area => area.number).join(', ')
            }))}
          />
        </Modal>


        <div className='select-semester'>
          <span style={{ color: "black" }} >Kỳ học: </span>
          <Select defaultValue="20231" 
          onChange={handleSemesterChange}
          options={optionYear}
          style={{ width: 120 }} >

          </Select>
        </div>

        <Input.Search
          className="input-search"
          placeholder="Tìm kiếm theo tên"
          value={value}
          onSearch={onSearch}
          onChange={(e) => {setValue(e.target.value);}}
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
              setPaginationSize(pageSize);
            },
            defaultPageSize: 10,
            hideOnSinglePage: true,
            showSizeChanger: true,
          }}
          columns={columns}
          dataSource={dataTable}
          loading={loading}
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
          <Form.Item label="Mã số sinh viên" name="number">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Khóa" name="gen">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Lớp" name="class">
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
            <Select mode='multiple' optionLabelProp="label" options={dataSelect} disabled='true'>

            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Chỉnh sửa"
        centered
        open={modalUpdate}
        okText="OK"
        onOk={handleOk}
        onCancel={() => setModalUpdate(false)}
        cancelText="Cancle"
      >
        <Form form={update} layout="vertical">
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
            <Select mode='multiple' optionLabelProp="label" options={dataSelect}>

            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div >
  )
}

export default ListStudent;
