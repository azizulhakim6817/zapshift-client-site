import { useParams } from "react-router";
import useAxiosInstance from "./../../hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";

const ParcelTracking = () => {
  const { trackingId } = useParams();
  const axiosInstance = useAxiosInstance();

  const { data: trackings = [] } = useQuery({
    queryKey: ["tracking", trackingId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/tracking/${trackingId}/log`);
      return res.data;
    },
  });

  return (
    <div>
      <h1
        className="mt-4 text-secondary
           text-center font-bold text-xl"
      >
        Tracking id : (
        <span className="text-primary text-[14px]"> {trackingId} </span> )
      </h1>
      <p
        className="mt-2 text-secondary
           text-center font-bold text-xl"
      >
        Total Trackings : (
        <span className="text-primary"> {trackings?.length} </span> )
      </p>
      {/* time-line------------------------------------- */}
      <div className="mt-4 mb-8">
        <ul className="timeline timeline-vertical">
          {trackings?.map((trackingLog, i) => (
            <li key={i}>
              <div className="timeline-start">
                {new Date(trackingLog?.createdAt).toLocaleString()}
              </div>
              <div className="timeline-middle text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end timeline-box font-bold">
                {trackingLog?.details}
              </div>
              <hr />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ParcelTracking;
