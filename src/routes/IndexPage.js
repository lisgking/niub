import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import { connect } from 'dva';
import Notice from '../components/Notice';
import EventMark from '../components/EventMark';
import styles from './IndexPage.css';

const { Header, Content } = Layout;

class IndexPage extends Component {
    state = {
        notice_title: '123',
    }
    render() {
        return (
            <Layout className="layout" style={{ height: '100%' }}>
                <Header>
                    <div className={styles.logo} />
                    <div className={styles.notice_title}>{this.state.notice_title}</div>
                </Header>
                <Content style={{ padding: '0', height: '90%' }}>
                    <div style={{ height: '100%' }}>
                        <Row style={{ height: '100%' }}>
                            <Col span={12} style={{ height: '100%' }}>
                                <Notice notice_id="16904510" style={{ height: '100%' }} />
                            </Col>
                            <Col span={12} style={{ height: '100%' }}>
                                <EventMark />
                            </Col>
                        </Row>
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default connect()(IndexPage);
