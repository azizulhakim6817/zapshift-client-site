import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { userName, user_photoURL, review: tastimonial } = review;

  return (
    <div>
      <div className="mx-2 card bg-base-100 shadow-lg rounded-2xl max-w-sm">
        <div className="card-body gap-4">
          {/* Quote icon */}
          <FaQuoteLeft className="text-3xl text-gray-300" />

          {/* Testimonial text */}
          <p className="text-sm text-gray-500">{tastimonial}</p>

          {/* Divider */}
          <div className="border-t border-dashed border-gray-300"></div>

          {/* Author */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-800 flex items-center justify-center text-white font-semibold">
              <img className=" rounded-full" src={user_photoURL} alt="" />
            </div>
            <div>
              <h4 className="text-[18px] font-bold text-secondary">{userName}</h4>
              <p className="text-xs text-gray-500">Senior Product Designer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
