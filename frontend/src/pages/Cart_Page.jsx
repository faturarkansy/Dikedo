import React, { useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../features/ContextProvider";
import CartItem from "../components/CartItem";

const Cart = () => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/Payment');
    };
    const handleBack = () => {
        navigate('/Katalog');
    };

    const { cart } = useContext(CartContext);
    const [showQRISDropdown, setShowQRISDropdown] = useState(false);
    const [showEWalletDropdown, setShowEWalletDropdown] = useState(false);
    const [showVADropdown, setShowVADropdown] = useState(false);

    const subTotal = useMemo(() => {
        return cart.reduce((total, product) => total + Number(product.price), 0);
    }, [cart]);

    const ppn = useMemo(() => {
        return (subTotal * 12) / 100;
    }, [subTotal]);

    const total = useMemo(() => {
        const deliveryFee = 500;
        return subTotal + ppn + deliveryFee;
    }, [subTotal, ppn]);

    return (
        <div className="p-4 flex flex-col gap-4 mt-1">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Left: Cart Section */}
                <div className="flex-1 bg-white rounded-lg shadow-lg p-4">
                    <h2 className="text-lg font-bold mb-4 flex items-center">
                        <img src="images/back.svg" alt="Back"
                            className="mr-4 cursor-pointer"
                            onClick={handleBack}
                        />
                        My Cart
                    </h2>

                    {/* Kondisi Jika Cart Kosong */}
                    {cart.length === 0 ? (
                        <div className="w-full h-96 p-6 border-4 border-dashed border-gray-300 flex items-center justify-center rounded-lg">
                            <p className="text-gray-500 text-lg font-semibold">Keranjang Anda Kosong</p>
                        </div>
                    ) : (
                        /* Mapping Cart Items */
                        cart.map((product, index) => (
                            <CartItem key={index} product={product} />
                        ))
                    )}
                </div>

                {/* Right: Payment Summary */}
                <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-lg p-4">
                    <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                    <div className="flex justify-between mb-2">
                        <p>Sub Total</p>
                        <p>Rp{subTotal}</p>
                    </div>
                    <div className="flex justify-between mb-2">
                        <p>PPN (12%)</p>
                        <p>+Rp{ppn}</p>
                    </div>
                    <div className="flex justify-between mb-2">
                        <p>Delivery Fee</p>
                        <p>Rp5000</p>
                    </div>
                    <div className="flex justify-between font-bold text-lg mb-4">
                        <p>Total</p>
                        <p>Rp{total}</p>
                    </div>

                    {/* Payment Options */}
                    <h3 className="text-md font-semibold mb-2">Pilih Metode Pembayaran</h3>
                    <div className="space-y-2 mb-4">
                        {/* QRIS Container */}
                        <div
                            className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
                            onClick={() => setShowQRISDropdown(!showQRISDropdown)}
                        >
                            <label htmlFor="qris" className="cursor-pointer font-semibold">
                                QRIS
                            </label>
                            <span className="text-gray-500">{showQRISDropdown ? "▲" : "▼"}</span>
                        </div>

                        {/* Dropdown Options (Container Terpisah) */}
                        {showQRISDropdown && (
                            <div className="flex flex-col space-y-2 pl-4">
                                <div className="p-2 bg-white rounded-lg border cursor-pointer hover:bg-gray-200">
                                    <img
                                        src="/images/dana.png"
                                        alt="Dana"
                                        className="h-6"
                                    />
                                </div>
                                <div className="p-2 bg-white rounded-lg border cursor-pointer hover:bg-gray-200">
                                    <img
                                        src="/images/shopeepay.png"
                                        alt="ShopeePay"
                                        className="h-6"
                                    />
                                </div>
                                <div className="p-2 bg-white rounded-lg border cursor-pointer hover:bg-gray-200">
                                    <img
                                        src="/images/linkaja.png"
                                        alt="LinkAja"
                                        className="h-6"
                                    />
                                </div>
                            </div>
                        )}

                        {/* E-Wallet */}
                        <div
                            className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
                            onClick={() => setShowEWalletDropdown(!showEWalletDropdown)}
                        >
                            <label htmlFor="ewallet" className="cursor-pointer font-semibold">
                                E-Wallet
                            </label>
                            <span className="text-gray-500">{showEWalletDropdown ? "▲" : "▼"}</span>
                        </div>
                        {showEWalletDropdown && (
                            <div className="flex flex-col space-y-2 pl-4">
                                <div className="p-2 bg-white rounded-lg border cursor-pointer hover:bg-gray-200">
                                    <img
                                        src="/images/dana.png"
                                        alt="Dana"
                                        className="h-6"
                                    />
                                </div>
                                <div className="p-2 bg-white rounded-lg border cursor-pointer hover:bg-gray-200">
                                    <img
                                        src="/images/shopeepay.png"
                                        alt="ShopeePay"
                                        className="h-6"
                                    />
                                </div>
                                <div className="p-2 bg-white rounded-lg border cursor-pointer hover:bg-gray-200">
                                    <img
                                        src="/images/linkaja.png"
                                        alt="LinkAja"
                                        className="h-6"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Transfer Bank */}
                        <div
                            className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
                            onClick={() => setShowVADropdown(!showVADropdown)}
                        >
                            <label htmlFor="ewallet" className="cursor-pointer font-semibold">
                                Virtual Akun
                            </label>
                            <span className="text-gray-500">{showVADropdown ? "▲" : "▼"}</span>
                        </div>
                        {showVADropdown && (
                            <div className="flex flex-col space-y-2 pl-4">
                                <div className="p-2 bg-white rounded-lg border cursor-pointer hover:bg-gray-200">
                                    <img
                                        src="/images/dana.png"
                                        alt="Dana"
                                        className="h-6"
                                    />
                                </div>
                                <div className="p-2 bg-white rounded-lg border cursor-pointer hover:bg-gray-200">
                                    <img
                                        src="/images/shopeepay.png"
                                        alt="ShopeePay"
                                        className="h-6"
                                    />
                                </div>
                                <div className="p-2 bg-white rounded-lg border cursor-pointer hover:bg-gray-200">
                                    <img
                                        src="/images/linkaja.png"
                                        alt="LinkAja"
                                        className="h-6"
                                    />
                                </div>
                            </div>
                        )}

                    </div>
                    <button
                        className="w-full bg-orange-400 text-white py-2 rounded-lg"
                        onClick={handleNavigate}
                    >
                        Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
