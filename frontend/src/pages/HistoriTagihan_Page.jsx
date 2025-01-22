import React, { useState } from "react";
import Search from '../components/Search';

const HistoriTagihan = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    // Dummy data
    const data = Array.from({ length: 100 }, (_, index) => ({
        tagihan: `172746462${index + 1}`,
        layanan: `Bronze`,
        price: `16.500`,
        status: "PENDING",
        pembayaran: "Transfer-BNI",
        tanggalTagihan: "28 Sep 2024",
        tanggalLayanan: "29 Dec 2024",
    }));

    const totalRows = data.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const startRow = (currentPage - 1) * rowsPerPage;
    const endRow = startRow + rowsPerPage;
    const currentRows = data.slice(startRow, endRow);

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
                        src="images/tagihan_active.svg"
                        alt="Tagihan Icon"
                        className="w-7 h-7 lg:w-10 lg:h-10"
                    />
                    <h5 className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-300 text-transparent bg-clip-text">
                        Bill History
                    </h5>
                </div>
                <div className="font-medium">
                    <Search />
                </div>
            </div>
            <div className="hidden md:block overflow-x-auto m-4 rounded-lg shadow-lg ">
                <table className="min-w-full table-auto text-sm text-gray-700">
                    <thead className="bg-white border-b-4 border-gray-200">
                        <tr>
                            <th className="text-left px-6 py-3 font-medium">Bill</th>
                            <th className="text-left px-6 py-3 font-medium">Service</th>
                            <th className="text-left px-6 py-3 font-medium">Price</th>
                            <th className="text-left px-6 py-3 font-medium">Status</th>
                            <th className="text-left px-6 py-3 font-medium">Payment</th>
                            <th className="text-center px-6 py-3 font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 space-y-2">
                        {currentRows.map((row, index) => (
                            <tr key={index} className="bg-white hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-cyan-600">
                                    {row.tagihan} <br />
                                    <span className="text-orange-400">
                                        {row.tanggalTagihan}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {row.layanan} <br />
                                    <span className="text-orange-400">
                                        {row.tanggalLayanan}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{row.price}</td>
                                <td className="px-6 py-4">
                                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
                                        {row.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{row.pembayaran}</td>
                                <td className="px-6 py-4 text-center">
                                    <button className="bg-cyan-600 text-white font-medium px-3 py-1 shadow-md border border-gray-500 rounded">
                                        Pay Now
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="6" className="px-6 py-4 text-center bg-white">
                                <div className="flex justify-center items-center space-x-2">
                                    <button
                                        onClick={() => goToPage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`flex items-center px-4 py-2 rounded-lg ${currentPage === 1
                                            ? "cursor-not-allowed text-gray-500"
                                            : "bg-transparent text-gray-700 hover:text-blue-500"
                                            }`}
                                    >
                                        ← Previous
                                    </button>
                                    {getPaginationRange().map((page, index) => (
                                        <button
                                            key={index}
                                            onClick={() => typeof page === "number" && goToPage(page)}
                                            className={`px-3 py-1 rounded-lg ${page === currentPage
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
                                        className={`flex items-center px-4 py-2 rounded-lg ${currentPage === totalPages
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
            {/* Kartu untuk layar kecil */}
            <div className="block md:hidden space-y-4 m-4">
                {currentRows.map((row, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
                    >
                        <div className="flex justify-between">
                            <div>
                                <p className="font-bold text-cyan-600">
                                    {row.tagihan}
                                </p>
                                <p className="text-sm text-orange-400">
                                    {row.tanggalTagihan}
                                </p>
                            </div>
                            <p className="font-medium">{row.price}</p>
                        </div>
                        <div className="mt-2">
                            <p className="text-sm">
                                <span className="font-medium">STATUS:</span>{" "}
                                <span
                                    className={`px-2 py-1 rounded-full text-xs ${row.status === "KONFIRMASI"
                                        ? "bg-blue-100 text-cyan-600"
                                        : "bg-red-100 text-red-600"
                                        }`}
                                >
                                    {row.status}
                                </span>
                            </p>
                            <p className="text-sm mt-1">
                                <span className="font-medium">PAYMENT:</span>{" "}
                                {row.pembayaran}
                            </p>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button className="bg-cyan-600 text-white font-medium px-3 py-1 shadow-md border border-gray-500 rounded">
                                Pay Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default HistoriTagihan;
