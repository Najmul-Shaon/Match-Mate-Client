import Swal from "sweetalert2";
import useAuth from "./useAuth";

const useLogout = () => {
  const { logOut } = useAuth();
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "You have been successfully logged out.",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch(() => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Something went wrong. Please try again.",
              showConfirmButton: false,
              timer: 1000,
            });
          });
      }
    });
  };
  return handleLogout;
};

export default useLogout;
