import React, { SFC } from "react"
import { Layout } from 'antd'
import Menu from './components/menu'
import Routes from '../Router/Routes'
import style from './index.scss'

const { Sider, Header, Content } = Layout

interface ILayoutProps {}

const MainLayout: SFC<ILayoutProps> = () => {
  return (
    <Layout className={style.layout}>
      <Sider>
        <div className={style.logo}>
          卡尔技能练习系统
        </div>
          <Menu />
      </Sider>
      <Layout className={style.main}>
        <Header className={style.header}></Header>
        <Content className={style.content}>
            <Routes />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
