import React from 'react';
import {
  Breadcrumb,
  Card,
  Tabs
} from '@arco-design/web-react';
import styles from './style/index.module.less';

import Tab0 from './components/tab0';
import Tab1 from './components/tab1';




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
            
            </Tabs.TabPane>
        </Tabs>


          

        </Card>
        {/* <Card style={{ marginTop: 20 }} hoverable title="Footer配置">
          <Form.Item labelCol={{ span: 2 }} label="Copyright" field="footer.copyright" rules={[{ required: true, message: '请输入Copyright' }]}>
            <Input placeholder="请输入文本" />
          </Form.Item>
          <Form.Item labelCol={{ span: 2 }} label="额外信息" field="footer.extra">
            <Input placeholder="请输入额外信息" />
          </Form.Item>
        </Card> */}
    </div>
  </>
}

export default HeaderFooter;