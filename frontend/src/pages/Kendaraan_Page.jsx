import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faPlus } from "@fortawesome/free-solid-svg-icons";
import Search from '../components/Search_Kendaraan';
import { API_URL } from "../utils/constants";
import AddVehicle from "../components/AddVehicle";

export default function Kendaraan() {
    const [vehicles, setVehicles] = useState([]);
    const navigate = useNavigate();

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

    return (
        <div className="w-[85vw] lg:w-full min-h-full">
            {/* Header */}
            <div className="py-5 px-4 w-auto bg-white flex items-center justify-between cursor-pointer mt-5 border-y-2 border-gray-200">
                <div className="flex items-center gap-2 lg:gap-3">
                    <img
                        src="images/kendaraan_active.svg"
                        alt="Kendaraan Icon"
                        className="w-7 h-7 lg:w-10 lg:h-10"
                    />
                    <h5 className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-300 text-transparent bg-clip-text">
                        Kendaraan
                    </h5>
                </div>
                <Search />
            </div>

            {/* Add Vehicle Button */}
            <div className="ml-4 my-4">
                <AddVehicle />
            </div>

            {/* Vehicle Grid */}
            <div className="m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
                        {/* Background Image */}
                        <div
                            className="absolute top-0 left-0 w-full h-3/5 bg-cover bg-center"
                            style={{ backgroundImage: `url(${vehicle.image || '/images/mobil1.png'})` }}
                        ></div>
                        <div className="absolute bottom-0 left-0 w-full h-2/5 h- bg-black bg-cover bg-center"></div>
                        <div className="absolute bottom-1/4 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent bg-cover bg-center"></div>

                        {/* Gradient Content */}
                        <div className="bg-gradient-to-t from-black to-transparent pt-2 px-3 flex flex-col justify-between h-[430px] rounded-lg border-2 border-gray-400 relative z-10">
                            <div className="bg-cyan-600 px-2 pt-1 h-2/5 rounded-t-lg shadow-md text-center mt-auto border-t-2 border-x-2 border-cyan-700 flex flex-col">
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col items-start text-white">
                                        <h3 className="text-lg font-bold">
                                            {vehicle.no_kendaraan}
                                        </h3>
                                        <div className="bg white w-[100px]"></div>
                                    </div>
                                    <div className="flex flex-col items-end text-white">
                                        <h3 className="text-xl bg-white opacity-50 rounded-lg w-[103px] px-2 font-extrabold text-black">
                                            {vehicle.subscription?.status === "Active" ? "Active" : "Unactive"}
                                        </h3>
                                        <p className="text-xs w-fit py-0.5 ">
                                            Subscription Status
                                        </p>
                                    </div>
                                </div>
                                <p className="font-bold text-xs text-white text-left mt-2">Device: {vehicle.id_perangkat}</p>
                                <p className="font-bold text-xs text-white text-left">Driver: {vehicle.driver}</p>
                                <p className="font-bold text-xs text-white text-left">Expired: Jan 1, 2025</p>
                                <p className="font-bold text-xs text-white text-left mb-2">Update: Oct 2, 2024 16:18</p>
                                <Link
                                    to={`/kendaraan/${vehicle.id}`}
                                    className="bg-white text-cyan-600 w-fit shadow-md border border-gray-500 rounded px-2 flex items-center justify-center cursor-pointer hover:bg-cyan-100 hover:text-cyan-600"
                                >
                                    <div className="font-bold text-xs md:text-sm">Lihat detail</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
