import React from "react";
import { Link } from "react-router-dom";

const VehicleCard = ({ vehicle }) => {
  return (
    <div
      key={vehicle.id}
      className="bg-white rounded-lg shadow-md overflow-hidden relative"
    >
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-3/5 bg-cover bg-center"
        style={{
          backgroundImage: `url(${vehicle.image || "/images/mobil1.png"})`,
        }}
      ></div>
      <div className="absolute bottom-0 left-0 w-full h-2/5 bg-black bg-cover bg-center"></div>
      <div className="absolute bottom-1/4 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent bg-cover bg-center"></div>

      {/* Gradient Content */}
      <div className="bg-gradient-to-t from-black to-transparent pt-2 px-3 flex flex-col justify-between h-[430px] rounded-lg border-2 border-gray-400 relative z-10">
        <div className="relative bg-cyan-600 px-2 py-2 h-2/5 rounded-t-lg shadow-md text-center mt-auto border-t-2 border-x-2 border-cyan-700 flex flex-col">
          {/* Elemen pojok kanan atas */}
          <div className="absolute top-[-33px] right-[5px] bg-cyan-600 border-t-2 border-x-2 border-cyan-700 text-white font-bold px-3 py-1 rounded-t-lg">
            {vehicle.no_kendaraan}
          </div>

          {/* Subscription Status */}
          <div className="bg-gray-300 rounded-md px-3 py-1 flex justify-between items-center mb-2">
            <span className="text-black font-medium text-xs">
              subscription status
            </span>
            <span className="text-black font-extrabold">
              {vehicle.subscription?.status === "Active"
                ? "ACTIVE"
                : "INACTIVE"}
            </span>
          </div>

          {/* Informasi lainnya */}
          <p className="font-bold text-xs text-white text-left">
            Device: {vehicle.id_perangkat}
          </p>
          <p className="font-bold text-xs text-white text-left">
            Driver: {vehicle.driver}
          </p>
          <p className="font-bold text-xs text-white text-left">
            Expired: Jan 1, 2025
          </p>
          <p className="font-bold text-xs text-white text-left mb-2">
            Update: Oct 2, 2024 16:18
          </p>

          {/* Tombol Lihat Detail */}
          <Link
            to={`/kendaraan/${vehicle.id}`}
            className="bg-white text-cyan-600 w-fit shadow-md border border-gray-500 rounded px-2 flex items-center justify-center cursor-pointer hover:bg-cyan-100 hover:text-cyan-600"
          >
            <div className="font-bold text-xs md:text-sm">Lihat detail</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
