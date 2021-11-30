import React, { useEffect, useState } from 'react';
import { Upload, Progress, Button, Input, Modal, Form } from '@arco-design/web-react';

import styles from './item.module.less';
import { IconPlus, IconEdit, IconDelete } from '@arco-design/web-react/icon';

const Item = (props) => {
    const {
        onChange,
        onRemove,
        onAdd,
        index = 0,
        showImg,
        showLink,
        showIcon,
        showAction,
        showAdd = true,
        showReduce = false,
        imgUrl,
        link,
        icon
    } = props;

    const [file, setFile] = useState<any>({
        url: imgUrl,
    })
    const cs = `arco-upload-list-item${file && file.status === 'error' ? ' is-error' : ''}`;
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        setFile({
            url: imgUrl
        });
        form.setFieldsValue({
            imgUrl
        })
    }, [imgUrl])
    const onCancel = () => {
        form.resetFields();
        setVisible(false);
    }
    const onOk = async () => {
        await form.validate();
        const values = await form.getFields();
        onChange({
            index,
            field: 'imgUrl',
            value: values.imgUrl
        });
        onCancel();
    }

    const handleChangeLink = (value) => {
        onChange({
            index,
            field: 'link',
            value
        });
    }
    const handleChangeIcon = (value) => {
        onChange({
            index,
            field: 'icon',
            value
        });
    }

    return (<div className={styles.item}>
        <div className={styles['item-content']}>
            {
                showImg && <div className={styles['upload-wrapper']}>
                    <Upload
                        action='/'
                        fileList={file ? [file] : []}
                        showUploadList={false}
                        onChange={(_, currentFile) => {
                            setFile({
                                ...currentFile,
                                url: URL.createObjectURL(currentFile.originFile),
                            })
                        }}
                        onProgress={(currentFile) => {
                            setFile(currentFile)
                        }}
                    >
                        <div className={cs} style={{ paddingRight: 0 }}>
                            {file && file.url ? (
                                <div className='arco-upload-list-item-picture custom-upload-avatar'>
                                    <img src={file.url} />
                                    <div className='arco-upload-list-item-picture-mask'>
                                        <IconEdit />
                                    </div>
                                    {file.status === 'uploading' && file.percent < 100 && <Progress
                                        percent={file.percent}
                                        type='circle'
                                        size='mini'
                                        style={{
                                            position: 'absolute',
                                            left: '50%',
                                            top: '50%',
                                            transform: 'translateX(-50%) translateY(-50%)'
                                        }}
                                    />
                                    }
                                </div>
                            ) : (
                                <div className='arco-upload-trigger-picture'>
                                    <div className='arco-upload-trigger-picture-text'>
                                        <IconPlus />
                                    </div>
                                </div>
                            )}
                        </div>
                    </Upload>
                    <Button className={styles['btn-input']} onClick={() => setVisible(true)} type="primary">输入链接</Button>
                </div>
            }

            <div>
                {
                    showLink && <Input onChange={handleChangeLink} value={link} className={styles.input} addBefore='链接' />
                }
                {
                    showIcon && <Input onChange={handleChangeIcon} value={icon} className={styles.input} addBefore='图标' />
                }


            </div>

            {
                showAction && <div className={styles.action}>
                    {
                        showReduce && <Button icon={<IconDelete />} status="danger" shape='circle' className={styles['btn']} onClick={() => onRemove(index)} ></Button>
                    }
                    {
                        showAdd && <Button icon={<IconPlus />} type="primary" shape='circle' className={styles['btn']} onClick={onAdd}></Button>
                    }
                </div>
            }

            <Modal
                title={(
                    <div style={{ textAlign: 'left' }}>图片链接 </div>
                )}
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
            >
                <Form
                    form={form}
                >
                    <Form.Item label='图片链接' field='imgUrl' rules={[{ required: true, message: '请输入图片链接' }]}>
                        <Input placeholder='请输入图片链接' />
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    </div>)
}

export default Item;