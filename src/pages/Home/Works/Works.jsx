import { FaCarSide } from "react-icons/fa6";

const Works = () => {
  return (
    <div className="mb-4 mx-4 md:mx-10 lg:mx-32">
      <h2 className="mb-4 md:mb-6 text-secondary text-2xl md:text-3xl font-bold">
        How it Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
        {/* card-one-------- */}
        <div className="p-4 bg-white/50 rounded-md shadow-md">
          <FaCarSide className="" size={30} />
          <h4 className="my-1 text-secondary text-[16px] font-semibold">
            Booking Pick & Drop
          </h4>
          <p className="text-[14px] text-[#606060]">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>
        {/* card-two-------- */}
        <div className="p-4 bg-white/50 rounded-md shadow-md">
          <FaCarSide className="" size={30} />
          <h4 className="my-1 text-secondary text-[18px] font-semibold">
            Cash On Delivery
          </h4>
          <p className="text-[14px] text-[#606060]">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>
        {/* card-three-------- */}
        <div className="p-4 bg-white/50 rounded-md shadow-md">
          <FaCarSide className="" size={30} />
          <h4 className="my-1 text-secondary text-[18px] font-semibold">
            Delivery Hub
          </h4>
          <p className="text-[14px] text-[#606060]">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>
        {/* card-three-------- */}
        <div className="p-4 bg-white/50 rounded-md shadow-md">
          <FaCarSide className="" size={30} />
          <h4 className="my-1 text-secondary text-[18px] font-semibold">
            Booking SME & Corporate
          </h4>
          <p className="text-[14px] text-[#606060]">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Works;
