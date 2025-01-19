import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const BiodataCreateEdit = () => {
  const [startDate, setStartDate] = useState(new Date());
  // from react hook form
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <form
        className="space-y-2 md:space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-center mb-8 text-xl font-bold text-accent border-b">
          Personal Info
        </h3>
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* name field  */}
          <div className="w-full md:w-1/2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <span className="text-red-600">{errors.name.message}</span>
            )}
          </div>
          {/* email field  */}
          <div className="w-full md:w-1/2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 hover:cursor-not-allowed"
              placeholder="example@gmail.com"
              readOnly
              disabled
              defaultValue={user?.email}
              // {...register("email", { required: "Email is required" })}
            />
            {/* {errors.email && (
              <span className="text-red-600">{errors.email.message}</span>
            )} */}
          </div>
        </div>
        {/* ************************************  */}
        <div className="grid grid-cols-5 gap-6">
          {/* number field  */}
          <div className="col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Phone Number
            </label>
            <input
              type="number"
              name="phoneNumber"
              id="phoneNumber"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your phone number"
              {...register("phoneNumber", {
                required: "Phone number is required",
              })}
            />
            {errors.phoneNumber && (
              <span className="text-red-600">{errors.phoneNumber.message}</span>
            )}
          </div>
          {/* gender field  */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Gender
            </label>
            <select
              name="gender"
              defaultValue={"Choose an option"}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option disabled>Choose an option</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>
          {/* date of birth  */}
          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Date of Birth
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              isClearable
              placeholderText="Please choose a date"
              style={{ width: "100%" }}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {/* age field  */}
          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Age
            </label>
            <input
              type="number"
              name="age"
              id="age"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your age"
              {...register("age", { required: "Age is required" })}
            />
            {errors.age && (
              <span className="text-red-600">{errors.age.message}</span>
            )}
          </div>
        </div>
        {/* ************************************  */}
        {/* ************************************  */}
        <div className="grid grid-cols-6 gap-6">
          {/* height field */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Height
            </label>
            <div className="flex">
              <input
                type="number"
                name="feet"
                id="feet"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-s-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Feet"
                {...register("feet", { required: "Feet is required" })}
              />
              {errors.feet && (
                <span className="text-red-600">{errors.feet.message}</span>
              )}
              <input
                type="number"
                name="inch"
                id="inch"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-e-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Inch"
                {...register("inch", { required: "Inch is required" })}
              />
              {errors.inch && (
                <span className="text-red-600">{errors.inch.message}</span>
              )}
            </div>
          </div>
          {/* weight field  */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Weight
            </label>
            <input
              type="number"
              name="weight"
              id="weight"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your weight"
              {...register("weight", { required: "Weight is required" })}
            />
            {errors.weight && (
              <span className="text-red-600">{errors.weight.message}</span>
            )}
          </div>
          {/* occupation field  */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Occupation
            </label>
            <select
              name="gender"
              defaultValue={"Choose an option"}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option disabled>Choose an option</option>
              <option value="Doctor">Doctor</option>
              <option value="Engineer">Engineer</option>
              <option value="Student">Student</option>
            </select>
          </div>
          {/* race field  */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Race
            </label>
            <select
              name="gender"
              defaultValue={"Choose an option"}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option disabled>Choose an option</option>
              <option value="Light">Light</option>
              <option value="Fair">Fair</option>
              <option value="Olive">Olive</option>
              <option value="Brown">Brown</option>
              <option value="Dark Brown">Dark Brown</option>
            </select>
          </div>
          {/* blood group  */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Blood Group
            </label>
            <select
              name="gender"
              defaultValue={"Choose an option"}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option disabled>Choose an option</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          {/* nationality filed  */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Nationality
            </label>
            <select
              name="nationality"
              defaultValue={"Choose an option"}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option disabled>Choose an option</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>

        {/* ************************************  */}

        {/* ******************************************** */}
        {/* photo url  */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Choose your photo
          </label>
          <input
            className="block w-full mb-2 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="small_size"
            type="file"
            {...register("file", {
              required: "Please choose your photo",
            })}
          />
          {errors.file && (
            <span className="text-red-600">{errors.file.message}</span>
          )}
        </div>
        {/* **********actions area ********** */}
        <button type="submit" className="btn-normal w-full text-lg">
          Save and Publish
        </button>
      </form>
    </div>
  );
};

export default BiodataCreateEdit;
