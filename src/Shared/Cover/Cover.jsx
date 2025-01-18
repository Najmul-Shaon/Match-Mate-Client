import { Parallax } from "react-parallax";
import coverImg from "../../assets/BidataCover.jpg";

const Cover = () => {
  return (
    <Parallax
      blur={{ min: -100, max: 100 }}
      bgImage={coverImg}
      bgImageAlt="parallax background"
      strength={-200}
    >
      <div className="relative h-[400px] flex items-center justify-center bg-black bg-opacity-10">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        {/* Content */}
        <div className="relative z-10 text-white text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold uppercase">
              This is ther title
            </h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default Cover;
