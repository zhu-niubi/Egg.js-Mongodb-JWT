import React, { useEffect, useState } from 'react';
import {
  Input,
  Breadcrumb,
  Card,
  Form,
  Grid,
  Link,
  Switch
} from '@arco-design/web-react';
import styles from './style/index.module.less';
import BlogTags from './components/tags';
import Save from '../../components/Save';
import UploadImage from '../../components/UploadImage';


const Row = Grid.Row;
const Col = Grid.Col;


const About = () => {
  const [form] = Form.useForm();
  const [resetLength, setResetLength] = useState(800);
  useEffect(() => {
    setTimeout(() => {
      form.setFieldsValue({
        tags: ['vue', 'react', 'node.js', 'egg.js'],
        showResume: false,
        desc: '',
        // imgs: [
        //   {
        //     _id: '',
        //     imgUrl: 'https://xuwenliu.github.io/img/index.jpg',
        //     link: '',
        //     icon: ''
        //   }
        // ]
      })
    }, 1000)
  }, [])

  const onRefresh = () => {

  }

  const onSave = async () => {
    await form.validate();
    const values = await form.getFields();
    console.log(values);

  }

  const onChangeDesc = (value) => {
    setResetLength(800 - value.length);
  }
  return <>
    <Save time="2021-11-22 13:14:45" onRefresh={onRefresh} onSave={onSave} />

    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>关于管理</Breadcrumb.Item>
      </Breadcrumb>
      <Card hoverable>
        <Form layout="vertical" form={form} >
          <Row>
            <Col span={10}>
              <Form.Item label="标签云:(1-20个)" field="tags" rules={[{ required: true, message: '请添加标签' }]}>
                <BlogTags max={20} />
              </Form.Item>

              <Form.Item label="详细介绍" field="desc" rules={[{ required: true, message: '请输入详细介绍' }, {
                maxLength: 800, message: '不能超过800个字符'
              }]}>
                <Input.TextArea rows={5} onChange={onChangeDesc} />
              </Form.Item>
              <div className={styles['desc-tip']}>
                还可以输入
                <Link status='error'>
                  {resetLength}
                </Link>
                个字符
              </div>

              <Form.Item label="个人简历" field="showResume" triggerPropName="checked">
                <Switch />
              </Form.Item>


            </Col>
            <Col span={12} offset={2}>
              <Form.Item label="介绍图片:(1-3张)" field="imgs" rules={[{ required: true, message: '请添加介绍图片' }]}>
                <UploadImage max={3} />
              </Form.Item>
            </Col>
          </Row>

        </Form>
      </Card>
    </div>
  </>
}

export default About;