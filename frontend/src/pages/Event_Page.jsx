import { useState } from "react";
import Search from "../components/Search";

const Event = () => {
  const [isArrowActive, setIsArrowActive] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const [q, setQ] = useState("");
  const [searchParam] = useState(["berangkat", "sampai"]);

  // Dummy data
  const datas = [
    {
      berangkat: "14 Oct 2024 17:29",
      sampai: "15 Oct 2024 17:59",
      jarak: "0,06 km",
      kecepatan: "0,13 km/h",
      dari: "Lampung, ID",
      ke: "Lampung, ID",
      durasi: "13 MENIT",
      status: "Move",
    },
    {
      berangkat: "15 Oct 2024 17:29",
      sampai: "16 Oct 2024 17:59",
      jarak: "0,06 km",
      kecepatan: "0,13 km/h",
      dari: "Lampung, ID",
      ke: "Lampung, ID",
      durasi: "13 MENIT",
      status: "Miss",
    },
    {
      berangkat: "16 Oct 2024 17:29",
      sampai: "17 Oct 2024 17:59",
      jarak: "0,06 km",
      kecepatan: "0,13 km/h",
      dari: "Lampung, ID",
      ke: "Lampung, ID",
      durasi: "13 MENIT",
      status: "Off",
    },
    {
      berangkat: "17 Oct 2024 17:29",
      sampai: "18 Oct 2024 17:59",
      jarak: "0,06 km",
      kecepatan: "0,13 km/h",
      dari: "Lampung, ID",
      ke: "Lampung, ID",
      durasi: "13 MENIT",
      status: "Park",
    },
  ];

  function search() {
    return datas.filter((data) => {
      if (q === "") {
        return true;
      } else {
        return searchParam.some((newData) => {
          return (
            data[newData].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      }
    });
  }

  const filteredDatas = search();
  const totalRows = filteredDatas.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startRow = (currentPage - 1) * rowsPerPage;
  const endRow = startRow + rowsPerPage;
  const currentRows = filteredDatas.slice(startRow, endRow);

  // Fungsi navigasi pagination
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const getPaginationRange = () => {
    const range = [];
    const delta = 1;
    const left = Math.max(1, currentPage - delta);
    const right = Math.min(totalPages, currentPage + delta);

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (left > 2) {
      range.unshift("...");
    }
    if (right < totalPages - 1) {
      range.push("...");
    }

    if (!range.includes(1)) range.unshift(1);
    if (!range.includes(totalPages)) range.push(totalPages);

    return range;
  };

  const toggleArrow = () => {
    setIsArrowActive(!isArrowActive);
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <>
      <div
        className="py-5 px-4 w-auto bg-white flex items-center justify-between cursor-pointer mt-5 border-y-2 border-gray-200 relative"
        style={{
          backgroundImage: "url('images/ornament header.svg')",
          backgroundPosition: "right 5px",
          backgroundRepeat: "no-repeat",
          backgroundSize: "175px",
        }}
      >
        <div className="flex items-center gap-3">
          <img
            src="images/trip_active.svg"
            alt="Trip Icon"
            className="w-7 h-7 lg:w-10 lg:h-10"
          />
          <h5 className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-300 text-transparent bg-clip-text">
            Event
          </h5>
        </div>
        <div className="font-medium">
          <Search q={q} setQ={setQ} />
        </div>
      </div>
      {/* Kontainer Kendaraan */}
      <div className="flex items-center mt-4 px-4  relative">
        <div
          className="bg-cyan-600 text-white shadow-md rounded-lg py-2 px-4 md:px-6 flex items-center justify-center cursor-pointer hover:bg-cyan-100 hover:text-cyan-600"
          onClick={toggleArrow}
        >
          <h6 className="font-bold mr-2 text-xs md:text-sm">Kendaraan</h6>
          <img
            src="images/arrow.svg"
            alt="Arrow"
            className={`w-4 h-4 transition-transform duration-500 ${
              isArrowActive ? "rotate-90" : "rotate-[270deg]"
            }`}
          />
        </div>

        {/* Kontainer Dropdown */}
        {isDropdownVisible && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg border border-gray-200 rounded-lg z-10">
            <ul className="py-2">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Kendaraan 1
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Kendaraan 2
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Kendaraan 3
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="md:block my-4 mx-4 rounded-lg shadow-lg">
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full table-auto text-sm text-gray-700">
            <thead className="bg-white border-b-4 border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 font-medium">Start</th>
                <th className="text-left px-6 py-3 font-medium">Arrive</th>
                <th className="text-left px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 space-y-2">
              {currentRows.map((row, index) => (
                <tr key={index} className="bg-white hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-600">
                    {row.berangkat}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-600">
                    {row.sampai}
                  </td>
                  <td className={`px-6 py-4 rounded-lg text-center`}>
                    <div
                      className={`flex justify-center items-center px-2 py-1 lg:w-16 rounded-lg text-white
                                                ${
                                                  row.status === "Move"
                                                    ? "bg-green-400"
                                                    : row.status === "Off"
                                                    ? "bg-red-500"
                                                    : row.status === "Park"
                                                    ? "bg-yellow-300"
                                                    : row.status === "Miss"
                                                    ? "bg-gray-400"
                                                    : "bg-transparent text-gray-700 hover:text-blue-500"
                                                }`}
                    >
                      {row.status}
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center bg-white">
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`flex items-center px-4 py-2 rounded-lg ${
                        currentPage === 1
                          ? "cursor-not-allowed text-gray-500"
                          : "bg-transparent text-gray-700 hover:text-blue-500"
                      }`}
                    >
                      ← Previous
                    </button>
                    {getPaginationRange().map((page, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          typeof page === "number" && goToPage(page)
                        }
                        className={`px-3 py-1 rounded-lg ${
                          page === currentPage
                            ? "bg-blue-100 text-cyan-600 font-bold underline"
                            : "bg-transparent text-gray-700 hover:text-cyan-500"
                        }`}
                        disabled={page === "..."}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`flex items-center px-4 py-2 rounded-lg ${
                        currentPage === totalPages
                          ? "cursor-not-allowed text-gray-500"
                          : "bg-transparent text-gray-700 hover:text-cyan-500"
                      }`}
                    >
                      Next →
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Event;
