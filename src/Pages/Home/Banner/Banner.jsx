import cover1 from "../../../assets/Banner/01.webp";
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
import { Link } from "react-router-dom";
const Banner = () => {
  const bannerImgs = [cover1, cover2, cover3, cover4, cover5];
  return (
    // <div className="mx-auto w-full h-screen">
    // <div className="max-w-screen-xl h-[70vh] mx-auto px-4 mt-20">
    <div className="">
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
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        // className="mySwiper"
        className="w-full h-full"
      >
        {bannerImgs.map((bannerimg) => (
          <SwiperSlide>
            <div
              style={{ backgroundImage: `url(${bannerimg})` }}
              className="h-[550px] bg-cover bg-center relative flex items-center justify-center"
            >
              {/* Overlay to improve text readability */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Text Content */}
              <div className="relative z-10 text-center text-white px-4">
                <h3 className="text-3xl font-bold">
                  💍 Find love. Build dreams. Begin your journey today!
                </h3>
                <p className="mt-2">
                  📌 Genuine Profiles | 💖 Personalized Matches | 🔒 Secure &
                  Private
                </p>
                <Link to="/biodatas">
                  <button className="bg-gradient-to-r from-[#AC0404] to-[#D4AF37] text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300 ease-in-out mt-4">
                    Find Partner Now
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
