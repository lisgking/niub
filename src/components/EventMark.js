import React, { Component } from 'react';
import {
    Form, Button, Icon, Tooltip, Affix,
    Row, Col,
    Divider, Input, message, Collapse,
} from 'antd';
import PerfectScrollbar from 'perfect-scrollbar';
import moment from 'moment';
import 'moment-precise-range-plugin';
import SchemaList from './SchemaList';
import styles from './eventmark.css';

const Panel = Collapse.Panel;

const customPanelStyle = {
    background: '#f7f7f7',
    boxShadow: '0 0 4px 0',
    marginBottom: 20,
    border: 0,
    overflow: 'hidden',
};

const timeNames = {
    years: '年',
    months: '月',
    days: '日',
    hours: '时',
    minutes: '分',
    seconds: '秒',
};

const confirmCheckBtn = {
    margin: '10px 0',
    height: '44px',
};

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
        endtime: '0时0分0秒',
    }

    componentDidMount() {
        const ps = new PerfectScrollbar('#event_mark', {
            wheelSpeed: 0.5,
            wheelPropagation: false,
            maxScrollbarLength: 100,
        });
        ps.update();
        const m2 = moment().add(1, 'hour');
        this.countDown(m2);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
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

    countDown(m2) {
        const interval = 1000;
        // const m2 = moment().add(1, 'hour');
        this.timer = setInterval(() => {
            let str = '';
            const m1 = moment();
            const diff = moment.preciseDiff(m1, m2, true);
            let flag = false;
            for (const key in timeNames) {
                if (diff[key] > 0 || flag) {
                    str += (diff[key] >= 10 ? diff[key] : `0${diff[key]}`) + timeNames[key];
                    flag = true;
                }
            }
            this.setState({
                endtime: str,
            });
        }, interval);
    }

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
            <div className={styles.event_mark} ref={(node) => { this.container = node; }}>
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
                            {getFieldDecorator('notice_title', {
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
                        {getFieldDecorator('notice_time', {
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
                    <Divider style={{ margin: '10px 0' }} />
                </Form>

                <div id="event_mark" className={styles.schema_content}>

                    <Collapse bordered={false} defaultActiveKey={['1']}>
                        <Panel header="This is panel header 1" key="1" style={customPanelStyle}>
                            <SchemaList />
                        </Panel>
                        <Panel header="This is panel header 2" key="2" style={customPanelStyle}>
                            <SchemaList />
                        </Panel>
                        <Panel header="This is panel header 3" key="3" style={customPanelStyle}>
                            <SchemaList />
                        </Panel>
                    </Collapse>
                </div>
                <Affix
                    offsetBottom={10}
                    className={styles.confrim_check}
                    target={() => this.container}
                >
                    <Row>
                        <Col span={3} offset={9}>
                            <Button type="primary" style={confirmCheckBtn}>
                                <div>提交审核</div>
                                <div>剩余时间：{this.state.endtime}</div>
                            </Button>
                        </Col>
                    </Row>

                </Affix>
            </div>
        );
    }
}
