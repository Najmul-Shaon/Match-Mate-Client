import React from "react";
import { useForm } from "react-hook-form";
import { CiPhone } from "react-icons/ci";
import { FaFacebookF, FaGithub, FaLinkedin } from "react-icons/fa6";
import { IoLocationOutline, IoMailUnreadOutline } from "react-icons/io5";
import Swal from "sweetalert2";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    reset();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "We Received Your Message!",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  return (
    <div className="mt-24 max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8">
        {/* Left Section: Contact Details */}
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h2 className="text-3xl font-bold text-black mb-1">Contact Us</h2>
          <p className="text-black mb-6">
            Love knows no boundaries, and neither do we. Connect with us today.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center text-gray-600">
              <span className="me-2">
                <IoMailUnreadOutline></IoMailUnreadOutline>{" "}
              </span>
              najmul.nh.shaon@gmail.com
            </li>
            <li className="flex items-center text-gray-600">
              <span className="me-2">
                <CiPhone></CiPhone>
              </span>
              +88 01721-933810
            </li>
            <li className="flex items-center text-gray-600">
              <span className="me-2">
                <IoLocationOutline></IoLocationOutline>{" "}
              </span>{" "}
              Basila, Mohammadpur, Dhaka-1208
            </li>
          </ul>
          {/* Social Media Icons */}
          <div className="flex justify-start gap-5 text-xl mt-6">
            {[
              {
                icon: FaFacebookF,
                href: "https://www.facebook.com/najmulshaonnhs",
              },
              { icon: FaGithub, href: "https://github.com/Najmul-Shaon" },

              {
                icon: FaLinkedin,
                href: "https://www.linkedin.com/in/najmul-shaon",
              },
            ].map(({ icon: Icon, href }, index) => (
              <a
                key={index}
                href={href}
                className="bg-[#D4AF37] p-3 rounded-full text-white hover:bg-[#AC0404] transition duration-300"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Right Section: Contact Form */}
        <div className="md:w-1/2 w-full p-6 rounded-lg shadow-md bg-primary">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your full name"
                {...register("name", { required: "Required" })}
              />
              {errors.name && (
                <span className="text-red-600">{errors.name.message}</span>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your email"
                {...register("email", { required: "Required" })}
              />
              {errors.email && (
                <span className="text-red-600">{errors.email.message}</span>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your message"
                {...register("message", { required: "Required" })}
              ></textarea>
              {errors.message && (
                <span className="text-red-600">{errors.message.message}</span>
              )}
            </div>
            <button type="submit" className="btn-gradient w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
