import React, { useState, useEffect } from "react";
import axios from "axios";
import { Label, TextInput } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants";
import { Button } from "flowbite-react";

export default function KendaraanEdit() {
    const [vehicle, setVehicle] = useState({});
    const [noKendaraan, setNoKendaraan] = useState(null);
    const [idPerangkat, setIdPerangkat] = useState(null);
    const [kategori, setKategori] = useState(null);
    const [driver, setDriver] = useState(null);
    const [operator, setOperator] = useState(null);
    const [noTelepon, setNoTelepon] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(API_URL + "vehicles/1")
            .then((res) => {
                const vehicle = res.data;
                console.log(vehicle);
                setVehicle(vehicle);
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { noKendaraan, idPerangkat, kategori, noTelepon, operator, paket } =
            this.state;
        const url = `${API_URL}vehicles/${vehicle.id}`; // Change endpoint

        try {
            await axios.post(url, {
                noKendaraan: noKendaraan,
                idPerangkat: idPerangkat,
                kategori: kategori,
                noTelepon: noTelepon,
                operator: operator,
                paket: paket,
            });
            this.popupStatus("Success", "Device data has changed", "success");
        } catch (error) {
            console.log(error);
            this.popupStatus("Failed", "Cant't change device data", "error");
        }
    };

    const handleBack = () => {
        navigate('/KendaraanDetail');
    };

    return (
        <div className="w-[85vw] lg:w-full min-h-full">
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
                        Edit Data Kendaraan
                    </h5>
                </div>
            </div>
            <div className="my-6">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="noKendaraan" value="No Kendaraan" />
                    </div>
                    <TextInput
                        id="noKendaraan"
                        value={noKendaraan ? noKendaraan : vehicle.no_kendaraan}
                        onChange={(event) => setNoKendaraan(event.target.value)}
                        placeholder={vehicle.no_kendaraan}
                        required
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="idPerangkat" value="ID Perangkat" />
                    </div>
                    <TextInput
                        id="idPerangkat"
                        value={idPerangkat ? idPerangkat : vehicle.id_perangkat}
                        onChange={(event) => setIdPerangkat(event.target.value)}
                        placeholder={vehicle.id_perangkat}
                        required
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="kategori" value="Kategori" />
                    </div>
                    <TextInput
                        id="kategori"
                        value={kategori ? kategori : vehicle.kategori}
                        onChange={(event) => setKategori(event.target.value)}
                        placeholder={vehicle.kategori}
                        required
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="driver" value="Driver" />
                    </div>
                    <TextInput
                        id="driver"
                        value={driver ? driver : vehicle.driver}
                        onChange={(event) => setDriver(event.target.value)}
                        placeholder={vehicle.kategori}
                        required
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="operator" value="Operator" />
                    </div>
                    <TextInput
                        id="operator"
                        value={operator ? operator : vehicle.operator}
                        onChange={(event) => setOperator(event.target.value)}
                        placeholder={vehicle.operator}
                        required
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="noTelepon" value="No Telepon" />
                    </div>
                    <TextInput
                        id="noTelepon"
                        value={noTelepon ? noTelepon : vehicle.no_telepon}
                        onChange={(event) => setNoTelepon(event.target.value)}
                        placeholder={vehicle.no_telepon}
                        required
                    />
                </div>
            </div>
            <div className="w-full flex justify-center">
                <Button onClick={handleSubmit} className="w-1/2">
                    <p>
                        <FontAwesomeIcon icon={faFloppyDisk} /> Simpan Data Kendaraan
                    </p>
                </Button>
            </div>
        </div>
    );
}