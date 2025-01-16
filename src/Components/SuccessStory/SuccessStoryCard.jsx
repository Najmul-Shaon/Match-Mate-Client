import { Rating } from "@smastrom/react-rating";
import successImg2 from "../../assets/SuccessStory/2.jpg";
import "@smastrom/react-rating/style.css";
import { SiComma } from "react-icons/si";
const SuccessStoryCard = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col md:flex-row bg-primary shadow-xl p-8 rounded-xl border border-dashed w-[1000px] justify-center items-center gap-6">
        <figure className="w-full md:w-5/12">
          <img
            className="w-full h-full rounded-xl"
            src={successImg2}
            alt="Success image"
          />
        </figure>
        <div className="w-full md:w-7/12 text-center space-y-2">
          <div className="flex">
            <SiComma className="rotate-180"></SiComma>
            <SiComma className="rotate-180"></SiComma>
          </div>
          <p>08/10/2025</p>
          <span className="flex justify-center">
            <Rating style={{ maxWidth: 180 }} value={3} readOnly />
          </span>
          <p>
            Click the button to watch on Jetflix app.Click the button to watch
            on Jetflix app. Click the button to watch on Jetflix app. Click the
            button to watch on Jetflix app. Click the button to watch on Jetflix
            app.
          </p>
          <div className="flex justify-end">
            <SiComma className="text-end"></SiComma>
            <SiComma className="text-end"></SiComma>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoryCard;
