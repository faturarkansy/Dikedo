import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import coordinatesData from "../components/Coordinates.json";
import L from "leaflet";

import { API_URL } from "../utils/constants";
import { Button, Modal } from "flowbite-react";

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
//     iconUrl: require("leaflet/dist/images/marker-icon.png"),
//     shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
// });

export default function KendaraanDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState(null);

    const [vehicle, setVehicle] = useState({});
    const [modal, setModal] = useState(false);
    const [coordinates, setCoordinates] = useState({ lat: -6.200000, lng: 106.816666 });
    const [intervalId, setIntervalId] = useState(null);

    const [trackingData, setTrackingData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTracking, setIsTracking] = useState(false);
    const [progress, setProgress] = useState(0);


    useEffect(() => {
        axios
            .get(API_URL + `vehicles/${id}`)
            .then((res) => {
                const vehicle = res.data;
                setVehicle(vehicle);
                if (vehicle.detail?.coordinate) {
                    setCoordinates({
                        lat: vehicle.detail.coordinate.latitude,
                        lng: vehicle.detail.coordinate.longitude,
                    });
                }
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    }, []);

    useEffect(() => {
        // Load dummy coordinates from JSON
        setTrackingData(coordinatesData);
    }, []);

    const handleDelete = async (event) => {
        event.preventDefault();
        const url = `/kendaraan/${vehicle.id}`; // Change endpoint

        try {
            await axios.delete(url);
            popupStatus("Success", "Kendaraan berhasil dihapus!", "success");
        } catch (error) {
            console.log(error);
            popupStatus("Failed", "Kendaraan gagal dihapus!", "error");
        }
    };

    const handleBack = () => {
        navigate('/Kendaraan');
    };

    const popupStatus = (title, text, icon) => {
        swal({
            title: title,
            text: text,
            icon: icon,
            buttons: false,
            timer: 1500,
        });
    };

    const handleStartTracking = () => {
        if (isTracking || trackingData.length === 0 || currentIndex >= trackingData.length) return;

        setIsTracking(true);

        const newIntervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                if (prevIndex < trackingData.length - 1) {
                    setProgress(((prevIndex + 1) / trackingData.length) * 100);
                    return prevIndex + 1;
                } else {
                    clearInterval(newIntervalId);
                    setIsTracking(false);
                    return prevIndex;
                }
            });
        }, 1000);

        setIntervalId(newIntervalId);
    };

    const handlePauseTracking = () => {
        setIsTracking(false);
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };



    return (
        <div className="w-[85vw] lg:w-full min-h-full ">
            {/* Header */}
            <div className="py-5 px-4 w-auto bg-white flex items-center justify-between cursor-pointer mt-5 border-y-2 border-gray-200">
                <div className="flex items-center gap-2 lg:gap-5">
                    <img
                        src="/images/back.svg"
                        alt="Back"
                        className="w-4 h-4 lg:w-6 lg:h-6 "
                        onClick={handleBack}
                    />
                    <h5 className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-300 text-transparent bg-clip-text">
                        Kendaraan Details
                    </h5>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 m-4">
                {/* Kontainer Kiri - Detail Kendaraan */}
                <div className="lg:col-span-1 bg-white p-4 border rounded-lg shadow-md">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-cyan-600 font-bold">No Kendaraaan</p>
                            <p className="text-gray-600 text-xs lg:text-base">{vehicle.no_kendaraan}</p>
                        </div>
                        <div>
                            <p className="text-cyan-600 font-bold">ID Perangkat</p>
                            <p className="text-gray-600 text-xs lg:text-base">{vehicle.id_perangkat}</p>
                        </div>
                        <div>
                            <p className="text-cyan-600 font-bold">Kategori</p>
                            <p className="text-gray-600 text-xs lg:text-base">{vehicle.kategori}</p>
                        </div>
                        <div>
                            <p className="text-cyan-600 font-bold">Driver</p>
                            <p className="text-gray-600 text-xs lg:text-base">{vehicle.driver}</p>
                        </div>
                        <div>
                            <p className="text-cyan-600 font-bold">Update Terakhir</p>
                            <p className="text-gray-600 text-xs lg:text-base">{vehicle.last_update}</p>
                        </div>
                        <div>
                            <p className="text-cyan-600 font-bold">Operator</p>
                            <p className="text-gray-600 text-xs lg:text-base">{vehicle.operator}</p>
                        </div>
                        <div>
                            <p className="text-cyan-600 font-bold">No Telepon</p>
                            <p className="text-gray-600 text-xs lg:text-base">{vehicle.no_telepon}</p>
                        </div>
                        <div>
                            <p className="text-cyan-600 font-bold">Mesin</p>
                            <p className="text-gray-600 text-xs lg:text-base">
                                {vehicle.detail?.engineStatus || ""}
                            </p>
                        </div>
                        <div>
                            <p className="text-cyan-600 font-bold">Kondisi</p>
                            <p className="text-gray-600 text-xs lg:text-base">{vehicle.detail?.status || ""}</p>
                        </div>
                        <div>
                            <p className="text-cyan-600 font-bold">Kecepatan</p>
                            <p className="text-gray-600 text-xs lg:text-base">{vehicle.detail?.speed || ""}</p>
                        </div>
                        <div>
                            <p className="text-cyan-600 font-bold">Longitude</p>
                            <p className="text-gray-600 text-xs lg:text-base">
                                {vehicle.detail?.coordinate.longitude || ""}
                            </p>
                        </div>
                        <div>
                            <p className="text-cyan-600 font-bold">Latitude</p>
                            <p className="text-gray-600 text-xs lg:text-base">
                                {vehicle.detail?.coordinate.latitude || ""}
                            </p>
                        </div>
                        <div>
                            <p className="text-cyan-600 font-bold">Jenis Paket</p>
                            <p className="text-gray-600 text-xs lg:text-base">{vehicle.subscription?.type || ""}</p>
                        </div>
                        <div>
                            <p className="text-cyan-600 font-bold">Paket Berakhir</p>
                            <p className="text-gray-600 text-xs lg:text-base">
                                {vehicle.subscription?.expired_date || ""}
                            </p>
                        </div>
                    </div>
                    <hr className="border-gray-300 my-4" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 my-3 justify-center items-center">
                        <Button
                            onClick={() => navigate(`/kendaraan/${vehicle.id}/edit`)}
                            className="bg-cyan-600"
                        >
                            <p>
                                <FontAwesomeIcon icon={faPencil} /> Edit Data
                            </p>
                        </Button>
                        <Button onClick={() => setModal(true)} className="bg-red-500">
                            <p>
                                <FontAwesomeIcon icon={faTrash} /> Hapus Kendaraan
                            </p>
                        </Button>


                    </div>
                </div>
                {/* Kontainer Kanan - Video dan Tracking */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                    {/* Kontainer Video Live Kamera */}
                    <div className="grid grid-cols-1 row-span-1 lg:grid-cols-3 bg-white p-4 rounded-lg shadow-md h-[300px] gap-4">
                        <h5 className="lg:col-span-1 text-lg font-bold text-cyan-600 flex items-center justify-center rounded-md">Video Live Kamera</h5>
                        <div className="lg:col-span-2 rounded-md overflow-hidden bg-gray-200 flex items-center justify-center">
                            {/* Placeholder Video */}
                            <p className="text-gray-500">[Video Live Kamera]</p>
                        </div>
                    </div>

                    {/* Kontainer Tracking Jalan */}
                    <div className="grid grid-rows-3 lg:grid-cols-3 lg:grid-rows-1 bg-white p-4 rounded-lg shadow-md min-h-[300px] gap-4">
                        {/* Kontainer Judul */}
                        <div className="row-span-1 lg:col-span-1 flex flex-col items-center justify-center text-lg font-bold text-cyan-600 rounded-lg p-6 space-y-4">
                            {/* Judul */}
                            <h2 className="text-xl text-cyan-600">Tracking Jalan</h2>

                            {/* Button Group */}
                            <div className="flex space-x-4">
                                <button
                                    onClick={handleStartTracking}
                                    className={`p-2 text-white text-sm rounded-lg shadow-lg hover:bg-white hover:text-cyan-600 hover:border-2 hover:border-cyan-600 ${activeButton === "start" ? "bg-cyan-800" : "bg-cyan-600"
                                        }`}
                                >
                                    Start
                                </button>
                                <button
                                    onClick={handlePauseTracking}
                                    className={`p-2 text-white text-sm rounded-lg shadow-lg hover:bg-white hover:text-cyan-600 hover:border-2 hover:border-cyan-600 ${activeButton === "pause" ? "bg-cyan-800" : "bg-cyan-600"
                                        }`}
                                >
                                    Pause
                                </button>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full">
                                <p className="font-semibold text-center text-gray-700 text-xs mb-2">Progress Bar</p>
                                <div className="relative w-full h-4 bg-gray-300 rounded-full">
                                    <div
                                        className="absolute top-0 left-0 h-4 bg-cyan-500 rounded-full"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Longitude & Latitude */}
                            <div className="w-full bg-gray-200 text-center text-gray-700 text-xs font-mono rounded-md p-2">
                                {trackingData.length > 0 ? (
                                    <>
                                        {trackingData[trackingData.length - 1].lat}, {trackingData[trackingData.length - 1].lng}
                                    </>
                                ) : (
                                    "No Data"
                                )}
                            </div>
                        </div>
                        {/* Kontainer Map */}
                        <div className="row-span-2 lg:col-span-2 rounded-md overflow-hidden ">
                            {/* Map Section */}
                            <MapContainer
                                center={trackingData.length > 0 ? [trackingData[0].lat, trackingData[0].lng] : [0, 0]}
                                zoom={13}
                                scrollWheelZoom={true}
                                className="w-full h-full"
                            >
                                <TileLayer
                                    url='https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&key=AIzaSyCxPsqzrnGiVjmKIBwCDdzAUIBVbBM2Ums'
                                    attribution=''
                                />
                                {trackingData.slice(0, currentIndex + 1).map((coord, index) => (
                                    <Marker key={index} position={[coord.lat, coord.lng]}>
                                        <Popup>
                                            Latitude: {coord.lat.toFixed(5)} <br />
                                            Longitude: {coord.lng.toFixed(5)}
                                        </Popup>
                                    </Marker>
                                ))}
                                {currentIndex > 0 && (
                                    <Polyline
                                        positions={trackingData.slice(0, currentIndex + 1).map((coord) => [coord.lat, coord.lng])}
                                        color="blue"
                                    />
                                )}
                            </MapContainer>
                        </div>

                    </div>
                </div>
                {/* Modal */}
                <Modal
                    show={modal}
                    size="md"
                    onClose={() => {
                        setModal(false);
                    }}
                    popup
                >
                    <Modal.Header />
                    <Modal.Body>
                        <p className="py-6">Yakin ingin menghapus kendaraan ?</p>
                        <Button
                            onClick={() => {
                                handleDelete;
                            }}
                            className="w-full"
                        >
                            Hapus
                        </Button>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}
