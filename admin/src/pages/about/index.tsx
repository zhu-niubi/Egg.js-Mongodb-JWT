import React, { useEffect } from 'react';
import {
    Button,
    Input,
    Breadcrumb,
    Card,
    Form,
    Grid
} from '@arco-design/web-react';
import styles from './style/index.module.less';
import BlogTags from './components/tags';

const Row = Grid.Row;
const Col = Grid.Col;

const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 18
    }
}
const About = () => {
    const [form] = Form.useForm();
    useEffect(() => {
        setTimeout(() => {
            form.setFieldsValue({
                tags: ['vue','react']
            })
        }, 3000)
    }, [])

    const submit = async () => {
        await form.validate();
        const values = await form.getFields();
        console.log(values);

    }
    return <div className={styles.container}>
        <Breadcrumb style={{ marginBottom: 20 }}>
            <Breadcrumb.Item>关于管理</Breadcrumb.Item>
        </Breadcrumb>
        <Card hoverable>
            <Form form={form} {...formItemLayout}>
                <Row>
                    <Col span={12}>
                        <Form.Item label="标签云:(1-20个)" field="tags" rules={[{ required: true, message: '请添加标签' }]}>
                            <BlogTags max={20}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Button onClick={submit}>获取值</Button>
                    </Col>
                </Row>

            </Form>
        </Card>
    </div>
}

export default About;