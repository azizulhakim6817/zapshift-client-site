import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../../../../assets/banner/banner1.png";
import banner2 from "../../../../assets/banner/banner2.png";
import banner3 from "../../../../assets/banner/banner3.png";
import { Carousel } from "react-responsive-carousel";
import { MdArrowOutward } from "react-icons/md";
import "../Banner/banner.css";

const Banner = () => {
  return (
    <div className="mt-4">
      <Carousel autoPlay={true} infiniteLoop={true} interval={1500}>
        {/* carousel-1 */}
        <div className="relative ">
          <img src={banner1} alt="banner1" />
          {/* button-two */}
          <div className="mx-2 absolute top-3/5  md:top-7/9 md:left-20 flex gap-4 justify-center items-center">
            <button className="btn bg-primary rounded-full">
              Track Your Pacel
            </button>
            <div className="inline-flex items-center justify-center bg-black text-white rounded-full w-10 h-10">
              <MdArrowOutward className="text-xl" />
            </div>

            <button className="btn btn-active">Be a Rider</button>
          </div>
        </div>
        {/* carousel-2 */}
        <div>
          <img src={banner2} alt="banner2" />
          {/* button-two */}
          <div className="mx-2 absolute top-3/5  md:top-7/9 md:left-16 flex gap-4 justify-center items-center">
            <button className="btn bg-primary rounded-full">
              Track Your Pacel
            </button>
            <div className="inline-flex items-center justify-center bg-black text-white rounded-full w-10 h-10">
              <MdArrowOutward className="text-xl" />
            </div>

            <button className="btn btn-active">Be a Rider</button>
          </div>
        </div>
        {/* carousel-3 */}
        <div>
          <img src={banner3} alt="banner3" />
          {/* button-two */}
          <div className="mx-2 absolute top-3/5  md:top-8/11 md:left-20 flex gap-4 justify-center items-center">
            <button className="btn bg-primary rounded-full">
              Track Your Pacel
            </button>
            <div className="inline-flex items-center justify-center bg-black text-white rounded-full w-10 h-10">
              <MdArrowOutward className="text-xl" />
            </div>

            <button className="btn btn-active">Be a Rider</button>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
