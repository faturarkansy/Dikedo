import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faPlus } from "@fortawesome/free-solid-svg-icons";
import Search from '../components/Search_Kendaraan';
import { API_URL } from "../utils/constants";
import AddVehicle from "../components/AddVehicle";
import Notifikasi from "../components/Notifikasi";
import "leaflet-trackplayer";

export default function Kendaraan() {
    const [vehicles, setVehicles] = useState([]);
    const navigate = useNavigate();
    const [notif, setNotif] = useState({ message: "", type: "" });

    const showNotification = (message, type) => {
        setNotif({ message, type });

        setTimeout(() => {
            setNotif({ message: "", type: "" });
        }, 1500); // Notifikasi menghilang setelah 1,5 detik
    };


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

    useEffect(() => {
        axios
            .get(API_URL + "vehicles")
            .then((res) => {
                setVehicles(res.data);
                showNotification("Data kendaraan berhasil dimuat", "success");
            })
            .catch((error) => {
                console.log("Error: ", error);
                showNotification("Gagal mengambil data kendaraan", "error");
            });
    }, []);

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
                    <Search />
                </div>

            </div>

            {/* Add Vehicle Button */}
            <div className="ml-4 my-4">
                <AddVehicle />
            </div>

            {/* Notification */}
            <Notifikasi
                message={notif.message}
                type={notif.type}
                onClose={() => setNotif({ message: "", type: "" })}
            />

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
                            <div className="relative bg-cyan-600 px-2 py-2 h-2/5 rounded-t-lg shadow-md text-center mt-auto border-t-2 border-x-2 border-cyan-700 flex flex-col">
                                {/* Elemen pojok kanan atas */}
                                <div className="absolute top-[-34px] right-[5px] bg-cyan-600 border-t-2 border-x-2 border-cyan-700 text-white font-bold px-3 py-1 rounded-t-lg">
                                    {vehicle.no_kendaraan}
                                </div>

                                {/* Subscription Status */}
                                <div className="bg-gray-300 rounded-md px-3 py-1 flex justify-between items-center mb-2">
                                    <span className="text-black font-medium text-xs">subscription status</span>
                                    <span className="text-black font-extrabold">{vehicle.subscription?.status === "Active" ? "ACTIVE" : "INACTIVE"}</span>
                                </div>
                                {/* Informasi lainnya */}
                                <p className="font-bold text-xs text-white text-left">Device: {vehicle.id_perangkat}</p>
                                <p className="font-bold text-xs text-white text-left">Driver: {vehicle.driver}</p>
                                <p className="font-bold text-xs text-white text-left">Expired: Jan 1, 2025</p>
                                <p className="font-bold text-xs text-white text-left mb-2">Update: Oct 2, 2024 16:18</p>

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
                ))}
            </div>
        </div>
    );
}
