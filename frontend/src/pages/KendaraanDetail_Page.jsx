import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../utils/constants";
import coordinatesData from "../components/Coordinates5.json";
import Notifikasi from "../components/Notification";

function MapUpdater({ coordinates }) {
  const map = useMap();
  useEffect(() => {
    map.setView([coordinates.lat, coordinates.lng], map.getZoom(), {
      animate: true,
    });
  }, [coordinates, map]);
  return null;
}

export default function KendaraanDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(null);

  const [vehicle, setVehicle] = useState({});
  const [modal, setModal] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lat: -6.2,
    lng: 106.816666,
  });
  const [intervalId, setIntervalId] = useState(null);

  const [trackingData, setTrackingData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSortDate, setIsSortDate] = useState(false);
  const [polylinePositions, setPolylinePositions] = useState([]);
  const [notif, setNotif] = useState({ message: "", type: "" });

  useEffect(() => {
    axios
      .get(API_URL + `vehicles/${id}`)
      .then((res) => {
        setVehicle(res.data);
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

  const showNotification = (message, type) => {
    setNotif({ message, type });

    setTimeout(() => {
      setNotif({ message: "", type: "" });
    }, 2000); // Notifikasi menghilang setelah 1,5 detik
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      await axios.delete(`/kendaraan/${vehicle.id}`);
      showNotification("Data Kendaraan Berhasil Dihapus", "success");
    } catch (error) {
      showNotification("Data Kendaraan Gagal Dirubah", "error");
      console.log("Error delete vehicle", error);
    }
  };

  const handleStartTracking = () => {
    if (
      isTracking ||
      trackingData.length === 0 ||
      currentIndex >= trackingData.length
    )
      return;

    setIsTracking(true);

    const newIntervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex < trackingData.length - 1) {
          const nextIndex = prevIndex + 1;
          const nextCoordinates = trackingData[nextIndex];

          // Update posisi marker dan polyline
          setCoordinates({
            lat: nextCoordinates.lat,
            lng: nextCoordinates.lng,
          });
          setPolylinePositions((prev) => [...prev, nextCoordinates]);

          return nextIndex;
        } else {
          clearInterval(newIntervalId);
          setIsTracking(false);
          return prevIndex;
        }
      });
    }, 250); // Update posisi setiap 0,25 detik

    setIntervalId(newIntervalId);
  };

  const handlePauseTracking = () => {
    setIsTracking(false);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const handleSortDate = () => {
    setIsSortDate(!isSortDate);
  };

  return (
    <div className="w-[85vw] lg:w-full min-h-full ">
      {/* Header */}
      <div
        className="py-5 px-4 w-auto bg-white flex items-center justify-between cursor-pointer mt-5 border-y-2 border-gray-200"
        style={{
          backgroundImage: "url('images/ornament header.svg')",
          backgroundPosition: "right 5px",
          backgroundRepeat: "no-repeat",
          backgroundSize: "175px",
        }}
      >
        <div className="flex items-center gap-2 lg:gap-3">
          <img
            src="/images/back.svg"
            alt="Back"
            className="w-4 h-4 lg:w-6 lg:h-6 "
            onClick={() => window.history.back()}
          />
          <h5 className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-300 text-transparent bg-clip-text">
            Kendaraan Details
          </h5>
        </div>
      </div>

      {/* Notification */}
      <Notifikasi
        message={notif.message}
        type={notif.type}
        onClose={() => setNotif({ message: "", type: "" })}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 m-4">
        {/* Kontainer Kiri - Detail Kendaraan */}
        <div className="lg:col-span-1 bg-white p-4 border rounded-lg shadow-md flex flex-col justify-between h-full">
          <div className="grid grid-cols-2 gap-4 flex-1">
            <div>
              <p className="text-cyan-600 text-xs lg:text-base font-bold">
                No Kendaraaan
              </p>
              <p className="text-gray-600 text-xs lg:text-base">
                {vehicle.no_kendaraan}
              </p>
            </div>
            <div>
              <p className="text-cyan-600 text-xs lg:text-base font-bold">
                ID Perangkat
              </p>
              <p className="text-gray-600 text-xs lg:text-base">
                {vehicle.id_perangkat}
              </p>
            </div>
            <div>
              <p className="text-cyan-600 text-xs lg:text-base font-bold">
                Kategori
              </p>
              <p className="text-gray-600 text-xs lg:text-base">
                {vehicle.kategori}
              </p>
            </div>
            <div>
              <p className="text-cyan-600 text-xs lg:text-base font-bold">
                Driver
              </p>
              <p className="text-gray-600 text-xs lg:text-base">
                {vehicle.driver}
              </p>
            </div>
            <div>
              <p className="text-cyan-600 text-xs lg:text-base font-bold">
                Update Terakhir
              </p>
              <p className="text-gray-600 text-xs lg:text-base">
                {vehicle.last_update}
              </p>
            </div>
            <div>
              <p className="text-cyan-600 text-xs lg:text-base font-bold">
                Operator
              </p>
              <p className="text-gray-600 text-xs lg:text-base">
                {vehicle.operator}
              </p>
            </div>
            <div>
              <p className="text-cyan-600 text-xs lg:text-base font-bold">
                No Telepon
              </p>
              <p className="text-gray-600 text-xs lg:text-base">
                {vehicle.no_telepon}
              </p>
            </div>
            <div>
              <p className="text-cyan-600 text-xs lg:text-base font-bold">
                Mesin
              </p>
              <p className="text-gray-600 text-xs lg:text-base">
                {vehicle.detail?.engineStatus || ""}
              </p>
            </div>
            <div>
              <p className="text-cyan-600 text-xs lg:text-base font-bold">
                Kondisi
              </p>
              <p className="text-gray-600 text-xs lg:text-base">
                {vehicle.detail?.status || ""}
              </p>
            </div>
            <div>
              <p className="text-cyan-600 text-xs lg:text-base font-bold">
                Kecepatan
              </p>
              <p className="text-gray-600 text-xs lg:text-base">
                {vehicle.detail?.speed || ""}
              </p>
            </div>
            <div>
              <p className="text-cyan-600 text-xs lg:text-base font-bold">
                Longitude
              </p>
              <p className="text-gray-600 text-xs lg:text-base">
                {vehicle.detail?.coordinate.longitude || ""}
              </p>
            </div>
            <div>
              <p className="text-cyan-600 text-xs lg:text-base font-bold">
                Latitude
              </p>
              <p className="text-gray-600 text-xs lg:text-base">
                {vehicle.detail?.coordinate.latitude || ""}
              </p>
            </div>
            <div>
              <p className="text-cyan-600 text-xs lg:text-base font-bold">
                Jenis Paket
              </p>
              <p className="text-gray-600 text-xs lg:text-base">
                {vehicle.subscription?.type || ""}
              </p>
            </div>
            <div>
              <p className="text-cyan-600 text-xs lg:text-base font-bold">
                Paket Berakhir
              </p>
              <p className="text-gray-600 text-xs lg:text-base">
                {vehicle.subscription?.expired_date || ""}
              </p>
            </div>
          </div>

          <hr className="border-gray-300 my-4" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-auto">
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
            <h5 className="lg:col-span-1 text-lg font-bold text-cyan-600 flex items-center justify-center rounded-md">
              Video Live Kamera
            </h5>
            <div className="lg:col-span-2 rounded-md overflow-hidden bg-gray-200 flex items-center justify-center">
              {/* Placeholder Video */}
              <p className="text-gray-500">[Video Live Kamera]</p>
            </div>
          </div>

          {/* Kontainer Tracking Jalan */}
          <div className="grid grid-rows-3 lg:grid-cols-3 lg:grid-rows-1 bg-white p-4 rounded-lg shadow-md min-h-[300px] gap-4">
            {/* Kontainer Judul */}
            <div className="row-span-1 lg:col-span-1 flex flex-col items-center justify-center text-lg font-bold text-cyan-600 rounded-lg py-6 px-14 space-y-4">
              {/* Judul */}
              <h2 className="text-xl text-cyan-600">Tracking Jalan</h2>

              {/* Sort Date */}
              <div className="w-full relative">
                <div
                  className="bg-gray-200 text-center text-gray-700 text-xs font-mono rounded-md py-2 px-3 cursor-pointer flex items-center justify-center gap-2"
                  onClick={handleSortDate}
                >
                  <div className="mr-4">14 Oct 2024</div>
                  <img
                    src="/images/arrow.svg"
                    alt="Arrow"
                    className={`w-3 h-3 transition-transform duration-500 ${
                      isSortDate ? "rotate-90" : "rotate-[270deg]"
                    }`}
                  />
                </div>
                {isSortDate && (
                  <div className="absolute left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-md p-2 z-50 w-full">
                    <ul className="text-gray-700 text-xs text-center">
                      <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                        13 Oct 2024
                      </li>
                      <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                        12 Oct 2024
                      </li>
                      <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                        11 Oct 2024
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              {/* Progress Bar */}
              <div className="w-full">
                <p className="font-semibold text-center text-gray-700 text-xs mb-2">
                  Progress Bar
                </p>
                <div className="relative w-full h-2 bg-gray-300 rounded-full">
                  <div
                    className="absolute top-0 left-0 h-2 bg-cyan-500 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Button Group */}
              <div className="flex space-x-4">
                <button
                  onClick={handleStartTracking}
                  className={`p-2 text-white text-sm rounded-lg shadow-lg hover:bg-white hover:text-cyan-600 hover:border-2 hover:border-cyan-600 ${
                    activeButton === "start" ? "bg-cyan-800" : "bg-cyan-600"
                  }`}
                >
                  Start
                </button>
                <button
                  onClick={handlePauseTracking}
                  className={`p-2 text-white text-sm rounded-lg shadow-lg hover:bg-white hover:text-cyan-600 hover:border-2 hover:border-cyan-600 ${
                    activeButton === "pause" ? "bg-cyan-800" : "bg-cyan-600"
                  }`}
                >
                  Pause
                </button>
              </div>
            </div>
            {/* Kontainer Map */}
            <div className="row-span-2 lg:col-span-2 rounded-md overflow-hidden z-10">
              {/* Map Section */}
              <MapContainer
                center={[coordinates.lat, coordinates.lng]}
                zoom={13}
                scrollWheelZoom={true}
                className="w-full h-full"
              >
                <MapUpdater coordinates={coordinates} />
                <TileLayer
                  url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&key=AIzaSyCxPsqzrnGiVjmKIBwCDdzAUIBVbBM2Ums"
                  attribution=""
                />
                <Marker position={coordinates}></Marker>
                <Polyline positions={polylinePositions} color="blue" />
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
          <Modal.Body className="z-20">
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
