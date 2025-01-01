import React from "react";
import {Table} from "antd";
import './params.css';

const COLUMNS = [
    {
        title: '参数',
        dataIndex: 'name'
    },
    {
        title: '说明',
        dataIndex: 'comment'
    },
    {
        title: '类型',
        dataIndex: 'type',
        render: val => <span className='param_type'>{val}</span>
    },
];

const Params = props => {
    const { params } = props;
    return (
        <Table
            columns={COLUMNS}
            dataSource={params}
            pagination={false}
        />
    )
};

export default Params;
