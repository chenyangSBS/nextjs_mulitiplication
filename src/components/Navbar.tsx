import React from 'react';
import Image from 'next/image';
import { Layout } from 'antd';
import Logo from '../app/Logo.png';


const Navbar = () => {
  
  const { Sider, Content } = Layout;
  const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    // width: '100%',
    // maxWidth: 'calc(50% - 8px)',
    background: 'white',
    border: '1px solid #e8e8e8',
  };

  const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: '60px',
    color: '#007bf9',
    backgroundColor: 'white',
  };

  const contentStyle: React.CSSProperties = {
    textAlign: 'left',
    fontSize: '1.5rem',
    minHeight: 60,
    lineHeight: '60px',
    color: '#007bf9',
    backgroundColor: 'white',
  };
  
  return (
    <div className="flex items-center justify-between w-full px-4 py-2 mb-5 border-b-2 border-gray-600 bg-[#FFFFFF]">
      <div className="flex items-center justify-between">
        <Layout style={layoutStyle}>
          <Sider width="25%" style={siderStyle}>
          <Image className='w-52' src={Logo} alt="TikTik"/>
          </Sider>
          <Content style={contentStyle}>
            <h1 className="w-52 text-2xl font-bold text-[#333333]">SOA Course Demo</h1>
          </Content>
      </Layout>
      </div>
    </div>
  )
}

export default Navbar;