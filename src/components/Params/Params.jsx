import React from "react";
import {Table} from "antd";
import './params.css';

const COLUMNS = [
    {
        title: '参数',
        dataIndex: 'name',
        width: '20%',
    },
    {
        title: '必填',
        dataIndex: 'isRequired',
        render: val => <span className={`param_required ${val ? 'required' : 'not_required'}`}>{val ? '是' : '-'}</span>,
        width: '20%',
    },
    {
        title: '说明',
        dataIndex: 'comment',
        width: '20%',
    },
    {
        title: '类型',
        dataIndex: 'type',
        render: val => <span className='param_type'>{val}</span>,
        width: '20%',
    },
    {
        title: '默认值',
        dataIndex: 'defaultValue',
        width: '20%',
    }
];

// 必填项排在前面，其他正常排序
const sortByIsRequired = (a, b) => {
    if(a.isRequired === b.isRequired) {
        return 0;
    }
    return a.isRequired ? -1 : 1;
};
const Params = props => {
    const { params } = props;
    return (
        <Table
            columns={COLUMNS}
            dataSource={params.sort(sortByIsRequired)}
            pagination={false}
        />
    )
};

export default Params;
