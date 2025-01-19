import { useForm } from "react-hook-form";
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
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* personal info  */}

        <div className="space-y-2 md:space-y-6">
          <h3 className="text-center mb-8 text-xl font-bold text-accent border rounded-t-lg border-t-2 border-t-accent pb-2">
            Personal Info
          </h3>
          <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-4 lg:gap-6">
            {/* name field  */}
            <div className="w-full md:w-1/2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-accent focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          <div className="grid grid-cols-6 gap-3 md:gap-4 lg:gap-6">
            {/* number field  */}
            <div className="col-span-4 md:col-span-4 lg:col-span-2">
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
                <span className="text-red-600">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>
            {/* Religion field  */}
            <div className="col-span-2 lg:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Religion
              </label>
              <select
                name="religion"
                defaultValue={"Choose an option"}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option disabled>Choose an option</option>
                <option value="Islam">Islam</option>
                <option value="Hindu">Hindu</option>
                <option value="Cristian">Cristian</option>
              </select>
            </div>
            {/* gender field  */}
            <div className="col-span-2 lg:col-span-1">
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
            <div className="col-span-2 lg:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Date of Birth
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="Please choose a date"
                style={{ width: "100%" }}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            {/* age field  */}
            <div className="col-span-2 lg:col-span-1">
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
          <div className="grid grid-cols-6 gap-3 md:gap-4 lg:gap-6">
            {/* height field */}
            <div className="col-span-2 lg:col-span-1">
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
            <div className="col-span-2 lg:col-span-1">
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
            <div className="col-span-2 lg:col-span-1">
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
            <div className="col-span-2 lg:col-span-1">
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
            <div className="col-span-2 lg:col-span-1">
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
            <div className="col-span-2 lg:col-span-1">
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
          {/* address field  */}
          <div className="flex flex-col lg:flex-row gap-3 md:gap-4 lg:gap-6">
            {/* present address  */}
            <div className="border p-4 rounded-xl w-full lg:w-1/2 space-y-2 md:space-y-6">
              <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                Present Address
              </label>
              {/* present address field  01 */}
              <div className="col-span-5 md:col-span-5 lg:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Address Line
                </label>
                <input
                  type="text"
                  name="addressLine01"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your address"
                  {...register("addressLine01", {
                    required: "This field is required",
                  })}
                />
                {errors.addressLine01 && (
                  <span className="text-red-600">
                    {errors.addressLine01.message}
                  </span>
                )}
              </div>
              {/* present city */}
              <div className="col-span-5 md:col-span-5 lg:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  City
                </label>

                <select
                  name="presentCity"
                  defaultValue={"Choose an option"}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option disabled>Choose an option</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Barisal">Barisal</option>
                  <option value="Khulna">Khulna</option>
                </select>
              </div>
              {/* present Division */}
              <div className="col-span-5 md:col-span-5 lg:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Division
                </label>

                <select
                  name="presentDivision"
                  defaultValue={"Choose an option"}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option disabled>Choose an option</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Barisal">Barisal</option>
                  <option value="Khulna">Khulna</option>
                </select>
              </div>
              {/* present Country */}
              <div className="col-span-5 md:col-span-5 lg:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Country
                </label>

                <select
                  name="presentCounty"
                  defaultValue={"Choose an option"}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option disabled>Choose an option</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Srilanka">Srilanka</option>
                  <option value="Iran">Iran</option>
                </select>
              </div>
            </div>
            {/* permanent address  */}
            <div className="border p-4 rounded-xl w-full lg:w-1/2 space-y-2 md:space-y-6">
              <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                Permanent Address
              </label>
              {/* present address field  01 */}
              <div className="col-span-5 md:col-span-5 lg:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Address Line
                </label>
                <input
                  type="text"
                  name="addressLine01"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your address"
                  {...register("addressLine01", {
                    required: "This field is required",
                  })}
                />
                {errors.addressLine01 && (
                  <span className="text-red-600">
                    {errors.addressLine01.message}
                  </span>
                )}
              </div>
              {/* present city */}
              <div className="col-span-5 md:col-span-5 lg:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  City
                </label>

                <select
                  name="presentCity"
                  defaultValue={"Choose an option"}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option disabled>Choose an option</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Barisal">Barisal</option>
                  <option value="Khulna">Khulna</option>
                </select>
              </div>
              {/* present Division */}
              <div className="col-span-5 md:col-span-5 lg:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Division
                </label>

                <select
                  name="presentDivision"
                  defaultValue={"Choose an option"}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option disabled>Choose an option</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Barisal">Barisal</option>
                  <option value="Khulna">Khulna</option>
                </select>
              </div>
              {/* present Country */}
              <div className="col-span-5 md:col-span-5 lg:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Country
                </label>

                <select
                  name="presentCounty"
                  defaultValue={"Choose an option"}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option disabled>Choose an option</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Srilanka">Srilanka</option>
                  <option value="Iran">Iran</option>
                </select>
              </div>
            </div>
          </div>
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
        </div>
        {/* family info  */}
        <div className="">
          <h3 className="text-center mb-8 text-xl font-bold text-accent border rounded-t-lg border-t-2 border-t-accent pb-2 mt-24">
            Family Info
          </h3>
          {/* family informations fields  */}
          <div className="space-y-2 md:space-y-6">
            {/* father fields  */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 lg:gap-6">
              {/* father's name field  */}
              <div className="col-span-3 lg:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Father's Name
                </label>
                <input
                  type="text"
                  name="fatherName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-accent focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Father's name"
                  {...register("fatherName", {
                    required: "Father name is required",
                  })}
                />
                {errors.fatherName && (
                  <span className="text-red-600">
                    {errors.fatherName.message}
                  </span>
                )}
              </div>
              {/* father number field  */}
              <div className="col-span-3 lg:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Father's Phone Number
                </label>
                <input
                  type="number"
                  name="fatherPhoneNumber"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Father's phone number"
                  {...register("fatherPhoneNumber", {
                    required: "Phone number is required",
                  })}
                />
                {errors.fatherPhoneNumber && (
                  <span className="text-red-600">
                    {errors.fatherPhoneNumber.message}
                  </span>
                )}
              </div>
              {/* Father occupation  */}
              <div className="col-span-3 lg:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Father's Occupation
                </label>
                <select
                  name="fatherOccupation"
                  defaultValue={"Choose an option"}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option disabled>Choose an option</option>
                  <option value="Govt Employee">Govt Employee</option>
                  <option value="Non Govt Employee">Non Govt Employee</option>
                  <option value="Retired">Retired</option>
                </select>
              </div>
            </div>

            {/* mother fields  */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 lg:gap-6">
              {/* mother's name field  */}
              <div className="col-span-3 lg:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Mother's Name
                </label>
                <input
                  type="text"
                  name="motherName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-accent focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Mother's name"
                  {...register("motherName", {
                    required: "Mother name is required",
                  })}
                />
                {errors.motherName && (
                  <span className="text-red-600">
                    {errors.motherName.message}
                  </span>
                )}
              </div>
              {/*mother number field  */}
              <div className="col-span-3 lg:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Phone Number
                </label>
                <input
                  type="number"
                  name="motherPhoneNumber"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your phone number"
                  {...register("motherPhoneNumber", {
                    required: "Phone number is required",
                  })}
                />
                {errors.motherPhoneNumber && (
                  <span className="text-red-600">
                    {errors.motherPhoneNumber.message}
                  </span>
                )}
              </div>
              {/* Mother occupation  */}
              <div className="col-span-3 lg:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Mother Occupation
                </label>
                <select
                  name="gender"
                  defaultValue={"Choose an option"}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option disabled>Choose an option</option>
                  <option value="Govt Employee">Govt Employee</option>
                  <option value="Non Govt Employee">Non Govt Employee</option>
                  <option value="Retired">Retired</option>
                  <option value="Housewife">Housewife</option>
                </select>
              </div>
            </div>

            {/* siblings area  */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-6">
              {/* Brother count  */}
              <div className="col-span-1 lg:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Brother's (except you)
                </label>
                <input
                  type="number"
                  name="brother"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="How many brother you have"
                  {...register("brother", {
                    required: "This field is required",
                  })}
                />
                {errors.brother && (
                  <span className="text-red-600">{errors.brother.message}</span>
                )}
              </div>
              {/* Sister count  */}
              <div className="col-span-1 lg:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Sister's (except you)
                </label>
                <input
                  type="number"
                  name="sister"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="How many sister you have"
                  {...register("sister", {
                    required: "This field is required",
                  })}
                />
                {errors.sister && (
                  <span className="text-red-600">{errors.sister.message}</span>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* **********actions area ********** */}
        <div className="flex flex-col items-center mt-12">
          <button type="submit" className="btn-normal text-lg">
            Save and Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default BiodataCreateEdit;
