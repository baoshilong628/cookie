import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Component from "./components/Component";
import {Layout, Menu} from "antd";
import './app.css'
import {getMenu} from "./utils";
const { Header, Content, Sider } = Layout;

/**
 * @returns {Element}
 * @constructor
 */
const App = () => {
    const [fileDocs, setFileDocs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/fileDocs')
            .then(response => {
                setFileDocs(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <Layout>
            <Header className={'app_header'}>
                <i className={'app_icon'}/>
                <span className={'app_header_title'}>Cookies</span>
                <span className={'app_header_subtitle'}>
                    —— 代码仓协作工具
                </span>
            </Header>
            <Layout style={{ height: 'calc(100vh - 64px)'}}>
                <Sider className={'app_side'} theme={'light'}>
                    <Menu items={getMenu(fileDocs)}
                    />
                </Sider>
                <Layout>
                    <Content
                        className={'app_content_container'}
                    >
                        <div className={'app_content'}>
                            {fileDocs.map((fileDoc, index) => (
                                <Component key={index} docs={fileDoc.docs}/>
                            ))}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default App;
