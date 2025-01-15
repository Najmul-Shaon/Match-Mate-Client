import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import SuccessStoryCard from "./SuccessStoryCard";
const SuccessStory = () => {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 3000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );
  return (
    <div>
      <div className="mb-8">
        <SectionTitle header={"Our Success Story"}></SectionTitle>
      </div>
      <div ref={sliderRef} className="keen-slider">
        <div className="keen-slider__slide number-slide1">
          <SuccessStoryCard></SuccessStoryCard>
        </div>
        <div className="keen-slider__slide number-slide1">
          <SuccessStoryCard></SuccessStoryCard>
        </div>
        <div className="keen-slider__slide number-slide1">
          <SuccessStoryCard></SuccessStoryCard>
        </div>
        <div className="keen-slider__slide number-slide1">
          <SuccessStoryCard></SuccessStoryCard>
        </div>
        <div className="keen-slider__slide number-slide1">
          <SuccessStoryCard></SuccessStoryCard>
        </div>
        <div className="keen-slider__slide number-slide1">
          <SuccessStoryCard></SuccessStoryCard>
        </div>
      </div>
    </div>
  );
};

export default SuccessStory;
