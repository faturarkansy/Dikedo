import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.css";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import "leaflet-fullscreen/dist/Leaflet.fullscreen.js";

import { Icons } from "../components/mapIcons";
import Search from "../components/Search";
import { API_URL } from "../utils/constants";

// Hook to update map view
const ChangeView = ({ targetLocation, zoomLevel }) => {
  const map = useMap();

  useEffect(() => {
    if (targetLocation) {
      map.setView(targetLocation, zoomLevel, {
        animate: true,
        duration: 0.5,
      });
    }
  }, [targetLocation, zoomLevel, map]);

  return null;
};

const LiveMap = () => {
  // History dummy data (NEED TO CHANGE!)
  const historyData = [
    {
      date: "2024-12-31 15:46:06",
      address:
        "Jalan Pulau Morotai, Kalibalau Kencana, Bandar Lampung, Lampung, Sumatera, 35133, Indonesia",
      duration: "0h 6m 52s",
    },
    {
      date: "2024-12-29 11:55:02",
      address:
        "Sukamenanti, Bandar Lampung, Lampung, Sumatera, 35123, Indonesia",
      duration: "0h 6m 12s",
    },
    {
      date: "2024-12-29 08:05:21",
      address:
        "Sukamenanti, Bandar Lampung, Lampung, Sumatera, 35123, Indonesia",
      duration: "2h 48m 49s",
    },
    {
      date: "2024-12-28 13:26:18",
      address:
        "Jalan Rusa, Sukamenanti, Bandar Lampung, Lampung, Sumatera, 35123, Indonesia",
      duration: "2h 58m 5s",
    },
    {
      date: "2024-12-28 07:56:36",
      address:
        "Jalan Rusa, Sukamenanti, Bandar Lampung, Lampung, Sumatera, 35123, Indonesia",
      duration: "1h 52m 22s",
    },
  ];

  // About map state
  const [currentLayer, setCurrentLayer] = useState("Google Map");
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // About vehicle state
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(20);
  const [isContainerVisible, setIsContainerVisible] = useState(true);
  const [selectedVehicleHistory, setSelectedVehicleHistory] = useState(null);
  const [filters, setFilters] = useState({
    move: true,
    park: true,
    off: true,
    miss: true,
  });
  const data = Object.values(vehicles);

  // Other state
  const [isArrowRotated, setIsArrowRotated] = useState(false);
  const [q, setQ] = useState("");

  // Layer Control
  const JawgTileLayer =
    "https://tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=GhJ3i9TeSKFbfMoRrh0XXkHRlhALG9PVqpkggJEmeAFq6QBHz2z47dmZ9pQre0j4";
  const OsmTileLayer = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
  const GoogleStreetTileLayer =
    "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&key=AIzaSyCxPsqzrnGiVjmKIBwCDdzAUIBVbBM2Ums";
  const baseLayers = {
    "JAWG MAP": JawgTileLayer,
    "OpenStreet Map": OsmTileLayer,
    "Google Map": GoogleStreetTileLayer,
  };

  //   Get API
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

  //  Layer option popup handler
  const togglePopupVisibility = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  // Show vehicles side infographic
  const search = (items) => {
    return items.filter((item) => {
      if (Object.values(filters).every((value) => !value)) {
        return true;
      } else if (filters[item.detail.status]) {
        return (
          item.no_kendaraan.toString().toLowerCase().indexOf(q.toLowerCase()) >
          -1
        );
      } else {
        return filters[item.detail.status];
      }
    });
  };

  //   Map layer change handler
  const handleLayerChange = (layerName) => {
    setCurrentLayer(layerName);
  };

  //   Side Infographic Handler
  const handleToggle = () => {
    setIsContainerVisible((prevState) => !prevState);
    setIsArrowRotated(!isArrowRotated);
  };

  //   Status vehicles filter handler
  const handleCheckboxChange = (status) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [status]: !prevFilters[status],
    }));
  };

  //   Side vehicle clicked handler
  const handleContainerClick = (vehicle) => {
    // setIsPopupVisible(!isPopupVisible);
    setSelectedVehicle({
      lat: vehicle.detail.coordinate.latitude,
      lon: vehicle.detail.coordinate.longitude,
    });
    setZoomLevel(24);
  };

  //   Side vehicle history clicked handler
  const toggleHistory = (vehicle) => {
    if (selectedVehicleHistory?.no_kendaraan === vehicle.no_kendaraan) {
      setSelectedVehicleHistory(null);
    } else {
      setSelectedVehicleHistory(vehicle);
    }
    console.log(selectedVehicleHistory);
  };

  //   Counting vehicles per vehicle status
  const statusCounts = {
    move: vehicles.filter((vehicle) => vehicle.detail.status === "move").length,
    park: vehicles.filter((vehicle) => vehicle.detail.status === "park").length,
    off: vehicles.filter((vehicle) => vehicle.detail.status === "off").length,
    miss: vehicles.filter((vehicle) => vehicle.detail.status === "miss").length,
  };

  return (
    <div className="h-screen w-full relative">
      <div
        className={`absolute inset-y-0 left-0 w-64 lg:w-[360px] z-10 bg-white bg-opacity-80 shadow-md my-5 p-4 rounded-tr-[10px] rounded-br-[10px] transition-all duration-500 ease-in-out flex flex-col h-[94vh] ${
          isContainerVisible
            ? "transform translate-x-0"
            : "transform -translate-x-full"
        }`}
      >
        <div className="sidebar-head flex items-center pb-4">
          {/* Teks DIKEDO GPS dan Welcome */}
          <div>
            <h1 className="text-2xl text-black font-bold">
              DIKEDO<span className="font-normal">GPS</span>
            </h1>
            <p className="text-sm font-semibold mt-1">
              Welcome, Fatur Arkan Syawalva
            </p>
          </div>
        </div>
        <button
          onClick={handleToggle}
          className="absolute right-[-28px] lg:left-[360px] top-[20px] w-8 h-8 bg-white opacity-80 transform rounded-r-lg pl-1.5"
        >
          <img
            src="images/arrow.svg"
            alt="Arrow"
            className={`w-5 h-5 transition-transform duration-500 ${
              isArrowRotated ? "rotate-180" : ""
            }`}
          />
        </button>
        {/* <Input
                    onChange={(e) => setSearch(e.target.value)}
                    id="search"
                    placeholder="Search to find"
                    className="block pt-2 ps-10 text-xs lg:text-sm text-gray-900 border border-gray-300 rounded-lg w-56 lg:w-80 bg-white focus:ring-cyan-400 focus:border-cyan-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-400 dark:focus:border-cyan-400"
                /> */}
        <div className="font-medium">
          <Search q={q} setQ={setQ} />
        </div>
        <div className="flex justify-between mb-4 mt-4 bg-white border border-gray-300 p-2 px-3 rounded-lg">
          <div className="flex items-center mr-2">
            <input
              id="default-checkbox-1"
              type="checkbox"
              checked={filters.move}
              onChange={() => handleCheckboxChange("move")}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="default-checkbox-1"
              className="ms-1 lg:ms-2 text-xs lg:text-sm font-medium text-green-500"
            >
              Move
            </label>
          </div>
          <div className="flex items-center mr-2">
            <input
              id="default-checkbox-2"
              type="checkbox"
              checked={filters.park}
              onChange={() => handleCheckboxChange("park")}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="default-checkbox-2"
              className="ms-1 lg:ms-2 text-xs lg:text-sm font-medium text-yellow-300"
            >
              Park
            </label>
          </div>
          <div className="flex items-center mr-2">
            <input
              id="default-checkbox-3"
              type="checkbox"
              checked={filters.off}
              onChange={() => handleCheckboxChange("off")}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="default-checkbox-3"
              className="ms-1 lg:ms-2 text-xs lg:text-sm font-medium text-red-600"
            >
              Off
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="default-checkbox-4"
              type="checkbox"
              checked={filters.miss}
              onChange={() => handleCheckboxChange("miss")}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="default-checkbox-4"
              className="ms-1 lg:ms-2 text-xs lg:text-sm font-medium text-gray-400"
            >
              Miss
            </label>
          </div>
        </div>

        <div className="grid gap-4 flex-grow overflow-y-auto rounded-lg custom-scrollbar pr-2">
          {search(data).map((vehicle, index) => (
            <div
              key={index}
              className="bg-white p-3 rounded-lg border border-gray-300"
              onClick={() => handleContainerClick(vehicle)}
            >
              <div className="grid grid-cols-3 gap-3 mb-2">
                <div className="flex flex-col h-full justify-between bg-white">
                  {vehicle.kategori === "Mobil" ? (
                    <img
                      src="images/car.svg"
                      alt="Car"
                      className="mt-4 lg:mt-2 lg:mx-auto lg:max-w-[80px] lg:max-h-[80px] object-contain"
                    />
                  ) : vehicle.kategori === "Truk" ? (
                    <img
                      src="images/truck.svg"
                      alt="Truck"
                      className="mt-4 lg:mt-0 lg:mx-auto lg:max-w-[75px] lg:max-h-[75px] object-contain"
                    />
                  ) : (
                    <img
                      src="images/motorcycle.svg"
                      alt="Motorcycle"
                      className="mt-4 lg:mt-0 lg:mx-auto lg:max-w-[75px] lg:max-h-[75px] object-contain"
                    />
                  )}
                  {vehicle.detail.status === "move" ? (
                    <div className="bg-green-500 py-1.5 lg:p-1 rounded-xl mt-auto">
                      <p className="text-center text-sm lg:text-base text-white font-semibold">
                        Move
                      </p>
                    </div>
                  ) : vehicle.detail.status === "park" ? (
                    <div className="bg-yellow-300 py-1.5 lg:p-1 rounded-xl mt-auto">
                      <p className="text-center text-sm lg:text-base text-white font-semibold">
                        Park
                      </p>
                    </div>
                  ) : vehicle.detail.status === "off" ? (
                    <div className="bg-red-600 py-1.5 lg:p-1 rounded-xl mt-auto">
                      <p className="text-center text-sm lg:text-base text-white font-semibold">
                        Off
                      </p>
                    </div>
                  ) : vehicle.detail.status === "miss" ? (
                    <div className="bg-gray-400 py-1.5 lg:p-1 rounded-xl mt-auto">
                      <p className="text-center text-sm lg:text-base text-white font-semibold">
                        Miss
                      </p>
                    </div>
                  ) : null}
                </div>

                <div className="col-span-2 flex flex-col justify-between bg-white h-full">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold">
                      {vehicle.no_kendaraan}
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <span className="material-icons text-gray-500">
                      Driver :
                    </span>
                    <span className="ml-1">{vehicle.driver}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-500 text-xs">
                    <span>{vehicle.last_update}</span>
                  </div>

                  <hr className="border-gray-300 my-2" />

                  <div className="flex justify-around space-x-2 mt-1">
                    <button className="h-8 flex-1 bg-white border shadow-md border-gray-500 rounded px-2 lg:px-4 cursor-pointer hover:shadow-md transition-shadow duration-200 flex justify-center items-center">
                      <img
                        src="/images/call_icon.svg"
                        alt="Call"
                        className="w-3.5 h-3.5 lg:w-4 lg:h-4"
                      />
                    </button>
                    <button className="h-8 flex-1 bg-white border shadow-md border-gray-500 rounded px-2 lg:px-4 cursor-pointer hover:shadow-md transition-shadow duration-200 flex justify-center items-center">
                      <img
                        src="/images/off_icon.svg"
                        alt="Off"
                        className="w-3.5 h-3.5 lg:w-4 lg:h-4"
                      />
                    </button>
                    <button className="h-8 flex-1 bg-white border shadow-md border-gray-500 rounded px-2 lg:px-4 cursor-pointer hover:shadow-md transition-shadow duration-200 flex justify-center items-center">
                      <img
                        src="/images/reload_icon.svg"
                        alt="Reload"
                        className="w-3.5 h-3.5 lg:w-4 lg:h-4"
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div
                className="mt-3 px-2 py-1 bg-green-300 rounded border border-gray-300 flex items-center justify-center cursor-pointer"
                onClick={() => toggleHistory(vehicle)}
              >
                <p className="text-xs text-green-600 font-semibold">
                  Show the Latest History
                </p>
                <img src="/images/eye.svg" alt="Eye" className="w-5 h-5 ml-2" />
              </div>
              {selectedVehicleHistory?.no_kendaraan ===
                vehicle.no_kendaraan && (
                <div className="mt-4 space-y-3">
                  {historyData.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border border-gray-300 rounded-lg p-4 bg-blue-50"
                    >
                      <div className="text-sm text-gray-700">
                        <p className="font-semibold">{item.date}</p>
                        <p>{item.address}</p>
                      </div>
                      <div className="text-sm text-blue-600 font-bold">
                        <p>{item.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <MapContainer
        center={[-5.5, 105.0]}
        zoom={10}
        className="h-full w-full z-0"
        attributionControl={false}
      >
        <TileLayer url={baseLayers[currentLayer]} />
        <ChangeView targetLocation={selectedVehicle} zoomLevel={zoomLevel} />
        {search(data).map((vehicle, index) => (
          <Marker
            key={index}
            position={[
              vehicle.detail.coordinate.latitude,
              vehicle.detail.coordinate.longitude,
            ]}
            icon={
              vehicle.kategori === "Mobil"
                ? Icons.mobil
                : vehicle.kategori === "Truk"
                ? Icons.truk
                : Icons.motor
            }
          >
            <Popup>
              <div className="w-48 font-sans">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-black">
                    {vehicle.no_kendaraan}
                  </h2>
                </div>
                <hr className="border-gray-300 my-2" />
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-red-600">
                      {vehicle.detail.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Engine:</span>
                    <span className="text-red-600">
                      {vehicle.detail.engineStatus}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Speed:</span>
                    <span className="text-green-600">
                      {vehicle.detail.speed} KM
                    </span>
                  </div>
                </div>
                <hr className="border-gray-300 my-2" />
                <div className="text-center mt-2">
                  <a href={`/kendaraan/${vehicle.id}`}>
                    <button className="text-blue-600 font-semibold cursor-pointer hover:underline">
                      See Details
                    </button>
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Layer Control Button */}
      <div className="absolute bottom-5 sm:bottom-5 lg:bottom-[230px] right-2 z-30 w-12 h-12 bg-white bg-opacity-90 shadow-md p-2 rounded-lg flex items-center justify-center">
        {/* Button to toggle the pop-up visibility */}
        <div
          className="absolute flex items-center justify-center cursor-pointer transition-all duration-300"
          onClick={togglePopupVisibility}
        >
          <img src="/images/layer.svg" alt="Layer Icon" className="w-10 h-10" />
        </div>
        {/* Pop-up with Layer Options */}
        {isPopupVisible && (
          <section className="absolute right-0 bottom-14 w-40 bg-white shadow-md rounded-lg px-2 py-1 transition-all duration-300">
            <div className="leaflet-control-layers-base ">
              {Object.keys(baseLayers).map((layerName) => (
                <label
                  key={layerName}
                  className="flex items-center justify-start cursor-pointer hover:bg-gray-100 p-2 my-1 rounded-md"
                >
                  <input
                    type="radio"
                    className="leaflet-control-layers-selector w-4 h-4"
                    name="leaflet-base-layers"
                    checked={currentLayer === layerName}
                    onChange={() => handleLayerChange(layerName)}
                  />
                  <span className="ml-3 text-xs font-medium">{layerName}</span>
                </label>
              ))}
            </div>
          </section>
        )}
      </div>
      <div className="absolute bottom-5 right-2 z-20 w-[370px] bg-white bg-opacity-80 shadow-md p-4 rounded-lg lg:block hidden">
        <div className="grid grid-cols-3 gap-1 text-sm font-semibold">
          {/* Row 1 */}
          <div className="flex items-center">
            <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-xs text-white">
              {statusCounts.move}
            </span>
            <div className="ml-3">MOVE</div>
          </div>
          <div className="text-xs col-span-2 flex items-center justify-start">
            Engine ON, Speed more than 0 km/hour
          </div>

          <hr className="col-span-3 border-gray-300 my-2" />

          {/* Row 2 */}
          <div className="flex items-center">
            <span className="w-6 h-6 rounded-full bg-yellow-300 flex items-center justify-center text-xs text-white">
              {statusCounts.park}
            </span>
            <div className="ml-3">PARK</div>
          </div>
          <div className="text-xs col-span-2 flex items-center justify-start">
            Engine ON, Speed 0 km/hour
          </div>

          <hr className="col-span-3 border-gray-300 my-2" />

          {/* Row 3 */}
          <div className="flex items-center">
            <span className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-xs text-white">
              {statusCounts.off}
            </span>
            <div className="ml-3">OFF</div>
          </div>
          <div className="text-xs col-span-2 flex items-center justify-start">
            Engine OFF
          </div>

          <hr className="col-span-3 border-gray-300 my-2" />

          {/* Row 4 */}
          <div className="flex items-center">
            <span className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-xs text-white">
              {statusCounts.miss}
            </span>
            <div className="ml-3">MISS</div>
          </div>
          <div className="text-xs col-span-2 flex items-center justify-start">
            Last update more than 12 hours
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMap;
