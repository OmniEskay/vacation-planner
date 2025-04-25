import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const DestinationCard = ({ destination }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    if (destination?.id) {
      navigate(`/destinations/${destination.id}`);
    } else {
      console.error("Destination ID is missing, cannot navigate.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col border border-gray-100">
      <div className="h-48">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          navigation={true}
          modules={[Navigation]}
          className="w-full h-full"
        >
          {destination.images?.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`${destination.name} ${index + 1}`}
                className="w-full h-48 object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/400x300";
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{destination.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm flex-grow">{destination.description}</p>
        <div className="mt-auto flex justify-between items-center pt-2">
          {destination.price !== undefined ? (
            <span className="text-indigo-600 font-bold">
              Ksh {destination.price.toLocaleString()}
            </span>
          ) : (
            <span className="text-gray-500 text-sm">Price N/A</span>
          )}
          <button
            onClick={handleDetailsClick}
            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm transition-colors"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;