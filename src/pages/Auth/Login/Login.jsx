import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import SocialLogin from "../Register/SocialLogin";

const Login = () => {
  const navigate = useNavigate();
  const locatoin = useLocation();
  const { signInUser } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleRegistr = (data) => {
    console.log(data);
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        toast.success("Login is successfully");
        navigate(locatoin?.state || "/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Login isn't successfully!");
      });
  };

  return (
    <div>
      <div className="mx-4 md:max-w-90 md:mx-auto shadow-2xl p-4 rounded-2xl">
        <h1 className="text-center text-2xl md:text-3xl font-bold text-secondary my-2">
          Login Now
        </h1>
        <form onSubmit={handleSubmit(handleRegistr)}>
          <fieldset className="fieldset">
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
            {/* forget password-------- */}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            {/* login btn------------*/}
            <button className="btn  bg-primary text-secondary mt-2">
              Login
            </button>
          </fieldset>
        </form>
        {/* OR  -----------------------*/}
        <div className=" text-center">
          <h2 className="font-bold ">OR</h2>
        </div>
        {/* Google---------------- */}
        <SocialLogin />
        {/* already have an account------------- */}
        <p className="text-sm text-center mt-2">
          New to zap-shift account?
          <Link
            to="/register"
            state={locatoin.state}
            className="text-blue-600 font-bold"
          >
            <span> Register</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
