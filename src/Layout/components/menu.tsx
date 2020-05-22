import React, { SFC, useState, useEffect } from "react"
import { withRouter, RouteComponentProps } from 'react-router'
import { Menu } from "antd"

import "./menu.scss"
import { SelectParam } from 'antd/lib/menu'

interface IMenuProp extends RouteComponentProps {}

const SiderBar: SFC<IMenuProp> = (props) => {

  const [menuKey, setMenuKey] = useState('random')

    function routerChange(value:SelectParam) {
        setMenuKey(value.key)
    }

    useEffect(() => {
      props.history.push(menuKey)
    },[menuKey])

  return (
    <div className="menu">
      <Menu selectedKeys={[menuKey]} onSelect={routerChange} theme="dark">
        <Menu.Item key="random">随机技能</Menu.Item>
        {/* <Menu.Item key="circle">交易统计</Menu.Item>
        <Menu.Item key="recommend">推荐楼盘</Menu.Item> */}
      </Menu>
    </div>
  )
}

export default withRouter(SiderBar)
