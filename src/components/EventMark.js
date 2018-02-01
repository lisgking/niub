import React, { Component } from 'react';
import {
    Form, Button, Icon, Tooltip,
    Divider, Input, message,
} from 'antd';
import PerfectScrollbar from 'perfect-scrollbar';
import SchemaList from './SchemaList';
import styles from './eventmark.css';

const FormItem = Form.Item;
@Form.create()
export default class Notice extends Component {
    state = {
        size: 'small',
        notice_title: '',
        notice_time: '2017-02-12',
        editing: false,
        confrimBtn: '确认',
        showEdit: true,
    }

    componentDidMount() {
        const ps = new PerfectScrollbar('#event_mark', {
            wheelSpeed: 0.5,
            wheelPropagation: false,
            maxScrollbarLength: 100,
        });
        ps.update();
    }

    editClickHander = () => {
        if (this.state.editing) {
            this.setState({
                editing: false,
            });
            message.success('公告信息编辑成功');
        } else {
            this.setState({
                confrimBtn: '保存',
                showEdit: false,
            });
            this.setState({ editing: true });
        }
    }

    saveNoticeInfo = () => {
        this.setState({
            editing: false,
            confrimBtn: '已确认',
            showEdit: false,
        });
        message.success('公告信息保存成功');
    }
    // componentWillUnmount() {
    //     clearInterval(this.timer);
    // }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const size = this.state.size;
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 20 },
        };
        return (
            <div id="event_mark" className={styles.event_mark}>
                <Form className={styles.notice_form} onSubmit={this.handleSubmit}>
                    <FormItem
                        className={styles.item_line}
                        {...formItemLayout}
                        label="标题"
                    >
                        <span className={this.state.editing ? 'ant-form-text hidden' : 'ant-form-text'}>
                            {this.state.notice_title}
                        </span>
                        <Tooltip
                            trigger={['focus']}
                            title={this.state.notice_title}
                            placement="topLeft"
                            overlayClassName="numeric-input"
                        >
                            {getFieldDecorator('userName', {
                                rules: [],
                            })(
                                <Input
                                    name="notice_title"
                                    type={this.state.editing ? 'text' : 'hidden'}
                                    style={{ width: 200 }}
                                />,
                            )}
                        </Tooltip>

                        <div
                            onClick={this.editClickHander}
                            className={this.state.showEdit ? styles.editBtn : styles.hidden}
                        >
                            <Icon type="edit" />
                            <span>编辑</span>
                        </div>
                    </FormItem>
                    <FormItem
                        className={styles.item_line}
                        {...formItemLayout}
                        label="发布时间"
                    >
                        <span className={this.state.editing ? 'ant-form-text hidden' : 'ant-form-text'}>
                            {this.state.notice_time}
                        </span>
                        {getFieldDecorator('userName', {
                            rules: [],
                        })(
                            <Input
                                name="notice_time"
                                type={this.state.editing ? 'text' : 'hidden'}
                                style={{ width: 200 }}
                            />,
                        )}

                        <Button
                            onClick={this.saveNoticeInfo} size={size}
                            type="primary"
                            className={styles.confrim_notice_info}
                        >
                            {this.state.confrimBtn}
                        </Button>
                    </FormItem>
                </Form>
                <Divider style={{ margin: '10px 0' }} />
                <SchemaList />
                {/* <SchemaList /> */}

            </div>
        );
    }
}
