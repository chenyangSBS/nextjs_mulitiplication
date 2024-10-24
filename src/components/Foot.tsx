// Footer.js
import React from 'react';
import { Layout, Row, Col } from 'antd';


const Footer = () => {
  return (
    <Layout.Footer style={{ backgroundColor: '#eef1f9', padding: '24px', borderRadius: 8, border: '1px solid #e8e8e8' }}>
      <Row>
        <Col span={8} offset={8}>
          <p style={{ textAlign: 'center' }}>Copyright © 2024 Shanghai Bussiness School. All rights reserved.</p>
        </Col>
      </Row>
    </Layout.Footer>
  );
};

export default Footer;