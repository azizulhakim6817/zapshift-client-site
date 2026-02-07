import { useForm, useWatch } from "react-hook-form";
import bikerImg from "../../../assets/agent-pending.png";
import { useLoaderData, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Rider = () => {
  const { user } = useAuth();
  const riderLocation = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  //! react-hook-form------------------
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  //! rigions seleted---------------------
  const regionsDuplicate = riderLocation?.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];

  //console.log(regions);

  //! districts-------------------------
  const districtByRegion = (region) => {
    const regionDistricts = riderLocation?.filter((c) => c.region === region);
    const districts = regionDistricts?.map((d) => d.district);
    return districts;
  };
  //! sender and reciver---------------------------
  const riderRegion = useWatch({ control, name: "region" });

  const handleRider = (data) => {
    //console.log(data);
    axiosSecure.post("/rider", data).then((res) => {
      console.log(res.data);
      navigate("/dashboard");
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Rider has created successfully",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };

  return (
    <div className="mt-4 mb-12  md:mx-20  my-4">
      <div className="gap-2 grid grid-cols-1 md:grid-cols-2 justify-center items-center">
        <div className="card-body order-2 md:order-1">
          <h1 className="text-2xl md:text-3xl font-bold text-secondary">
            Be a Rider
          </h1>
          <p>
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
          <hr className="text-gray-400 mt-4" />
          <p className=" text-xl font-bold text-secondary">
            Tell us about yourself
          </p>
          <form onSubmit={handleSubmit(handleRider)}>
            <fieldset className="fieldset">
              {/* your name */}
              <label className="label">Your Name : </label>
              <input
                {...register("name")}
                className="input w-full"
                placeholder="Your name..."
              />
              {/* your Driving License Number */}
              <label className="label">Driving License Number : </label>
              <input
                {...register("license")}
                className="input w-full"
                placeholder="Driving License Number..."
              />
              {/* Your Email*/}
              <label className="label">Your Email : </label>
              <input
                {...register("email")}
                className="input w-full"
                placeholder="Your Email..."
              />
              {/* NID No */}
              <label className="label">NID No : </label>
              <input
                {...register("nid")}
                className="input w-full"
                placeholder="NID No..."
              />
              {/* Phone Number */}
              <label className="label">Phone Number : </label>
              <input
                {...register("riderPhone")}
                className="input w-full"
                placeholder="Phone Number..."
              />
              {/* region -- -------------------*/}
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-gray-500 font-normal">
                  Your Regions
                </legend>
                <select
                  {...register("region")}
                  className="select w-full text-gray-500 font-normal"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Pick a Region
                  </option>

                  {regions?.map((r, i) => (
                    <option value={r} key={i}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>
              {/* sender distric----------------- */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-gray-500 font-normal">
                  Your District
                </legend>
                <select
                  {...register("district")}
                  className="select w-full text-gray-500 font-normal"
                  defaultValue=""
                  disabled={!riderRegion}
                >
                  <option value="" disabled>
                    Pick a District
                  </option>

                  {districtByRegion(riderRegion)?.map((d, i) => (
                    <option value={d} key={i}>
                      {d}
                    </option>
                  ))}
                </select>
              </fieldset>
              {/* Bike Brand Model and Year */}
              <label className="label">Bike Brand Model and Year : </label>
              <input
                {...register("bikeModel")}
                className="input w-full"
                placeholder="Bike Brand Model and Year..."
              />
              {/* About */}
              <label className="label">About : </label>
              <input
                {...register("about")}
                className="input w-full"
                placeholder="About..."
              />
              {/* About */}
              <label className="label">Tell Us About Yourself : </label>
              <input
                {...register("yourSelf")}
                className="input w-full"
                placeholder="Tell Us About Yourself..."
              />

              <button className="btn btn-primary text-secondary mt-4">
                Submit
              </button>
            </fieldset>
          </form>
        </div>
        {/* Rider Images---------------------------- */}
        <div className="order-1 md:order-2">
          <img src={bikerImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Rider;
