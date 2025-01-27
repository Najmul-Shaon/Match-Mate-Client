import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";

const imageHostingKey = import.meta.env.VITE_IMGBB_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const Signup = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const imgFile = { image: data.file[0] };
    // create user
    createUser(data.email, data.password)
      //   if user dosent exits with this mail then
      .then(async (createUserResponse) => {
        const user = createUserResponse.user;
        //   image send to imgbb server
        const res = await axiosPublic.post(imageHostingApi, imgFile, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const userInfo = {
          userName: data?.name,
          userEmail: data?.email,
          userPhoto: res?.data?.data?.display_url,
          userRole: "user",
        };
        //   if image uploaded to the imgBb
        if (res.data.success) {
          updateUserProfile(data?.name, res?.data?.data?.display_url)
            .then(() => {
              axiosPublic
                .post("/user", userInfo)
                .then((userPostRes) => {
                  if (userPostRes.data.insertedId) {
                    Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "Welcome to Match Mate!!",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                    reset();
                    navigate("/");
                  }
                })
                .catch((err) => {
                  toast.error("Error occured!", {
                    style: {
                      border: "1px solid #713200",
                      padding: "16px",
                      color: "#713200",
                    },
                    iconTheme: {
                      error: "#f5f2f2",
                      secondary: "#FFFAEE",
                    },
                  });
                });
            })
            .catch((err) => {
              toast.error("Error occured!", {
                style: {
                  border: "1px solid #713200",
                  padding: "16px",
                  color: "#713200",
                },
                iconTheme: {
                  error: "#f5f2f2",
                  secondary: "#FFFAEE",
                },
              });
            });
        }
      })
      // .if user exits with this mail then
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
            toast.error("Already have an account with this email", {
              style: {
                border: "1px solid #713200",
                padding: "16px",
                color: "#713200",
              },
              iconTheme: {
                error: "#f5f2f2",
                secondary: "#FFFAEE",
              },
            });
            break;
          case "auth/invalid-email":
            toast.error("The email address is invalid", {
              style: {
                border: "1px solid #713200",
                padding: "16px",
                color: "#713200",
              },
              iconTheme: {
                error: "#f5f2f2",
                secondary: "#FFFAEE",
              },
            });
            break;
          case "auth/weak-password":
            toast.error(
              "The password is too weak. Please use at least 6 characters",
              {
                style: {
                  border: "1px solid #713200",
                  padding: "16px",
                  color: "#713200",
                },
                iconTheme: {
                  error: "#f5f2f2",
                  secondary: "#FFFAEE",
                },
              }
            );
            break;
          case "auth/operation-not-allowed":
            toast.error(
              "Sign-up is currently disabled. Please contact support",
              {
                style: {
                  border: "1px solid #713200",
                  padding: "16px",
                  color: "#713200",
                },
                iconTheme: {
                  error: "#f5f2f2",
                  secondary: "#FFFAEE",
                },
              }
            );
          case "auth/too-many-requests":
            toast.error("Too many requests. Please try again later", {
              style: {
                border: "1px solid #713200",
                padding: "16px",
                color: "#713200",
              },
              iconTheme: {
                error: "#f5f2f2",
                secondary: "#FFFAEE",
              },
            });
            break;
          default:
            toast.error("An unknown error occurred. Please try again", {
              style: {
                border: "1px solid #713200",
                padding: "16px",
                color: "#713200",
              },
              iconTheme: {
                error: "#f5f2f2",
                secondary: "#FFFAEE",
              },
            });
        }
      });
  };
  return (
    <div className="dark:bg-gray-900 mt-24">
      <Helmet>
        <title>Match Mate || Sign Up</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-primary rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create your account
            </h1>
            {/* inpur form  */}
            <form
              className="space-y-2 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* name field  */}
              <div>
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
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="example@gmail.com"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <span className="text-red-600">{errors.email.message}</span>
                )}
              </div>
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
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("password", {
                    required: "Password is required",
                    maxLength: {
                      value: 20,
                      message: "Password not more than 20 character",
                    },
                    minLength: {
                      value: 6,
                      message: "Password not less than 6 characted",
                    },
                    pattern: {
                      value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* )/,
                      message:
                        "Password must contain one number, one uppercase, one lowercase and one special character",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-red-600">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <button type="submit" className="btn-normal w-full text-lg">
                Sign Up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-accent hover:underline dark:text-primary-500"
                >
                  Log In
                </Link>
              </p>
            </form>
            {/* login with social accounts  */}
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
