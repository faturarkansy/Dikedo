import { useState } from "react";
import axios from "axios";
import { Label, TextInput, Select, Button } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../utils/constants";
import Notifikasi from "../components/Notification";

export default function KendaraanTambah() {
  const [vehicle, setVehicle] = useState({});
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [notif, setNotif] = useState({ message: "", type: "" });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Tampilkan preview gambar baru
    }
  };

  const showNotification = (message, type) => {
    setNotif({ message, type });

    setTimeout(() => {
      setNotif({ message: "", type: "" });
    }, 2000); // Notifikasi menghilang setelah 1,5 detik
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("no_kendaraan", vehicle.no_kendaraan);
    formData.append("id_perangkat", vehicle.id_perangkat);
    formData.append("kategori", vehicle.kategori);
    formData.append("driver", vehicle.driver);
    formData.append("operator", vehicle.operator);
    formData.append("no_telepon", vehicle.no_telepon);
    image ? formData.append("image", image) : null; // Tambahkan gambar jika ada yang diupload
    try {
      await axios({
        method: "post",
        url: `${API_URL}vehicles`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      showNotification("Data Kendaraan Berhasil Ditambahkan", "success");
    } catch (error) {
      showNotification("Data Kendaraan Gagal Ditambahkan", "error");
      console.error("Error updating vehicle:", error);
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
            onClick={() => window.history.back()}
          />
          <h5 className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-300 text-transparent bg-clip-text">
            Tambah Data Kendaraan
          </h5>
        </div>
      </div>

      {/* Notification */}
      <Notifikasi
        message={notif.message}
        type={notif.type}
        onClose={() => setNotif({ message: "", type: "" })}
      />

      {/* Kontainer Edit */}
      <div className="m-4 py-4 px-6 bg-white grid grid-cols-1 lg:grid-cols-2 gap-10 rounded-lg shadow-md">
        {/* Kolom Kiri: Form */}
        <div>
          <div>
            <div className="mb-2">
              <Label htmlFor="noKendaraan" value="No Kendaraan" />
            </div>
            <TextInput
              id="noKendaraan"
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
            <TextInput id="idPerangkat" required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="kategori" value="Kategori" />
            </div>
            <Select
              id="kategori"
              onChange={(event) =>
                setVehicle((prevVehicle) => ({
                  ...prevVehicle,
                  kategori: event.target.value,
                }))
              }
              required
            >
              <option value="" disabled selected>
                Pilih Kategori
              </option>
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
              placeholder="08xxxxxxxxxx"
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

        {/* Kolom Kanan: Gambar & Upload */}
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <img
            src={imagePreview || "https://imageplaceholder.net/600x400"}
            alt="Gambar Kendaraan"
            className="w-64 h-80 object-contain rounded-lg border-2"
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
        </div>
      </div>

      {/* Tombol Simpan */}
      <div className="w-full flex justify-center mt-5">
        <Button
          onClick={handleSubmit}
          className="w-1/2 bg-green-500 hover:bg-green-700"
        >
          <FontAwesomeIcon icon={faFloppyDisk} className="mr-2" /> Simpan Data
          Kendaraan
        </Button>
      </div>
    </div>
  );
}
