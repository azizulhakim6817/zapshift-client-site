import serviceLogo from "../../../../assets/service.png";
const OurServices = () => {
  return (
    <div className="my-8 md:mt-16 p-4 md:p-8 lg:p-24 mx-0 md:mx-8 bg-secondary rounded-2xl">
      <div className="text-center">
        <h2 className=" text-[#FFFFFF] text-2xl md:text-3xl font-bold">
          Our Services
        </h2>
        <p className="mt-2 mb-8 text-[14px] text-[#DADADA]">
          FEnjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to <br /> business shipments — we
          deliver on time, every time.
        </p>
      </div>
      {/* all-cards-4--------------------------------------------- */}
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
        {/* card-one-------- */}
        <div className="text-center p-4 bg-base-100 hover:bg-primary rounded-md shadow-md">
          <div className="w-12 h-12 mx-auto flex justify-center items-center bg-gray-300 rounded-full">
            <img className="w-8 h-8" src={serviceLogo} alt="serviec-logo" />
          </div>

          <h4 className="my-1 text-secondary text-[16px] font-semibold">
            Express & Standard Delivery
          </h4>
          <p className="my-3 text-[12px] text-[#606060]">
            We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi.  Express delivery available in Dhaka within
            4–6 hours from pick-up to drop-off.
          </p>
        </div>
        {/* card-one-------- */}
        <div className="text-center p-4 bg-base-100 hover:bg-primary rounded-md shadow-md">
          <div className="w-12 h-12 mx-auto flex justify-center items-center bg-gray-300 rounded-full">
            <img className="w-8 h-8" src={serviceLogo} alt="serviec-logo" />
          </div>

          <h4 className="my-1 text-secondary text-[16px] font-semibold">
            Express & Standard Delivery
          </h4>
          <p className="my-3 text-[12px] text-[#606060]">
            We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi.  Express delivery available in Dhaka within
            4–6 hours from pick-up to drop-off.
          </p>
        </div>
        {/* card-one-------- */}
        <div className="text-center p-4 bg-base-100 hover:bg-primary rounded-md shadow-md">
          <div className="w-12 h-12 mx-auto flex justify-center items-center bg-gray-300 rounded-full">
            <img className="w-8 h-8" src={serviceLogo} alt="serviec-logo" />
          </div>

          <h4 className="my-1 text-secondary text-[16px] font-semibold">
            Express & Standard Delivery
          </h4>
          <p className="my-3 text-[12px] text-[#606060]">
            We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi.  Express delivery available in Dhaka within
            4–6 hours from pick-up to drop-off.
          </p>
        </div>
        {/* card-one-------- */}
        <div className="text-center p-4 bg-base-100 hover:bg-primary rounded-md shadow-md">
          <div className="w-12 h-12 mx-auto flex justify-center items-center bg-gray-300 rounded-full">
            <img className="w-8 h-8" src={serviceLogo} alt="serviec-logo" />
          </div>

          <h4 className="my-1 text-secondary text-[16px] font-semibold">
            Express & Standard Delivery
          </h4>
          <p className="my-3 text-[12px] text-[#606060]">
            We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi.  Express delivery available in Dhaka within
            4–6 hours from pick-up to drop-off.
          </p>
        </div>
        {/* card-one-------- */}
        <div className="text-center p-4 bg-base-100 hover:bg-primary rounded-md shadow-md">
          <div className="w-12 h-12 mx-auto flex justify-center items-center bg-gray-300 rounded-full">
            <img className="w-8 h-8" src={serviceLogo} alt="serviec-logo" />
          </div>

          <h4 className="my-1 text-secondary text-[16px] font-semibold">
            Express & Standard Delivery
          </h4>
          <p className="my-3 text-[12px] text-[#606060]">
            We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi.  Express delivery available in Dhaka within
            4–6 hours from pick-up to drop-off.
          </p>
        </div>
        {/* card-one-------- */}
        <div className="text-center p-4 bg-base-100 hover:bg-primary rounded-md shadow-md">
          <div className="w-12 h-12 mx-auto flex justify-center items-center bg-gray-300 rounded-full">
            <img className="w-8 h-8" src={serviceLogo} alt="serviec-logo" />
          </div>

          <h4 className="my-1 text-secondary text-[16px] font-semibold">
            Express & Standard Delivery
          </h4>
          <p className="my-3 text-[12px] text-[#606060]">
            We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi.  Express delivery available in Dhaka within
            4–6 hours from pick-up to drop-off.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
