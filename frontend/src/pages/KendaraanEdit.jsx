import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Label, TextInput, FileInput, Select, Button } from "flowbite-react";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import { API_URL } from "../utils/constants";

export default function KendaraanEdit() {
  const vehicleId = useParams();
  const [vehicle, setVehicle] = useState(null);
  // const [noKendaraan, setNoKendaraan] = useState(null);
  // const [idPerangkat, setIdPerangkat] = useState(null);
  // const [kategori, setKategori] = useState(null);
  // const [driver, setDriver] = useState(null);
  // const [operator, setOperator] = useState(null);
  // const [noTelepon, setNoTelepon] = useState(null);

  useEffect(() => {
    // console.log(vehicleId.id);
    axios
      .get(API_URL + `vehicles/${vehicleId.id}`)
      .then((res) => {
        setVehicle(res.data); //asynchronous
        console.log("vehicle direct: ", res.data); //menampilkan
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(API_URL + `vehicles/${vehicleId}`, {
        no_keendaraan: vehicle.no_kendaraan,
        id_perangkat: vehicle.id_perangkat,
        kategori: vehicle.kategori,
        driver: vehicle.driver,
        no_telepon: vehicle.no_telepon,
        operator: vehicle.operator,
      })
      .then(console.log("POST Kendaraan Berhasil!"))
      .catch((error) => {
        console.log("POST Kendaraaan Gagal: " + error);
      });

    {
      // try {
      //   await axios.post(API_URL + "vehicles", {
      //     noKendaraan: noKendaraan,
      //     idPerangkat: idPerangkat,
      //     kategori: kategori,
      //     noTelepon: noTelepon,
      //     operator: operator,
      //     paket: paket,
      //   });
      //   this.popupStatus("Success", "Device data has changed", "success");
      // } catch (error) {
      //   console.log(error);
      //   this.popupStatus("Failed", "Cant't change device data", "error");
      // }
    }
  };

  return (
    <div className="w-[85vw] lg:w-full min-h-full p-5">
      {/* Header */}
      <div className="py-5 px-4 w-auto bg-white flex items-center justify-between cursor-pointer mt-5 border-y-2 border-gray-200">
        <div className="flex items-center gap-2 lg:gap-5">
          <img
            src="/images/back.svg"
            alt="Back"
            className="w-4 h-4 lg:w-6 lg:h-6 "
            onClick={() => window.history.back()}
          />
          <h5 className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-300 text-transparent bg-clip-text">
            Edit Data Kendaraan
          </h5>
        </div>
      </div>
      <div className="my-6">
        <div>
          <Label
            htmlFor="dropzone-file"
            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF
              </p>
            </div>
            <FileInput id="dropzone-file" className="hidden" />
          </Label>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="noKendaraan" value="No Kendaraan" />
          </div>
          <TextInput
            id="noKendaraan"
            value={vehicle?.no_kendaraan || ""}
            placeholder={vehicle?.no_kendaraan || ""}
            onChange={(event) =>
              setVehicle((prevVehicle) => ({
                ...prevVehicle,
                no_kendaraan: event.target.value,
              }))
            }
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="idPerangkat" value="ID Perangkat" />
          </div>
          <TextInput
            id="idPerangkat"
            value={vehicle?.id_perangkat || ""}
            placeholder={vehicle?.id_perangkat || ""}
            required
            readOnly
            disabled
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="kategori" value="Kategori" />
          </div>
          <Select
            id="kategori"
            value={vehicle?.kategori || ""}
            onChange={(event) =>
              setVehicle((prevVehicle) => ({
                ...prevVehicle,
                kategori: event.target.value, // Perbarui state vehicle.kategori
              }))
            }
            required
          >
            <option value="">Pilih Kategori</option>
            <option value="Truk">Truk</option>
            <option value="Mobil">Mobil</option>
          </Select>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="driver" value="Driver" />
          </div>
          <TextInput
            id="driver"
            value={vehicle?.driver || ""}
            placeholder={vehicle?.driver || ""}
            onChange={(event) =>
              setVehicle((prevVehicle) => ({
                ...prevVehicle,
                driver: event.target.value,
              }))
            }
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="operator" value="Operator Seluler" />
          </div>
          <TextInput
            id="operator"
            value={vehicle?.operator || ""}
            placeholder={vehicle?.operator || ""}
            onChange={(event) =>
              setVehicle((prevVehicle) => ({
                ...prevVehicle,
                operator: event.target.value,
              }))
            }
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="noTelepon" value="No Telepon" />
          </div>
          <TextInput
            id="noTelepon"
            value={vehicle?.no_telepon || ""}
            placeholder={vehicle?.no_telepon || ""}
            onChange={(event) =>
              setVehicle((prevVehicle) => ({
                ...prevVehicle,
                no_telepon: event.target.value,
              }))
            }
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
