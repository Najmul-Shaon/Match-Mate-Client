import { Controller, useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
// img bb hosting keys
const imageHostingKey = import.meta.env.VITE_IMGBB_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const BiodataCreateEdit = () => {
  // const [bioPhoto, setBioPhoto] = useState("");
  const navigate = useNavigate();
  // get axios from hook
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  // get current date for date picker
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useAuth();
  // from react hook form
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    const date = new Date(formData.dateOfBirth);
    const formateDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    const profileImgFile = { image: formData.profileImg[0] };

    const imgBbResponse = async () => {
      const res = await axiosPublic.post(imageHostingApi, profileImgFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data.data.display_url);
      const biodataInfo = {
        userEmail: user.email,
        biodataPhoto: res.data.data.display_url,
        personalInfo: {
          name: formData.name,
          userPhone: formData.phoneNumber,
          status: formData.status,
          religion: formData.religion,
          biodataType: formData.gender,
          dateOfBirth: formateDate,
          age: formData.age,
          height: formData.height,
          weight: formData.weight,
          occupation: formData.occupation,
          race: formData.race,
          blood: formData.blood,
          nationality: formData.nationality,
          address: {
            present: {
              street: formData.presentAddressLine,
              city: formData.presentCity,
              division: formData.presentDivision,
              country: formData.presentCounty,
            },
            permanent: {
              street: formData.permanentAddressLine,
              city: formData.permanantCity,
              division: formData.permanentDivision,
              country: formData.permanentCounty,
            },
          },
        },
        familyInfo: {
          fatherInfo: {
            fName: formData.fatherName,
            fOccupation: formData.fatherOccupation,
            fNumber: formData.fatherPhoneNumber,
          },
          motherInfo: {
            mName: formData.motherName,
            mOccupation: formData.motherOccupation,
            mNumber: formData.motherPhoneNumber,
          },
          siblings: {
            brothers: formData.brother,
            sisters: formData.sister,
          },
        },
        expectedPartner: {
          eAge: formData.expectedAge,
          eWeight: formData.expectedWeight,
          eHeight: formData.expectedHeight,
        },
      };
      console.log(res.data.success);
      // setBioPhoto(res.data.data.display_url);
      if (res.data.success) {
        axiosSecure
          .post("/biodatas", biodataInfo)
          .then((postRes) => {
            console.log(postRes.data);
            if (postRes.data.insertedId) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Biodata created successfully!",
                showConfirmButton: false,
                timer: 1500,
              });
              reset();
              navigate("/dashboard");
            }
          })
          .catch((err) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Error occured!",
              showConfirmButton: false,
              timer: 1500,
            });
            console.log("error from post", err);
          });
      }
    };
    // console.log(biodataInfo);
    // console
    await imgBbResponse();
  };

  return (
    <div>
      <Helmet>
        <title>Match Mate || Edit</title>
      </Helmet>
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
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-accent focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your name"
                {...register("name", { required: "Required" })}
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
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-not-allowed"
                placeholder="example@gmail.com"
                readOnly
                disabled
                defaultValue={user?.email}
              />
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
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your phone number"
                {...register("phoneNumber", {
                  required: "Required",
                  minLength: {
                    value: 11,
                    message: "Must be 11 length",
                  },
                  maxLength: {
                    value: 11,
                    message: "Must be 11 length",
                  },
                  pattern: {
                    value: /^01\d{9}$/,
                    message: "Must be start with 01",
                  },
                })}
              />
              {errors.phoneNumber && (
                <span className="text-red-600">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>
            {/* Status field  */}
            <div className="col-span-2 lg:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Status
              </label>
              <select
                name="status"
                defaultValue={"--Status--"}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("status", {
                  required: "Required",
                  validate: (value) => value !== "--Status--" || "Required",
                })}
              >
                <option disabled>--Status--</option>
                <option value="Unmarried">Unmarried</option>
                <option value="Married">Married</option>
                <option value="Widow">Widow</option>
                <option value="Divorced">Divorced</option>
              </select>
              {errors.status && (
                <span className="text-red-600">{errors.status.message}</span>
              )}
            </div>
            {/* Religion field  */}
            <div className="col-span-2 lg:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Religion
              </label>
              <select
                name="religion"
                defaultValue={"--Religion--"}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("religion", {
                  required: "Required",
                  validate: (value) => value !== "--Religion--" || "Required",
                })}
              >
                <option disabled>--Religion--</option>
                <option value="Islam">Islam</option>
                <option value="Hindu">Hindu</option>
                <option value="Cristian">Cristian</option>
              </select>
              {errors.religion && (
                <span className="text-red-600">{errors.religion.message}</span>
              )}
            </div>
            {/* gender field  */}
            <div className="col-span-2 lg:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Gender
              </label>
              <select
                name="gender"
                defaultValue={"--Gender--"}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("gender", {
                  required: "Required",
                  validate: (value) => value !== "--Gender--" || "Required",
                })}
              >
                <option disabled>--Gender--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
              {errors.gender && (
                <span className="text-red-600">{errors.gender.message}</span>
              )}
            </div>
            {/* date of birth  */}
            <div className="col-span-2 lg:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Date of Birth
              </label>
              <Controller
                name="dateOfBirth"
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
                {...register("age", { required: "Required" })}
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

            <div className="col-span-3 lg:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Height
              </label>
              <select
                name="height"
                defaultValue={"--Height--"}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("height", {
                  required: "Required",
                  validate: (value) => value !== "--Height--" || "Required",
                })}
              >
                <option disabled>--Height--</option>
                <option value="4'0">4'0</option>
                <option value="4'1">4'1</option>
                <option value="4'2">4'2</option>
                <option value="4'3">4'3</option>
                <option value="4'4">4'4</option>
                <option value="4'5">4'5</option>
                <option value="4'6">4'6</option>
                <option value="4'7">4'7</option>
                <option value="4'8">4'8</option>
                <option value="4'10">4'10</option>
                <option value="4'11">4'11</option>
                <option value="4'12">4'12</option>
                <option value="5'0">5'0</option>
                <option value="5'1">5'1</option>
                <option value="5'2">5'2</option>
                <option value="5'3">5'3</option>
                <option value="5'4">5'4</option>
                <option value="5'5">5'5</option>
                <option value="5'6">5'6</option>
                <option value="5'7">5'7</option>
                <option value="5'8">5'8</option>
                <option value="5'9">5'9</option>
                <option value="5'10">5'10</option>
                <option value="5'11">5'11</option>
                <option value="5'12">5'12</option>
              </select>
              {errors.height && (
                <span className="text-red-600">{errors.height.message}</span>
              )}
            </div>
            {/* weight field  */}
            <div className="col-span-3 lg:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Weight
              </label>
              <select
                name="weight"
                defaultValue={"--Weight--"}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("weight", {
                  required: "Required",
                  validate: (value) => value !== "--Weight--" || "Required",
                })}
              >
                <option disabled>--Weight--</option>
                <option value="50">50</option>
                <option value="51">51</option>
                <option value="52">52</option>
                <option value="53">53</option>
                <option value="54">54</option>
                <option value="55">55</option>
                <option value="56">56</option>
                <option value="57">57</option>
                <option value="58">58</option>
                <option value="59">59</option>
                <option value="60">60</option>
                <option value="61">61</option>
                <option value="62">62</option>
                <option value="63">63</option>
                <option value="64">64</option>
                <option value="65">65</option>
                <option value="66">66</option>
                <option value="67">67</option>
                <option value="68">68</option>
                <option value="69">69</option>
                <option value="70">70</option>
                <option value="71">71</option>
                <option value="72">72</option>
                <option value="73">73</option>
                <option value="74">74</option>
                <option value="75">75</option>
                <option value="76">76</option>
                <option value="77">77</option>
                <option value="78">78</option>
                <option value="79">79</option>
                <option value="80">80</option>
                <option value="81">81</option>
                <option value="82">82</option>
                <option value="83">83</option>
                <option value="84">84</option>
                <option value="85">85</option>
                <option value="86">86</option>
                <option value="87">87</option>
                <option value="88">88</option>
                <option value="89">89</option>
                <option value="90">90</option>
              </select>
              {errors.weight && (
                <span className="text-red-600">{errors.weight.message}</span>
              )}
            </div>
            {/* occupation field  */}
            <div className="col-span-2 lg:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Occupationn
              </label>
              <select
                name="occupation"
                defaultValue={"--Occupation--"}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("occupation", {
                  required: "Required",
                  validate: (value) => value !== "--Occupation--" || "Required",
                })}
              >
                <option disabled>--Occupation--</option>
                <option value="Engineer">Engineer</option>
                <option value="Student">Student</option>
                <option value="Nurse">Nurse</option>
              </select>
              {errors.occupation && (
                <span className="text-red-600">
                  {errors.occupation.message}
                </span>
              )}
            </div>
            {/* race field  */}
            <div className="col-span-2 lg:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Race
              </label>
              <select
                name="race"
                defaultValue={"--Race--"}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("race", {
                  required: "Required",
                  validate: (value) => value !== "--Race--" || "Required",
                })}
              >
                <option disabled>--Race--</option>
                <option value="Light">Light</option>
                <option value="Fair">Fair</option>
                <option value="Olive">Olive</option>
                <option value="Brown">Brown</option>
                <option value="Dark Brown">Dark Brown</option>
              </select>
              {errors.race && (
                <span className="text-red-600">{errors.race.message}</span>
              )}
            </div>
            {/* blood group  */}
            <div className="col-span-2 lg:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Blood Group
              </label>
              <select
                name="blood"
                defaultValue={"--Blood Group--"}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("blood", {
                  required: "Required",
                  validate: (value) =>
                    value !== "--Blood Group--" || "Required",
                })}
              >
                <option disabled>--Blood Group--</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
              {errors.blood && (
                <span className="text-red-600">{errors.blood.message}</span>
              )}
            </div>
            {/* nationality filed  */}
            <div className="col-span-2 lg:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Nationality
              </label>
              <select
                name="nationality"
                defaultValue={"--Nationality--"}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("nationality", {
                  required: "Required",
                  validate: (value) =>
                    value !== "--Nationality--" || "Required",
                })}
              >
                <option disabled>--Nationality--</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Others">Others</option>
              </select>
              {errors.nationality && (
                <span className="text-red-600">
                  {errors.nationality.message}
                </span>
              )}
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
                  name="presentAddressLine"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your address"
                  {...register("presentAddressLine", {
                    required: "Required",
                  })}
                />
                {errors.presentAddressLine && (
                  <span className="text-red-600">
                    {errors.presentAddressLine.message}
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
                  defaultValue={"--City--"}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("presentCity", {
                    required: "Required",
                    validate: (value) => value !== "--City--" || "Required",
                  })}
                >
                  <option disabled>--City--</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Barisal">Barisal</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Chattagram">Chattagram</option>
                  <option value="Rangpur">Rangpur</option>
                  <option value="Mymensingh">Mymensingh</option>
                  <option value="Sylhet">Sylhet</option>
                </select>
                {errors.presentCity && (
                  <span className="text-red-600">
                    {errors.presentCity.message}
                  </span>
                )}
              </div>
              {/* present Division */}
              <div className="col-span-5 md:col-span-5 lg:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Division
                </label>

                <select
                  name="presentDivision"
                  defaultValue={"--Division--"}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("presentDivision", {
                    required: "Required",
                    validate: (value) => value !== "--Division--" || "Required",
                  })}
                >
                  <option disabled>--Division--</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Barisal">Barisal</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Chattagram">Chattagram</option>
                  <option value="Rangpur">Rangpur</option>
                  <option value="Mymensingh">Mymensingh</option>
                  <option value="Sylhet">Sylhet</option>
                </select>
                {errors.presentDivision && (
                  <span className="text-red-600">
                    {errors.presentDivision.message}
                  </span>
                )}
              </div>
              {/* present Country */}
              <div className="col-span-5 md:col-span-5 lg:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Country
                </label>

                <select
                  name="presentCounty"
                  defaultValue={"--Country--"}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("presentCounty", {
                    required: "Required",
                    validate: (value) => value !== "--Country--" || "Required",
                  })}
                >
                  <option disabled>--Country--</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Other">Other</option>
                </select>
                {errors.presentCounty && (
                  <span className="text-red-600">
                    {errors.presentCounty.message}
                  </span>
                )}
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
                  name="permanentAddressLine"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your address"
                  {...register("permanentAddressLine", {
                    required: "Required",
                  })}
                />
                {errors.permanentAddressLine && (
                  <span className="text-red-600">
                    {errors.permanentAddressLine.message}
                  </span>
                )}
              </div>
              {/* permanent city */}
              <div className="col-span-5 md:col-span-5 lg:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  City
                </label>

                <select
                  name="permanantCity"
                  defaultValue={"--City--"}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("permanantCity", {
                    required: "Required",
                    validate: (value) => value !== "--City--" || "Required",
                  })}
                >
                  <option disabled>--City--</option>
                  <option value="Barisal">Barisal</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Chattagram">Chattagram</option>
                  <option value="Rangpur">Rangpur</option>
                  <option value="Mymensingh">Mymensingh</option>
                  <option value="Sylhet">Sylhet</option>
                </select>
                {errors.permanantCity && (
                  <span className="text-red-600">
                    {errors.permanantCity.message}
                  </span>
                )}
              </div>
              {/* present Division */}
              <div className="col-span-5 md:col-span-5 lg:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Division
                </label>

                <select
                  name="permanentDivision"
                  defaultValue={"--Division--"}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("permanentDivision", {
                    required: "Required",
                    validate: (value) => value !== "--Division--" || "Required",
                  })}
                >
                  <option disabled>--Division--</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Barisal">Barisal</option>
                  <option value="Khulna">Khulna</option>
                </select>
                {errors.permanentDivision && (
                  <span className="text-red-600">
                    {errors.permanentDivision.message}
                  </span>
                )}
              </div>
              {/* present Country */}
              <div className="col-span-5 md:col-span-5 lg:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Country
                </label>

                <select
                  name="permanentCounty"
                  defaultValue={"--Country--"}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("permanentCounty", {
                    required: "Required",
                    validate: (value) => value !== "--Country--" || "Required",
                  })}
                >
                  <option disabled>--Country--</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Other">Other</option>
                </select>
                {errors.permanentCounty && (
                  <span className="text-red-600">
                    {errors.permanentCounty.message}
                  </span>
                )}
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
              {...register("profileImg", {
                required: "Please choose your photo",
              })}
            />
            {errors.profileImg && (
              <span className="text-red-600">{errors.profileImg.message}</span>
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
                    required: "Required",
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
                    required: "Required",
                    minLength: {
                      value: 11,
                      message: "Must be 11 length",
                    },
                    maxLength: {
                      value: 11,
                      message: "Must be 11 length",
                    },
                    pattern: {
                      value: /^01\d{9}$/,
                      message: "Must be start with 01",
                    },
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
                  defaultValue={"--Occupation--"}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("fatherOccupation", {
                    required: "Required",
                    validate: (value) =>
                      value !== "--Occupation--" || "Required",
                  })}
                >
                  <option disabled>--Occupation--</option>
                  <option value="Govt Employee">Govt Employee</option>
                  <option value="Non Govt Employee">Non Govt Employee</option>
                  <option value="Retired">Retired</option>
                </select>
                {errors.fatherOccupation && (
                  <span className="text-red-600">
                    {errors.fatherOccupation.message}
                  </span>
                )}
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
                    required: "Required",
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
                    required: "Required",
                    minLength: {
                      value: 11,
                      message: "Must be 11 length",
                    },
                    maxLength: {
                      value: 11,
                      message: "Must be 11 length",
                    },
                    pattern: {
                      value: /^01\d{9}$/,
                      message: "Must be start with 01",
                    },
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
                  name="motherOccupation"
                  defaultValue={"--Occupation--"}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("motherOccupation", {
                    required: "Required",
                    validate: (value) =>
                      value !== "--Occupation--" || "Required",
                  })}
                >
                  <option disabled>--Occupation--</option>
                  <option value="Govt Employee">Govt Employee</option>
                  <option value="Non Govt Employee">Non Govt Employee</option>
                  <option value="Retired">Retired</option>
                  <option value="Housewife">Housewife</option>
                </select>
                {errors.motherOccupation && (
                  <span className="text-red-600">
                    {errors.motherOccupation.message}
                  </span>
                )}
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
                    required: "Required",
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
                    required: "Required",
                  })}
                />
                {errors.sister && (
                  <span className="text-red-600">{errors.sister.message}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* expected partner info  */}
        <div className="">
          <h3 className="text-center mb-8 text-xl font-bold text-accent border rounded-t-lg border-t-2 border-t-accent pb-2 mt-24">
            Expected Partner
          </h3>
          {/* expected partner info fields  */}
          <div className="space-y-2 md:space-y-6">
            <div className="grid grid-cols-3 gap-3 md:gap-4 lg:gap-6">
              {/* expected Age field */}
              <div className="col-span-3 lg:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Age (year)
                </label>
                <input
                  type="number"
                  name="expectedAge"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your age"
                  {...register("expectedAge", {
                    required: "Required",
                  })}
                />
                {errors.expectedAge && (
                  <span className="text-red-600">
                    {errors.expectedAge.message}
                  </span>
                )}
              </div>
              {/* expected weight field  */}
              <div className="col-span-3 lg:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Weight
                </label>
                <select
                  name="expectedWeight"
                  defaultValue={"--Weight--"}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("expectedWeight", {
                    required: "Required",
                    validate: (value) => value !== "--Weight--" || "Required",
                  })}
                >
                  <option disabled>--Weight--</option>
                  <option value="50">50</option>
                  <option value="51">51</option>
                  <option value="52">52</option>
                  <option value="53">53</option>
                  <option value="54">54</option>
                  <option value="55">55</option>
                  <option value="56">56</option>
                  <option value="57">57</option>
                  <option value="58">58</option>
                  <option value="59">59</option>
                  <option value="60">60</option>
                  <option value="61">61</option>
                  <option value="62">62</option>
                  <option value="63">63</option>
                  <option value="64">64</option>
                  <option value="65">65</option>
                  <option value="66">66</option>
                  <option value="67">67</option>
                  <option value="68">68</option>
                  <option value="69">69</option>
                  <option value="70">70</option>
                  <option value="71">71</option>
                  <option value="72">72</option>
                  <option value="73">73</option>
                  <option value="74">74</option>
                  <option value="75">75</option>
                  <option value="76">76</option>
                  <option value="77">77</option>
                  <option value="78">78</option>
                  <option value="79">79</option>
                  <option value="80">80</option>
                  <option value="81">81</option>
                  <option value="82">82</option>
                  <option value="83">83</option>
                  <option value="84">84</option>
                  <option value="85">85</option>
                  <option value="86">86</option>
                  <option value="87">87</option>
                  <option value="88">88</option>
                  <option value="89">89</option>
                  <option value="90">90</option>
                </select>
                {errors.expectedWeight && (
                  <span className="text-red-600">
                    {errors.expectedWeight.message}
                  </span>
                )}
              </div>
              {/* expected height field  */}
              <div className="col-span-3 lg:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Height
                </label>
                <select
                  name="expectedHeight"
                  defaultValue={"--Height--"}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("expectedHeight", {
                    required: "Required",
                    validate: (value) => value !== "--Height--" || "Required",
                  })}
                >
                  <option disabled>--Height--</option>
                  <option value="4'0">4'0</option>
                  <option value="4'1">4'1</option>
                  <option value="4'2">4'2</option>
                  <option value="4'3">4'3</option>
                  <option value="4'4">4'4</option>
                  <option value="4'5">4'5</option>
                  <option value="4'6">4'6</option>
                  <option value="4'7">4'7</option>
                  <option value="4'8">4'8</option>
                  <option value="4'10">4'10</option>
                  <option value="4'11">4'11</option>
                  <option value="4'12">4'12</option>
                  <option value="5'0">5'0</option>
                  <option value="5'1">5'1</option>
                  <option value="5'2">5'2</option>
                  <option value="5'3">5'3</option>
                  <option value="5'4">5'4</option>
                  <option value="5'5">5'5</option>
                  <option value="5'6">5'6</option>
                  <option value="5'7">5'7</option>
                  <option value="5'8">5'8</option>
                  <option value="5'9">5'9</option>
                  <option value="5'10">5'10</option>
                  <option value="5'11">5'11</option>
                  <option value="5'12">5'12</option>
                </select>
                {errors.expectedHeight && (
                  <span className="text-red-600">
                    {errors.expectedHeight.message}
                  </span>
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
