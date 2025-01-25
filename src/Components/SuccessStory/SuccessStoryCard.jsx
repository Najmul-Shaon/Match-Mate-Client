import { Rating } from "@smastrom/react-rating";
import successImg2 from "../../assets/SuccessStory/2.jpg";
import "@smastrom/react-rating/style.css";
import { SiComma } from "react-icons/si";
const SuccessStoryCard = ({ singleSuccessStory }) => {
  const date = new Date(singleSuccessStory?.marriageDate);
  const formateDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  console.log(formateDate);
  return (
    <div className="flex justify-center">
      <div className="flex flex-col md:flex-row bg-primary shadow-xl p-8 rounded-xl border border-dashed w-[1000px] justify-center items-center gap-6">
        <figure className="w-full md:w-5/12 flex flex-col justify-center items-center">
          <img
            className="w-64 rounded-xl"
            src={singleSuccessStory?.coupleImgUrl}
            alt="Success image"
          />
        </figure>
        <div className="w-full md:w-7/12 text-center space-y-2">
          <div className="flex">
            <SiComma className="rotate-180"></SiComma>
            <SiComma className="rotate-180"></SiComma>
          </div>
          <p>{formateDate}</p>
          <span className="flex justify-center">
            <Rating
              style={{ maxWidth: 180 }}
              value={singleSuccessStory?.rating}
              readOnly
            />
          </span>
          <p>{singleSuccessStory?.story}</p>
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
