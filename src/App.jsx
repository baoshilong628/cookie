import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Component from "./components/Component";
import {Layout, Menu} from "antd";
import './app.css'
import {scrollToAnchor} from "./utils";
import {c} from "react/compiler-runtime";
const { Header, Content, Sider } = Layout;


const useFileDocs = () => {
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
    return fileDocs;
}
const useComponentGroups = () => {
    const [componentGroups, setComponentGroups] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/componentGroups')
            .then(response => {
                setComponentGroups(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    } , []);
    return componentGroups;
}

const getMenuItemsByComponentGroups = componentGroups => {
    const menuItems = [];
    for (name of Object.keys(componentGroups)) {
        menuItems.push({
            label: name,
            key: name,
            type: 'group',
            children: componentGroups[name].map(component => {
                return {
                    label: component.displayName ?? component.name,
                    key: component.id,
                    onClick: () => {
                        scrollToAnchor(component.id);
                    }
                }
            })
        });
    }
    return menuItems;
}

/**
 * @returns {Element}
 * @constructor
 */
const App = () => {
    const fileDocs = useFileDocs();
    const componentGroups = useComponentGroups();
    console.log(getMenuItemsByComponentGroups(componentGroups));
    return (
        <Layout>
            <Header className={'app_header'}>
                <i className={'app_icon'}/>
                <span className={'app_header_title'}>Cookies</span>
                <span className={'app_header_subtitle'}>
                    —— 代码研发工具
                </span>
            </Header>
            <Layout style={{ height: 'calc(100vh - 64px)'}}>
                <Sider width={330} className={'app_side'} theme={'light'}>
                    <Menu mode={'inline'} items={getMenuItemsByComponentGroups(componentGroups)}
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
