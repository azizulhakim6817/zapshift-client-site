import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import useAuth from "./../../hooks/useAuth";

const SendParcel = () => {
  const { user } = useAuth();
  const serviceCenter = useLoaderData();
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

  //! react-hook-form--------------------
  const handleSendParcel = (data) => {
    console.log(data);
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.reciverDistrict;
    //console.log("result : ", isSameDistrict); // true/false

    // logic isDocument-----------
    const parcelWeight = parseFloat(data.parcelWeight);
    let cost = 0;

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minChange = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minChange + extraCharge;
      }
    }
    //console.log("cost : ", cost);

    //add new field (price)--------------
    data.cost = cost;
    data.deliveryStatus = "pending";
    data.paymentStatus = "pay";

    //* sweetalert-----------------
    Swal.fire({
      title: `Agree with the Cost?`,
      text: `You will be charge ${cost} TK.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm and continue Payment!",
    }).then((result) => {
      if (result.isConfirmed) {
        // save the parcel info to the databse-------
        axiosSecure.post("/parcel", data).then((res) => {
          console.log("After saving parcel data ", res.data);
          navigate("/dashboard/my-parcels");
        });
        if (res?.data?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Parcel has created. Please Pay!",
            showConfirmButton: false,
            timer: 2500,
          });
        }
      }
    });
  };
  //! rigions seleted---------------------
  const regionsDuplicate = serviceCenter?.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  //console.log(regions);

  //! districts-------------------------
  const districtByRegion = (region) => {
    const regionDistricts = serviceCenter?.filter((c) => c.region === region);
    const districts = regionDistricts?.map((d) => d.district);
    return districts;
  };

  //! sender and reciver---------------------------
  const senderRegion = useWatch({ control, name: "senderRigion" });
  const reciverRegion = useWatch({ control, name: "reciverRigion" });

  return (
    <div className="mt-8 mb-12 mx-4 md:mx-12">
      <h2 className="my-6 text-5xl md:text-2xl font-bold"> Send Parcel</h2>
      <div>
        <p className="font-bold text-secondary">Enter your parcel details</p>
        <hr className="w-12/12 mt-2" />
      </div>
      <form onSubmit={handleSubmit(handleSendParcel)} className="text-black">
        {/* radio document/non-document-------- */}
        <div className="my-4 space-x-2">
          <label className="label">
            <input
              type="radio"
              value="document"
              {...register("parcelType")}
              className="radio text-primary"
              defaultChecked
            />
            Document
          </label>
          <label className="label">
            <input
              type="radio"
              {...register("parcelType")}
              value="non-document"
              className="radio text-primary"
            />
            Non-Document
          </label>
        </div>
        {/* parcel info <name/weigth>---------*/}
        <div className="my-4 grid gap-1 md:gap-8 grid-cols-1 md:grid-cols-2">
          {/* parcel Name */}
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName")}
              className="w-full input"
              placeholder="Parcel Name"
            />
          </fieldset>
          {/* Parcel Weight (KG) */}
          <fieldset className="fieldset">
            <label className="label">Parcel Weight (KG)</label>
            <input
              type="number"
              {...register("parcelWeight")}
              className="w-full input"
              placeholder="Parcel Name"
            />
          </fieldset>
        </div>
        {/* two column seder and reciver--------*/}
        <div className="grid gap-1 md:gap-8 grid-cols-1 md:grid-cols-2">
          {/* Sender info------------------- */}
          <div className="mt-4">
            <p className="font-bold text-secondary text-xl">Sender details</p>
            <fieldset className="fieldset space-y-1">
              {/* parcel Name */}
              <label className="label">Sender Name</label>
              <input
                type="text"
                {...register("senderName")}
                defaultValue={user.displayName}
                className="w-full input"
                placeholder="Sender Name"
              />
              {/* parcel Name */}
              <label className="label">Sender Email</label>
              <input
                type="email"
                {...register("senderEmail")}
                defaultValue={user.email}
                className="w-full input"
                placeholder="Sender Email"
              />
              {/* sender address */}
              <label className="label">Sender Address</label>
              <input
                type="text"
                {...register("senderAddress")}
                className="w-full input"
                placeholder="Sender Address"
              />
              {/* sender phone no */}
              <label className="label">Sender Phone No</label>
              <input
                type="text"
                {...register("senderphone")}
                className="w-full input"
                placeholder="Sender Phone No "
              />
              {/* region -- -------------------*/}
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-gray-500 font-normal">
                  Sender Regions
                </legend>
                <select
                  {...register("senderRigion")}
                  defaultValue="Pick a Region"
                  className="select w-full text-gray-500 font-normal"
                >
                  <option disabled={true}>Pick a Region</option>
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
                  Sender District
                </legend>
                <select
                  {...register("senderDistrict")}
                  defaultValue="Pick a District"
                  className="select w-full text-gray-500 font-normal"
                >
                  <option disabled={true}>Pick a District</option>
                  {districtByRegion(senderRegion).map((r, i) => (
                    <option value={r} key={i}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>
              {/* Sender Pickup Instruction */}
              <label className="label">Sender Pickup Instruction</label>
              <textarea
                type="text"
                {...register("senderPickupInstruction")}
                className="w-full textarea"
                placeholder="Sender Pickup Instruction "
              />
            </fieldset>
          </div>
          {/* Reciver info ----------------*/}
          <div>
            <div className="mt-4">
              <p className="font-bold text-secondary text-xl">
                Reciver details
              </p>
              <fieldset className="fieldset space-y-1">
                {/* Reciver Name */}
                <label className="label">Reciver Name</label>
                <input
                  type="text"
                  {...register("reciverName")}
                  className="w-full input"
                  placeholder="Reciver Name"
                />
                {/* reciver email*/}
                <label className="label">Reciver Name</label>
                <input
                  type="email"
                  {...register("receiverEmail")}
                  className="w-full input"
                  placeholder="Reciver Email"
                />
                {/* reciver address */}
                <label className="label">Reciver Address</label>
                <input
                  type="text"
                  {...register("reciverAddress")}
                  className="w-full input"
                  placeholder="Reciver Address"
                />
                {/* Reciver phone no */}
                <label className="label">Reciver Phone No</label>
                <input
                  type="text"
                  {...register("reciverPhone")}
                  className="w-full input"
                  placeholder="Reciver Phone No "
                />
                {/* reciver region -- -------------------*/}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-gray-500 font-normal">
                    Reciver Regions
                  </legend>
                  <select
                    {...register("reciverRigion")}
                    defaultValue="Pick a Region"
                    className="select w-full text-gray-500 font-normal"
                  >
                    <option disabled={true}>Pick a Region</option>
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
                    Reciver District
                  </legend>
                  <select
                    {...register("reciverDistrict")}
                    defaultValue="Pick a District"
                    className="select w-full text-gray-500 font-normal"
                  >
                    <option disabled={true}>Pick a District</option>
                    {districtByRegion(reciverRegion).map((r, i) => (
                      <option value={r} key={i}>
                        {r}
                      </option>
                    ))}
                  </select>
                </fieldset>
                {/* Reciver Pickup Instruction */}
                <label className="label">Reciver Pickup Instruction</label>
                <textarea
                  type="text"
                  {...register("reciverPickupInstruction")}
                  className="w-full textarea"
                  placeholder="Reciver Pickup Instruction "
                />
              </fieldset>
            </div>
          </div>
        </div>
        {/* submit button-------------------------*/}
        <div className=" my-2 md:my-4">
          <input
            type="submit"
            value="Send Parcel"
            className="w-full md:w-xl  mt-2 btn bg-primary text-secondary"
          ></input>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
