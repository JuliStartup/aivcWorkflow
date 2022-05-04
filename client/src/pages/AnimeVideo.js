import React from 'react';

export default function AnimeVideo() {
  return (
    <>
      {/* <video src="/static/immi5.mp4" autoPlay loop muted /> */}
      <video
        style={{ width: '177.77777778vh', minWidth: '100%', filter: 'contrast(0.5)' }}
        autoPlay
        muted
        loop
        id="myVideo"
      >
        {/* <source src="/static/immi5.mp4" type="video/mp4" /> */}
        <source
          src="https://media.istockphoto.com/videos/people-lines-in-airport-waiting-area-video-id1152050491"
          type="video/mp4"
        />
        Your browser does not support HTML5 video.
      </video>
    </>
  );
}
