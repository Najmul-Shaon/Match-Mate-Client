import cover1 from "../../../assets/Banner/01.jpg";
import cover2 from "../../../assets/Banner/02.jpg";
import cover3 from "../../../assets/Banner/03.jpg";
import cover4 from "../../../assets/Banner/04.jpg";
import cover5 from "../../../assets/Banner/05.jpg";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
const Banner = () => {
  return (
    // <div className="mx-auto w-full h-screen">
    <div className="max-w-screen-xl h-[70vh] mx-auto px-4 mt-20">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        // className="mySwiper"
        className="w-full h-full"
      >
        <SwiperSlide>
          <img
            className="w-full h-full object-cover"
            src={cover2}
            alt="cover 2"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            className="w-full h-full object-cover"
            src={cover1}
            alt="cover 1"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            className="w-full h-full object-cover"
            src={cover3}
            alt="cover 3"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full h-full object-cover"
            src={cover4}
            alt="cover 4"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full h-full object-cover"
            src={cover5}
            alt="cover 4"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
