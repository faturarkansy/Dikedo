import React from 'react';

const Payment = ({ paymentStatus }) => {
    const isPaymentSuccess = paymentStatus === 'SUCCESS';
    const isPaymentExpaired = paymentStatus === 'EXPAIRED';

    const copyToClipboard = (text) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                alert('Nomor Invoice berhasil disalin!');
            }).catch(() => {
                alert('Gagal menyalin teks!');
            });
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.top = '-9999px';
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            try {
                document.execCommand('copy');
                alert('Nomor Invoice berhasil disalin!');
            } catch {
                alert('Gagal menyalin teks!');
            } finally {
                document.body.removeChild(textarea);
            }
        }
    };


    return (
        <div className="flex flex-col items-center mx-4 my-5">
            {/* Section 1: Status Pembayaran */}
            {isPaymentSuccess ? (
                // Tampilan Pesanan Selesai
                <div className="w-full bg-green-500 flex flex-col items-center py-12 px-6 rounded-t-lg border-green-600 border-t-2 border-b-4">
                    {/* Icon */}
                    <div className="relative flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center">
                            <span className="text-white text-4xl font-bold">✓</span>
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -top-4 -left-4 text-red-500">✱</div>
                        <div className="absolute -top-4 -right-4 text-gray-400">⬠</div>
                        <div className="absolute top-4 left-8 text-pink-500">★</div>
                    </div>

                    {/* Title */}
                    <h1 className="text-white font-bold text-2xl mt-4">Pesanan Selesai!</h1>
                    <p className="text-white flex items-center text-sm mt-2 text-center">Pesanan kamu sudah berhasil diproses!</p>
                </div>
            ) : isPaymentExpaired ? (
                // Tampilan Expaired
                <div className="w-full bg-red-500 flex flex-col items-center py-12 px-6 rounded-t-lg border-red-600 border-t-2 border-b-4">
                    {/* Icon */}
                    <div className="relative flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center">
                            <span className="text-white text-4xl font-bold">✗</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-white font-bold text-2xl mt-4">Pembayaran Kadaluarsa</h1>
                    <p className="text-white flex items-center text-sm mt-2 text-center">
                        Batas waktu pembayaran telah berakhir. Silahkan lakukan pembelian ulang.
                    </p>
                </div>
            ) : (
                // Tampilan Menunggu Pembayaran
                <div className="w-full bg-yellow-300 flex flex-col items-center py-12 px-6 rounded-t-lg border-yellow-400 border-t-2 border-b-4">
                    {/* Icon */}
                    <div className="relative flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center">
                            <span className="text-white text-4xl font-bold">💳</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-yellow-800 font-bold text-2xl mt-4">Menunggu Pembayaran</h1>
                    <p className="text-yellow-700 flex items-center text-sm mt-2 text-center">
                        Silahkan untuk melakukan pembayaran dengan metode yang telah dipilih.
                    </p>
                </div>
            )}

            {/* Section 2: Transaction Progress */}
            <div className="w-full bg-gray-200 py-8 px-8 rounded-b-lg shadow-md">
                {/* Judul di Sebelah Kiri */}
                <h2 className="text-black text-center text-lg font-bold mb-8">Progress Transaksi</h2>

                {/* Steps */}
                <div className="flex justify-center items-center gap-0 lg:gap-0 px-1 lg:px-4">
                    {/* Step 1 */}
                    <div className="flex items-center w-full">
                        <div className="w-5 h-5 lg:w-10 lg:h-10 rounded-full bg-green-500 flex items-center justify-center">
                            <span className="text-white text-xs lg:text-lg">✓</span>
                        </div>
                        <div className="flex-grow border-b-4 border-green-500"></div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-center w-full">
                        <div className="flex-grow border-b-4 border-gray-500"></div>
                        <div className="w-5 h-5 lg:w-10 lg:h-10 rounded-full bg-gray-500 flex items-center justify-center">
                            <span className="text-white text-xs lg:text-lg">✓</span>
                        </div>
                        <div className="flex-grow border-b-4 border-gray-500"></div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-center w-full">
                        <div className="flex-grow border-b-4 border-gray-500"></div>
                        <div className="w-5 h-5 lg:w-10 lg:h-10 rounded-full bg-gray-500 flex items-center justify-center">
                            <span className="text-white text-xs lg:text-lg">✓</span>
                        </div>
                        <div className="flex-grow border-b-4 border-gray-500"></div>
                    </div>

                    {/* Step 4 */}
                    <div className="flex items-center w-full">
                        <div className="flex-grow border-b-4 border-gray-500"></div>
                        <div className="w-5 h-5 lg:w-10 lg:h-10 rounded-full bg-gray-500 flex items-center justify-center">
                            <span className="text-white text-xs lg:text-lg">✓</span>
                        </div>

                    </div>
                </div>
                {/* Steps Row 2*/}
                <div className="flex justify-center items-center gap-0 lg:gap-32 px-1 lg:px-4">
                    {/* Step 1 */}
                    <div className="flex flex-col items-start">
                        <p className="text-green-500 font-bold text-center text-xs lg:text-base mt-2">Transaksi Dibuat</p>
                        <p className="text-black text-xs text-center hidden sm:block">
                            Transaksi telah berhasil dibuat.
                        </p>
                    </div>


                    {/* Step 2 */}
                    <div className="flex flex-col items-center">
                        <p className="text-gray-500 font-bold text-center text-xs lg:text-base mt-2">Pembayaran</p>
                        <p className="text-black text-xs text-center hidden sm:block">
                            Pembayaran telah kami terima.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center">
                        <p className="text-gray-500 font-bold text-center text-xs lg:text-base mt-2">Sedang Di Proses</p>
                        <p className="text-black text-xs text-center hidden sm:block">
                            Pembelian sedang dalam proses.
                        </p>
                    </div>

                    {/* Step 4 */}
                    <div className="flex flex-col items-end">
                        <p className="text-gray-500 font-bold text-center text-xs lg:text-base mt-2">Transaksi Selesai</p>
                        <p className="text-black text-xs text-center hidden sm:block">
                            Transaksi telah berhasil dilakukan.
                        </p>
                    </div>
                </div>
            </div>

            {/* Section 3: Payment Details */}
            <div className="w-full mt-4 flex flex-col md:flex-row gap-4">
                {/* Left Container: Payment Calculation */}
                <div className="flex-1 bg-cyan-600 p-4 px-8 rounded-md shadow-md">
                    <h3 className="text-white font-bold text-lg mb-4">Rincian Pembayaran</h3>
                    <div className="flex justify-between text-white text-sm mb-2">
                        <span>Harga</span>
                        <span>Rp 59.258</span>
                    </div>
                    <div className="flex justify-between text-white text-sm mb-2">
                        <span>Jumlah</span>
                        <span>1x</span>
                    </div>
                    <div className="flex justify-between text-white text-sm mb-2">
                        <span>Subtotal</span>
                        <span>Rp 59.258</span>
                    </div>
                    <div className="flex justify-between text-white text-sm mb-2">
                        <span>Biaya</span>
                        <span>Rp 889</span>
                    </div>
                    <div className="flex justify-between text-white font-bold text-lg mt-4">
                        <span>Total Pembayaran</span>
                        <span>Rp 60.147</span>
                    </div>
                </div>

                {/* Right Container: Transaction Details */}
                <div className="flex-1 bg-cyan-600 p-4 px-8 rounded-md flex flex-col justify-between shadow-md">
                    {/* Detail Transaksi */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Detail Transaksi</h3>
                        <div className="text-white text-sm mb-2">
                            <span className="font-bold">Metode Pembayaran:</span> Qris Barongsay
                        </div>
                        <div className="text-white text-sm mb-2 flex items-center">
                            <span className="font-bold">Nomor Invoice:</span>
                            <span className="ml-2">BS0167905B18BBB0154110284</span>
                            <button
                                className="ml-2 text-white hover:text-gray-300"
                                onClick={() => copyToClipboard('BS0167905B18BBB0154110284')}
                                title="Salin Nomor Invoice"
                                aria-label="Salin Nomor Invoice"
                            >
                                📋
                            </button>
                        </div>
                        <div className="text-white text-sm mb-2">
                            <span className="font-bold">Status Pembayaran:</span>{" "}
                            <span className="bg-red-500 text-white py-1 px-3 rounded-md text-xs">UNPAID</span>
                        </div>
                        <div className="text-white text-sm mb-2">
                            <span className="font-bold">Status Transaksi:</span>{" "}
                            <span className="bg-yellow-500 text-white py-1 px-3 rounded-md text-xs">PENDING</span>
                        </div>
                        <div className="text-white text-sm mt-4">
                            <span className="font-bold">Pesan:</span> Menunggu pembayaran
                        </div>
                    </div>

                    {/* QR Code Section */}
                    <div className="flex flex-col items-start mt-8">
                        <div className="w-40 h-40 bg-white flex items-center justify-center rounded-md shadow-md">
                            <img
                                src="/images/qrcode_example.png"
                                alt="QR Code"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <button
                            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-md text-sm font-medium"
                            onClick={() => console.log('Unduh QR Code')}
                        >
                            Unduh Kode QR
                        </button>
                        <p className="text-white text-xs mt-2">
                            Screenshot jika QR Code tidak bisa diunduh.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
