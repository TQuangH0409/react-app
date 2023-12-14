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
import type { ColumnsType, TablePaginationConfi } from 'antd/es/table';

const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);
const AssignCriticism = props => {
    const data = [
        {

            name: 'test',
            mssv: 32,
            class: 'test',
        }]

    const [modal1Open, setModal1Open] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
    const Option = Select.Option;
    const [page, setPage] = useState(1);
    const [paginationSize, setPaginationSize] = useState(10)
    const [dataSource, setDataSource] = useState(data);
    const [value, setValue] = useState('');

    const expandedRowRender = () => {
        const columns: TableColumnsType<ExpandedDataType> = [
            {
                title: 'STT',
                key: 'index',
                render: (text: string, record: any, index: number) => (page - 1) * paginationSize + index + 1,
            },
            {
                title: 'Tên sinh viên',
                dataIndex: 'name',
                render: (text: string) => <a>{text}</a>,
            },
            {
                title: 'Mã số sinh viên',
                dataIndex: 'mssv',
            },
            {
                title: 'Trường/Viện',
                dataIndex: 'School',
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
    };


    const columns: ColumnsType<DataType> = [
        {
            title: 'STT',
            key: 'index',
            render: (text: string, record: any, index: number) => (page - 1) * paginationSize + index + 1,
        },
        {
            title: 'Tên giảng viên',
            dataIndex: 'name',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Mã số giảng viên',
            dataIndex: 'msgv',
        },
        {
            title: 'Trường/Viện',
            dataIndex: 'School',
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
                <h6 className='m-0 font-weight-bold text-primary'>Danh sách phân công phản biện</h6>


                <div className='select-semester'>
                    <span style={{ color: "black" }, {marginLeft: "10px"}} >Kỳ học: </span>
                    <Select defaultValue="20231" style={{ width: 120 }} >
                        <Option value="20231">20231</Option>

                    </Select>


                </div>

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
                    expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
                />
            </div>
        </div >
    )
}

export default AssignCriticism