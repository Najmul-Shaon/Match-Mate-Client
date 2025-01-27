import SectionTitle from "../SectionTitle/SectionTitle";
import SuccessStoryCard from "./SuccessStoryCard";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";

const SuccessStory = () => {
  const axiosPublic = useAxiosPublic();

  const { data: successStory = [] } = useQuery({
    queryKey: ["successStory"],
    queryFn: async () => {
      const res = await axiosPublic.get("/successStory");
      return res.data;
    },
  });

  return (
    <div className="max-w-screen-xl mt-24 mx-auto">
      <div className="mb-8">
        <SectionTitle
          header={"Our Success Story"}
          subHeader={"Where Matches Blossom into Love"}
        ></SectionTitle>
      </div>

      <div>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {successStory.map((singleSuccessStory) => (
            <SwiperSlide key={singleSuccessStory?._id}>
              <SuccessStoryCard
                singleSuccessStory={singleSuccessStory}
              ></SuccessStoryCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SuccessStory;
