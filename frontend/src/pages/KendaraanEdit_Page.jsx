import React, { useState, useEffect } from "react";
import axios from "axios";
import { Label, TextInput, Button } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants";

export default function KendaraanEdit() {
    const [vehicle, setVehicle] = useState({});
    const [noKendaraan, setNoKendaraan] = useState(null);
    const [idPerangkat, setIdPerangkat] = useState(null);
    const [kategori, setKategori] = useState(null);
    const [driver, setDriver] = useState(null);
    const [operator, setOperator] = useState(null);
    const [noTelepon, setNoTelepon] = useState(null);
    const [image, setImage] = useState(null); // Untuk gambar baru
    const [imagePreview, setImagePreview] = useState(null); // Preview gambar
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_URL}vehicles/1`)
            .then((res) => {
                const vehicle = res.data;
                setVehicle(vehicle);
                setImagePreview(vehicle.image_url); // Set gambar awal dari API
            })
            .catch((error) => console.log("Error: ", error));
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file)); // Tampilkan preview gambar baru
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("noKendaraan", noKendaraan || vehicle.no_kendaraan);
        formData.append("idPerangkat", idPerangkat || vehicle.id_perangkat);
        formData.append("kategori", kategori || vehicle.kategori);
        formData.append("driver", driver || vehicle.driver);
        formData.append("operator", operator || vehicle.operator);
        formData.append("noTelepon", noTelepon || vehicle.no_telepon);

        if (image) {
            formData.append("image", image); // Tambahkan gambar jika ada yang diupload
        }

        try {
            await axios.post(`${API_URL}vehicles/${vehicle.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Data berhasil diperbarui!");
            navigate(`/kendaraan/${vehicle.id}`);
        } catch (error) {
            console.error("Error updating vehicle:", error);
            alert("Gagal memperbarui data!");
        }
    };

    return (
        <div className="w-[85vw] lg:w-full min-h-full">
            {/* Header */}
            <div className="py-5 px-4 w-auto bg-white flex items-center justify-between cursor-pointer mt-5 border-y-2 border-gray-200">
                <div className="flex items-center gap-2 lg:gap-5">
                    <img
                        src="/images/back.svg"
                        alt="Back"
                        className="w-4 h-4 lg:w-6 lg:h-6"
                        onClick={() => navigate(`/kendaraan/${vehicle.id}`)}
                    />
                    <h5 className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-300 text-transparent bg-clip-text">
                        Edit Data Kendaraan
                    </h5>
                </div>
            </div>

            {/* Kontainer Edit */}
            <div className="m-4 py-4 px-6 bg-white grid grid-cols-1 lg:grid-cols-2 gap-10 rounded-lg shadow-md">
                {/* Kolom Kiri: Form */}
                <div>
                    <div className="mb-2">
                        <Label htmlFor="noKendaraan" value="No Kendaraan" />
                        <TextInput
                            id="noKendaraan"
                            value={noKendaraan ?? vehicle.no_kendaraan}
                            onChange={(e) => setNoKendaraan(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <Label htmlFor="idPerangkat" value="ID Perangkat" />
                        <TextInput
                            id="idPerangkat"
                            value={idPerangkat ?? vehicle.id_perangkat}
                            onChange={(e) => setIdPerangkat(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <Label htmlFor="kategori" value="Kategori" />
                        <TextInput
                            id="kategori"
                            value={kategori ?? vehicle.kategori}
                            onChange={(e) => setKategori(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <Label htmlFor="driver" value="Driver" />
                        <TextInput
                            id="driver"
                            value={driver ?? vehicle.driver}
                            onChange={(e) => setDriver(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <Label htmlFor="operator" value="Operator" />
                        <TextInput
                            id="operator"
                            value={operator ?? vehicle.operator}
                            onChange={(e) => setOperator(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <Label htmlFor="noTelepon" value="No Telepon" />
                        <TextInput
                            id="noTelepon"
                            value={noTelepon ?? vehicle.no_telepon}
                            onChange={(e) => setNoTelepon(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Kolom Kanan: Gambar & Upload */}
                <div className="flex flex-col items-center justify-center p-4 text-center">
                    <img
                        src={imagePreview || "/images/default-car.jpg"}
                        alt="Gambar Kendaraan"
                        className="w-64 h-80 object-cover rounded-lg border-2"
                    />

                    {/* Kontainer input file untuk mengontrol ukuran */}
                    <div className="relative mt-3 w-64">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:px-3 file:py-1 file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                        />
                    </div>


                    <Button className="mt-3 bg-blue-500 hover:bg-blue-700 text-white">
                        <FontAwesomeIcon icon={faUpload} className="mr-2" /> Upload Gambar
                    </Button>
                </div>
            </div>

            {/* Tombol Simpan */}
            <div className="w-full flex justify-center mt-5">
                <Button onClick={handleSubmit} className="w-1/2 bg-green-500 hover:bg-green-700">
                    <FontAwesomeIcon icon={faFloppyDisk} className="mr-2" /> Simpan Data Kendaraan
                </Button>
            </div>
        </div>
    );
}
