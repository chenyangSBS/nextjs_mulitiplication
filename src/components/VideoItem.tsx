import React from 'react';


interface VideoPlayerProps {
  url: string;
  name: string;
}

const VideoPlayer = ({ url, name }: VideoPlayerProps)=> {

  return (
    <div className="video-player">
      <h2>{name}</h2>
      <video
        src={url}
        width="70%"
        height="auto"
        controls
      >
        Your browser does not support the video tag.
      </video>
    </div>
  )
};

export default VideoPlayer;