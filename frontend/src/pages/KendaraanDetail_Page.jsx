import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
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

    const [vehicle, setVehicle] = useState({});
    const [modal, setModal] = useState(false);
    const [coordinates, setCoordinates] = useState({ lat: -6.200000, lng: 106.816666 });

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
                    <div className="grid grid-rows-4 lg:grid-cols-3 lg:grid-rows-1 bg-white p-4 rounded-lg shadow-md h-[300px] gap-4">
                        {/* Kontainer Judul */}
                        <div className="row-span-1 lg:col-span-1 text-lg font-bold text-cyan-600 flex lg:items-center justify-center rounded-md">
                            Tracking Jalan
                        </div>

                        {/* Kontainer Map */}
                        <div className="row-span-3 lg:col-span-2 rounded-md overflow-hidden">
                            <MapContainer
                                center={[coordinates.lat, coordinates.lng]}
                                zoom={13}
                                scrollWheelZoom={true}
                                className="w-full h-full"
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <Marker position={[coordinates.lat, coordinates.lng]}>
                                    <Popup>
                                        Lokasi Kendaraan: <br />
                                        Latitude: {coordinates.lat}, <br />
                                        Longitude: {coordinates.lng}
                                    </Popup>
                                </Marker>
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