import tracking from "../../../../assets/live-tracking.png";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import amzon from "../../../../assets/brands/amazon.png";
import amazon_vector from "../../../../assets/brands/amazon_vector.png";
import casio from "../../../../assets/brands/casio.png";
import moonstar from "../../../../assets/brands/moonstar.png";
import randstad from "../../../../assets/brands/randstad.png";
import star from "../../../../assets/brands/star.png";
import start_people from "../../../../assets/brands/start_people.png";
import marchentLocation from "../../../../assets/location-merchant.png";
import cutomer_top from "../../../../assets/customer-top.png";

const brandLogos = [
  amzon,
  amazon_vector,
  casio,
  moonstar,
  randstad,
  star,
  start_people,
];

const BrandName = () => {
  return (
    <div className="my-10 md:mt-16  mx-4 md:mx-32">
      <div className="text-center">
        <h3 className="my-1 text-secondary text-[20px] font-bold">
          We've helped thousands of sales teams ⭐
        </h3>
      </div>
      {/* bands name logo------------------ */}
      <div className="mt-8 mb-8 md:mb-16">
        <Swiper
          loop={true}
          slidesPerView={4}
          centeredSlides={true}
          spaceBetween={1}
          grabCursor={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {brandLogos?.map((logos, i) => (
            <SwiperSlide key={i}>
              <img src={logos} alt="logos" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* parcel-delivery-support--------------------------- */}
      {/* card-tracking-1--- */}
      <div className="space-y-3">
        <div className="p-2 bg-white/50 rounded-2xl shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 items-start">
            {/* image------ */}
            <div className=" relative flex gap-6">
              <img className="h-50 w-50" src={tracking} alt="" />
              {/* vertical line */}
              <div>
                <div className="hidden md:block items-start h-30 mt-8 border-l-2 border-dotted border-gray-400"></div>
              </div>
            </div>
            {/* containts------ */}
            <div className="lg:absolute  lg:left-3/8 xl:left-3/9 2xl:left-5/12 mt-0 md:mt-12">
              <h4 className="my-1 text-secondary text-[18px] font-semibold">
                Cash On Delivery
              </h4>
              <p className="text-[14px] text-[#606060]">
                From personal packages to business shipments — we deliver on
                time, every time.
              </p>
            </div>
          </div>
        </div>
        {/* card-tracking-2--- */}
        <div className="p-2 bg-white/50 rounded-2xl shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {/* image------ */}
            <div className=" relative flex gap-6">
              <img className="h-50 w-50" src={tracking} alt="" />
              {/* vertical line */}
              <div>
                <div className="hidden md:block items-start h-30 mt-8 border-l-2 border-dotted border-gray-400"></div>
              </div>
            </div>
            {/* containts------ */}
            <div className="lg:absolute  lg:left-3/8 xl:left-3/9 2xl:left-5/12 mt-0 md:mt-12">
              <h4 className="my-1 text-secondary text-[18px] font-semibold">
                Cash On Delivery
              </h4>
              <p className="text-[14px] text-[#606060]">
                From personal packages to business shipments — we deliver on
                time, every time.
              </p>
            </div>
          </div>
        </div>
        {/* card-tracking-3--- */}
        <div className="p-2 bg-white/50 rounded-2xl shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {/* image------ */}
            <div className=" relative flex gap-6">
              <img className="h-50 w-50" src={tracking} alt="" />
              {/* vertical line */}
              <div>
                <div className="hidden md:block items-start h-30 mt-8 border-l-2 border-dotted border-gray-400"></div>
              </div>
            </div>
            {/* containts------ */}
            <div className="lg:absolute  lg:left-3/8 xl:left-3/9 2xl:left-5/12 mt-0 md:mt-12">
              <h4 className="my-1 text-secondary text-[18px] font-semibold">
                Cash On Delivery
              </h4>
              <p className="text-[14px] text-[#606060]">
                From personal packages to business shipments — we deliver on
                time, every time.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Merchant and Customer Satisfaction is Our First Priority-------- */}
      <section className="my-8 mt-8 md:mt-14 bg-secondary p-6 rounded-2xl grid gap-4 grid-cols-1 md:grid-cols-2 items-center justify-center">
        <div>
          <h4 className="my-1 text-white text-2xl md:text-2xl font-bold">
            Merchant and Customer Satisfaction is Our First Priority
          </h4>
          <p className="my-4 text-[12px] text-[#DADADA]">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <div className="space-x-2 space-y-2 text-center  md:text-start ">
            <button className="btn bg-primary rounded-full">
              Become a Merchant
            </button>
            <button className="btn border-primary bg-secondary text-primary rounded-full">
              Earn with ZapShift Courier
            </button>
          </div>
        </div>
        <div>
          <img src={marchentLocation} alt="" />
        </div>
      </section>

      {/* What our customers are sayings */}
      <section>
        <div className="text-center mt-10 md:mt-12">
          <img className="mx-auto my-4" src={cutomer_top} alt="" />
          <h4 className="my-1 text-secondary text-2xl md:text-3xl font-bold">
            What our customers are sayings
          </h4>
          <p className="my-2 text-[12px] text-[#606060]">
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce <br /> pain, and strengthen
            your body with ease!
          </p>
        </div>
      </section>
    </div>
  );
};

export default BrandName;
