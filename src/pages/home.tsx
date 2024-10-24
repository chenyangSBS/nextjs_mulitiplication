import axios from '../store/axios';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Video from '../components/VideoItem';
import Card from '../components/Card';
import { Col, Row } from 'antd';
import { VideoInfo } from '../components/Sidebar';


export default function HomePage() {
  return (
    <div>
      <Row style={{ height: 800 }}>
        <Col span={8} />
        <Col span={8}>
          <Card title="乘法游戏" bordered={false} style={{ width: 300 }} />
        </Col>
        <Col span={8} />
    </Row>
    </div>
  );
}