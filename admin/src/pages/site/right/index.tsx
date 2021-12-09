import React from 'react';
import {
  Breadcrumb,
  Card,
  Tabs
} from '@arco-design/web-react';
import styles from './style/index.module.less';

import Tab0 from './components/tab0';
import Tab1 from './components/tab1';
import Tab3 from './components/tab3';




const HeaderFooter = () => {

  return <>
    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>侧栏配置</Breadcrumb.Item>
      </Breadcrumb>

      <Card hoverable>
        <Tabs defaultActiveTab='0' >
          <Tabs.TabPane key='0' title='个人简介'>
            <Tab0 />
          </Tabs.TabPane>
          <Tabs.TabPane key='1' title='广告设置'>
            <Tab1 />
          </Tabs.TabPane>
          <Tabs.TabPane key='2' title='推荐设置'>
            <Tab3 />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  </>
}

export default HeaderFooter;