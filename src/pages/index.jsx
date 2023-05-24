import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import { Menu, Input } from 'antd';
import { useState } from 'react';
import './index.css'


function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('菜单1', 'sub1', <AppstoreOutlined />, [
        getItem('子菜单1-1', '子菜单1-1'),
        getItem('子菜单1-2', '子菜单1-2'),
    ]),
    getItem('菜单2', 'sub2', <AppstoreOutlined />, [
        getItem('子菜单2-1', '子菜单2-1'),
        getItem('子菜单2-2', '子菜单2-2'),
    ]),
];
const App = () => {

    const [items2, setItems2] = useState(items);
    const [keys, setKeys] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [currentMenu, setCurrentMenu] = useState(items2[0].children[0].label);
    const renderMenuItems = (items) => {
        return items.map((item) => {
            if (item.children) {
                return (
                    <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                        {renderMenuItems(item.children)}
                    </Menu.SubMenu>
                );
            }
            return (
                <Menu.Item key={item.key} icon={item.icon}>
                    {item.label}
                </Menu.Item>
            );
        });
    };

    const handleMenuClick = (e) => {
        setKeys(e.keyPath)
        console.log(e)
        setCurrentMenu(e.key);
    };
    const handleInputChange = (e) => {
        setCurrentMenu(e.target.value);
    };
    const handleSaveClick = () => {

        let itemss = items2.map((item) => {
            if (item.key === keys[1]) {
                item.children = item.children.map((ite) => {
                    if (ite.key === keys[0]) {
                        ite.label = currentMenu
                    }
                    return ite
                })
            }
            return item
        })
        setCurrentMenu(currentMenu);
        setItems2(itemss)
    };
    return (
        <div className='menus'>
            <Menu
                className='menu'
                defaultSelectedKeys={['子菜单1-1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                items={items2}
                onClick={handleMenuClick}
            >
                {renderMenuItems(items2)}
            </Menu>
            <div className='menus_input'>
                <Input
                    value={currentMenu}
                    onChange={handleInputChange}
                    style={{ marginBottom: '16px', width: '200px' }}
                />
                <button onClick={handleSaveClick}>保存</button>
            </div>
        </div>
    );
};
export default App;