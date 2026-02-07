import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import SocialLogin from "./SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
  const navigate = useNavigate();
  const locatoin = useLocation();
  const { registerUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();

  /* react-hook-form------------ */
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  /* handleRegister form onSubmit------------- */
  const handleRegister = async (data) => {
    //console.log(data); // all data frorm regiter 123Qa@
    console.log(data.photo[0]);
    const profileImg = data?.photo?.[0];

    /* register -------- */
    await registerUser(data.email, data.password)
      .then((result) => {
        //console.log(result.user);
        /* store the image in form data-------*/
        const formData = new FormData();
        formData?.append("image", profileImg);
        const img_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`;

        /* send the photo to store and get the UI----------*/
        axios
          .post(img_API_URL, formData)
          .then((res) => {
            const photoURL = res?.data?.data?.display_url;
            //console.log("After image upload imgeBB", res.data.data.display_url);
            //update user profile to firebase ------------
            //! create user in the database------
            const userInfo = {
              displayName: data?.name,
              email: data?.email,
              photoURL: photoURL,
            };
            axiosSecure.post(`/user`, userInfo).then((res) => {
              if (res?.data?.insertedId) {
                console.log(res?.data);
              }
            });

            //! update user porfile to firebase---
            const userProfile = {
              displayName: data?.name,
              photoURL: photoURL,
            };

            updateUserProfile(userProfile)
              .then(() => {
                console.log("User profile updated done");
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
        toast.success("Rigister is successfully");
        navigate(locatoin.state || "/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Email already existed!");
      });
  };

  return (
    <div>
      <div className="mx-4 md:max-w-90 md:mx-auto shadow-2xl p-4 rounded-2xl">
        <h1 className="text-center text-2xl md:text-3xl font-bold text-secondary my-2">
          Welcome to Zap Shift
        </h1>
        <p className="text-sm text-center font-semibold text-gray-600">
          Please Registration Now
        </p>
        <form onSubmit={handleSubmit(handleRegister)}>
          <fieldset className="fieldset">
            {/* name------------ */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input w-full"
              placeholder="Name"
            />
            {/* photo------------ */}
            <label className="label">Photo</label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input w-full"
              placeholder="File"
            />
            {errors.file?.type === "required" && (
              <p className="text-red-500 text-sm">Your photo is required!</p>
            )}
            {/* email------------ */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input w-full"
              placeholder="Email"
            />

            {errors.email?.type === "required" && (
              <p className="text-red-500 text-sm">Email is required!</p>
            )}

            {/* password-------- */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
              })}
              className="input w-full"
              placeholder="Password"
            />
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password must be at least 6 characters
              </p>
            )}
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required!</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500">
                Password must include at least 1 uppercase, 1 lowercase, 1
                number, and 1 special character.
              </p>
            )}
            {/* register btn -------*/}
            <button className="btn bg-primary text-secondary mt-2">
              Register
            </button>
          </fieldset>

          {/* OR  --------*/}
          <div className=" text-center">
            <h2 className="font-bold ">OR</h2>
          </div>
          {/* Google --------------------*/}
          <div className="text-center my-1">
            <SocialLogin />
          </div>
          {/* already have an account------------- */}
          <p className="text-sm text-center mt-2">
            Already have an account?
            <Link
              state={locatoin.state}
              to="/login"
              className="text-blue-600 font-bold"
            >
              <span> Login</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
