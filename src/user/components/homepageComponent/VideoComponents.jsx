import video from "../../../assets/videos/video.mp4";
import { motion } from "framer-motion";

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
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-black/50"
        ></motion.div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white font-bold 
                       text-2xl sm:text-4xl lg:text-6xl 
                       max-w-4xl leading-tight"
          >
            AI-Powered Automation for <br className="hidden sm:block" />
            every Idea
          </motion.h1>
        </div>

        {/* Scroll Text */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-6 w-full text-center z-10"
        >
          <motion.p 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-white text-sm opacity-80"
          >
            Scroll to Explore
          </motion.p>
        </motion.div>
      </section>
    </div>
  );
};

export default VideoComponents;
