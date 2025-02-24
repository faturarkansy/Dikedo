import React, { useState, useEffect } from "react";

const Notifikasi = ({ message, type, onClose }) => {
    if (!message) return null;

    const bgColors = {
        success: "bg-green-200 border border-2 border-green-400",
        error: "bg-red-200 border border-2 border-red-400",
        info: "bg-cyan-200 border border-2 border-cyan-600",
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 1500); // Notifikasi hilang setelah 3 detik

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={`fixed top-8 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg text-black font-semibold z-50 ${bgColors[type]}`}
        >
            {message}
        </div>
    );
};

export default Notifikasi;
