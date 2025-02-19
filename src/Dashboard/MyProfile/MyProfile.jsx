import { useState } from "react";
import DashboardTitle from "../../Components/DashboardTitle/DashboardTitle";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";

const MyProfile = () => {
  const { user } = useAuth();
  console.log(user?.photoURL);

  // Use React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Simulating form submit (update profile)
  const onSubmit = (data) => {
    console.log("Updated profile:", data);
  };

  // Pre-filling form with user data
  const setDefaultValues = () => {
    setValue("displayName", user?.displayName || "");
    setValue("email", user?.email || "");
    setValue("bio", user?.bio || "");
  };

  // Initialize the form with user data
  useState(() => {
    setDefaultValues();
  }, [user]);

  return (
    <div className="min-h-screen bg-lightGray font-sans text-gray-800">
      <DashboardTitle
        content={`Welcome, ${user?.displayName}`}
      ></DashboardTitle>

      <section className="flex justify-center py-8">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-4xl">
          {/* Profile Info */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6">
              <img
                src={user?.photoURL}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-secondary"
              />
              <div>
                <h2 className="text-3xl font-semibold text-gray-900">
                  {user?.displayName}
                </h2>
              </div>
            </div>
            <div>
              <button
                className="bg-gold-500 text-white py-2 px-6 rounded-md font-semibold hover:bg-gold-600 transition-all duration-300"
                onClick={() => alert("Edit Profile")}
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Personal Information Section */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Personal Information
              </h3>
              <ul className="space-y-4">
                <li>
                  <label
                    className="block text-gray-800 font-semibold mb-2"
                    htmlFor="displayName"
                  >
                    Display Name
                  </label>
                  <input
                    id="displayName"
                    type="text"
                    {...register("displayName", {
                      required: "Name is required",
                    })}
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                  {errors.displayName && (
                    <span className="text-red-500 text-sm">
                      {errors.displayName.message}
                    </span>
                  )}
                </li>

                <li>
                  <label
                    className="block text-gray-800 font-semibold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                    disabled
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </li>
              </ul>
            </div>

            {/* Bio Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                About Me
              </h3>
              <textarea
                id="bio"
                {...register("bio")}
                className="w-full p-4 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                rows="5"
                placeholder="Tell us about yourself..."
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-between space-x-6">
              <button
                type="submit"
                className="bg-gold-500 text-white py-2 px-6 rounded-md font-semibold hover:bg-gold-600 transition-all duration-300"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default MyProfile;
