import video from "../../../assets/videos/video.mp4";

const VideoComponents = () => {
  return (
    <div>
      <section className="relative w-full h-[60vh] sm:h-[75vh] lg:h-screen overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={video}
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4 text-center">
          <h1
            className="text-white font-bold 
                       text-2xl sm:text-4xl lg:text-6xl 
                       max-w-4xl leading-tight"
          >
            AI-Powered Automation for <br className="hidden sm:block" />
            every Idea
          </h1>
        </div>

        {/* Scroll Text */}
        <div className="absolute bottom-6 w-full text-center z-10">
          <p className="text-white text-sm opacity-80">Scroll to Explore</p>
        </div>
      </section>
    </div>
  );
};

export default VideoComponents;
