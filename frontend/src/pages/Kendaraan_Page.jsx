import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Search from '../components/Search_Kendaraan';
import { API_URL } from "../utils/constants";
import AddVehicle from "../components/AddVehicle";
import VehicleCard from "../components/VehicleCard";
import Notifikasi from "../components/Notification";
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
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
            </div>
        </div>
    );
}
