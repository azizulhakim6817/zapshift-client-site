import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import { useRef, useState } from "react";

const Coverage2Part = () => {
  const position = [23.9571, 91.1115];
  const warehouses = useLoaderData();
  //console.log(warehouses);
  const mapRef = useRef(null);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const location = e.target.value;
    setSearch(location);

    const district = warehouses.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase()),
    );
    if (district && mapRef.current) {
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
      <div className="">
        <form>
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              name="location"
              value={search}
              onChange={handleChange}
              required
              placeholder="Search"
            />
          </label>
        </form>
      </div>
      {/* map--------------------------------------*/}
      <div className="my-4 border w-full h-100 rounded-2xl">
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

export default Coverage2Part;
