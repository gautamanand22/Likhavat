// src/components/HeroBanner.tsx
import React from "react";
import video from "../assets/video/banner-video (online-video-cutter.com).mp4.mp4";

const HeroBanner = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background video */}
      <video
        src={video}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center text-white text-center px-4">
        <div>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl  mb-4"
            style={{ fontWeight: 200, letterSpacing: "-0.01em" }}
          >
            Quality prints <br /> Customize for you
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
