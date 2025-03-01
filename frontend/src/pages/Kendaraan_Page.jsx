import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../utils/constants";
import VehicleCard from "../components/VehicleCard";
import Search from "../components/Search";

export default function Kendaraan() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    axios
      .get(API_URL + "vehicles")
      .then((res) => {
        setVehicles(res.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);

  function search() {
    return vehicles.filter((vehicle) => {
      if (q === "") {
        return true;
      } else {
        return (
          vehicle.no_kendaraan
            .toString()
            .toLowerCase()
            .indexOf(q.toLowerCase()) > -1
        );
      }
    });
  }

  return (
    <div className="w-[85vw] lg:w-full min-h-full">
      {/* Header */}
      <div
        className="py-5 px-4 w-auto bg-white flex items-center justify-between cursor-pointer mt-5 border-y-2 border-gray-200 relative"
        style={{
          backgroundImage: "url('images/ornament header.svg')",
          backgroundPosition: "right 5px",
          backgroundRepeat: "no-repeat",
          backgroundSize: "175px",
        }}
      >
        <div className="flex items-center gap-2 lg:gap-3">
          <img
            src="images/kendaraan_active.svg"
            alt="Kendaraan Icon"
            className="w-7 h-7 lg:w-10 lg:h-10"
          />
          <h5 className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-300 text-transparent bg-clip-text">
            Vehicles
          </h5>
        </div>
        <div className="font-medium">
          <Search q={q} setQ={setQ} />
        </div>
      </div>

      {/* Add Vehicle Button */}
      <div className="ml-4 my-4">
        <Button
          onClick={() => navigate("/kendaraan/tambah")}
          className="bg-cyan-600 shadow-md rounded-lg py-2 px-4 md:px-6 w-fit border border-gray-200 flex items-center justify-center cursor-pointer"
        >
          <p className="font-bold text-xs md:text-sm text-white">
            Add New <FontAwesomeIcon icon={faPlus} className="fa-solid" />
          </p>
        </Button>
      </div>

      {/* Vehicle Grid */}
      <div className="m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {search().map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
}
