import axioVideo from '../store/axioVideo';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import VideoItem from '../components/VideoItem';
import { Layout } from 'antd';
import { VideoInfo } from '../components/Sidebar';


async function fetchVideo(videoRequest: VideoInfo) {
  try {
    const response = await axioVideo.post('/videoURL', videoRequest);
    return response.data;
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
}

export default function VideoPage() {
  const [data, setData] = useState({
    url: '',
    name: ''
  });
  const [ videoInfo ] = useState<VideoInfo>({
    "bucket_name": "chapter1",
    "object_name": "CH01-Google Data Center Efficiency Best Practices.mp4"
  });

  const { Sider, Content } = Layout;

  useEffect(() => {
    fetchVideo(videoInfo).then(videoData => {
      setData(videoData);
    });
  }, [videoInfo]);

  const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
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

  const handleSidebarClick = (videoFromSidebar) => {
    fetchVideo(videoFromSidebar).then(videoData => {
      setData(videoData);
    });
  };

  return (
    <div>
      <Layout style={layoutStyle}>
          <Sider style={siderStyle} width="30%">
            <Sidebar
            onClick={handleSidebarClick}
            />
          </Sider>
          <Content style={contentStyle}>
            <VideoItem {...data} />
          </Content>
      </Layout>
    </div>
  );
}