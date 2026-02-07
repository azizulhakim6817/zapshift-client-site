import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import { useRef } from "react";

const Coverage = () => {
  const position = [23.8103, 90.4125];
  const warehouses = useLoaderData();
  //console.log(warehouses);
  const mapRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const location = e.target.location.value;

    const district = warehouses.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase()),
    );
    if (district) {
      const coord = [district.latitude, district.longitude];
      mapRef.current.flyTo(coord, 14);
    }
  };

  return (
    <div className="my-8 mx-4 md:mx-12">
      <h3 className="my-1 text-secondary text-3xl font-bold">
        We've helped thousands of sales teamss
      </h3>

      {/* seach input---------------------------- */}
      <div className="my-4 w-full md:w-1/2 ">
        <form
          onSubmit={handleSubmit}
          className="flex items-center border rounded-2xl overflow-hidden shadow-sm"
        >
          {/* Search Icon */}
          <div className="flex items-center justify-center px-3  ">
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="M21 21l-4.3-4.3"></path>
            </svg>
          </div>

          {/* Input */}
          <input
            type="search"
            name="location"
            required
            placeholder="Search for district..."
            className="grow px-4 py-2 outline-none bg-white
             text-gray-500 "
          />

          {/* Button */}
          <button
            type="submit"
            className="bg-primary text-secondary px-5 py-2 font-semibold hover:bg-blue-600 hover:text-white transition-colors rounded-2xl"
          >
            Search
          </button>
        </form>
      </div>

      {/* map--------------------------------------*/}
      <div className="my-4 border w-full h-200 rounded-2xl">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="w-full h-full rounded-2xl"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {warehouses?.map((center, index) => (
            <Marker key={index} position={[center?.latitude, center.longitude]}>
              <Popup>
                <strong className="font-bold">{center.district}</strong> <br />
                <span className="font-normal">
                  Services Area : {center.covered_area.join(",")}
                </span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        ,
      </div>
    </div>
  );
};

export default Coverage;
