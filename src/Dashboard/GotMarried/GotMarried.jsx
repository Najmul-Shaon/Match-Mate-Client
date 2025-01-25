import React, { useState } from "react";
import DashboardTitle from "../../Components/DashboardTitle/DashboardTitle";
import { Controller, useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import DatePicker from "react-datepicker";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// img bb hosting keys
const imageHostingKey = import.meta.env.VITE_IMGBB_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const GotMarried = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  // get current date for date picker
  const [startDate, setStartDate] = useState(new Date());

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const successImg = { image: data.successImg[0] };

    // const imgBbResponse = async () => {
    const res = await axiosPublic.post(imageHostingApi, successImg, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const successInfo = {
      selfId: data.selfId,
      partnerId: data.partnerId,
      story: data.story,
      status: "married",
      marriageDate: data.marriageDate,
      coupleImgUrl: res.data.data.display_url,
    };

    if (res.data.success) {
      axiosSecure
        .post("/successStory", successInfo)
        .then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your story has been created",
              showConfirmButton: false,
              timer: 1500,
            });
            reset();
            navigate("/dashboard");
          }
        })
        .catch((err) => {});
    }
    // };
    // await imgBbResponse();
    // console.log(res.data.data.display_url);
    // console.log(successInfo);
  };
  return (
    <div>
      <DashboardTitle content={"Share Your Sweet Story"}></DashboardTitle>
      <div className="mt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-6">
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Biodata Id
              </label>
              <input
                type="number"
                id="selfId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="e.g 1"
                {...register("selfId", {
                  required: "Required",
                })}
              />
              {errors.selfId && (
                <span className="text-red-600">{errors.selfId.message}</span>
              )}
            </div>
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Partner Biodata Id
              </label>
              <input
                type="number"
                id="partnerId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="e.g 2"
                {...register("partnerId", {
                  required: "Required",
                })}
              />
              {errors.partnerId && (
                <span className="text-red-600">{errors.partnerId.message}</span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-6">
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="successImg"
              >
                Upload file
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="successImg"
                type="file"
                {...register("successImg", { required: "Required" })}
              />
              {errors.successImg && (
                <span className="text-red-600">
                  {errors.successImg.message}
                </span>
              )}
            </div>
            {/* date of birth  */}
            <div className="col-span-2 lg:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Date of Birth
              </label>
              <Controller
                name="marriageDate"
                control={control}
                rules={{ required: "Required" }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    selected={field.value ? new Date(field.value) : startDate}
                    onChange={(date) => {
                      field.onChange(date);
                      setStartDate(date);
                    }}
                    placeholderText="Please choose a date"
                    style={{ width: "100%" }}
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                )}
              ></Controller>
            </div>
          </div>
          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your message
            </label>
            <textarea
              id="story"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
              {...register("story", { required: "Required" })}
            ></textarea>
            {errors.story && (
              <span className="text-red-600">{errors.story.message}</span>
            )}
          </div>
          {/* **********actions area ********** */}
          <div className="flex flex-col items-center mt-12">
            <button type="submit" className="btn-normal text-lg">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GotMarried;
