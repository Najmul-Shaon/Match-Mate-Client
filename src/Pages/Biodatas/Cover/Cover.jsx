import { Parallax } from "react-parallax";
import biodataCoverImg from "../../../assets/BidataCover.jpg";
const Cover = () => {
  return (
    <Parallax
      blur={{ min: -30, max: 30 }}
      bgImage={biodataCoverImg}
      bgImageAlt="Image of biodata cover"
      strength={-200}
    >
      {/* <div className="h-[300px] flex items-center justify-center bg-opacity-80 bg-blend-overlay">
        <h3 className="text-3xl text-neutral-content font-bold ">
          Explore Genuine Connections
        </h3>
      </div> */}
      <div className="relative h-[700px] bg-gray-800">
        {/* Background Overlay */}
        {/* <div className="absolute inset-0 bg-gray-900 bg-opacity-10"></div> */}

        {/* Content Section */}
        <div className="relative flex flex-col justify-center items-center h-full text-center">
          <div className="max-w-md text-neutral-content">
            {/* Title */}
            <h1 className="mb-5 text-5xl font-bold uppercase text-white">
              Explore Genuine Connections
            </h1>
            {/* Description */}
            <p className="mb-5 text-gray-300">
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
