import { Parallax } from "react-parallax";
// import coverImg from "../../assets/BidataCover.jpg";

const Cover = ({ coverImg, coverTitle }) => {
  return (
    <Parallax
      blur={{ min: -15, max: 15 }}
      bgImage={coverImg}
      bgImageAlt="parallax background"
      strength={-200}
    >
      <div className="relative h-[100px] flex items-center justify-center bg-black bg-opacity-10">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        {/* Content */}
        <div className="relative z-10 text-white text-center">
          <div className="max-w-lg">
            <h1 className="mb-5 text-5xl font-bold uppercase">{coverTitle}</h1>
            
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default Cover;
