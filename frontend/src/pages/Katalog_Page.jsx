import { Card, Modal, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { CartContext } from "../features/ContextProvider";
import productsData from "../components/DataProducts";
import servicesData from "../components/DataServices";
import Search from '../components/Search_Katalog';

const ServiceCard = ({ name, price, features, service, dispatch }) => {
    const isBestPrice = name === "White";
    return (
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            {isBestPrice && (
                <img
                    src="/images/best-price.svg"
                    alt="Best Price"
                    className="absolute top-4 right-4 w-12 h-12 z-20"
                />
            )}
            <Card>
                <h5 className="mb-4 text-lg font-medium text-gray-500 dark:text-gray-400">{name}</h5>
                <div className="flex items-baseline text-gray-900 dark:text-white">
                    <span className="text-xl font-semibold">Rp</span>
                    <span className="text-3xl font-extrabold tracking-tight">{price}</span>
                    <span className="ml-1 text-sm font-normal text-gray-500 dark:text-gray-400">/month</span>
                </div>
                <ul className="my-7 space-y-5 text-sm">
                    {features.map((feature, index) => (
                        <FeatureItem key={index} feature={feature} />
                    ))}
                </ul>
                {/* <button
                    type="button"
                    onClick={() => dispatch({ type: "Add", product: service })}
                    className="inline-flex w-full justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900"
                >
                    Subscribe
                </button> */}
            </Card>
        </div>
    );
};


const FeatureItem = ({ feature }) => {
    const { text, isCrossedOut } = feature;
    return (
        <li className={`flex space-x-3 ${isCrossedOut ? 'line-through decoration-gray-500' : ''}`}>
            <svg
                className={`h-5 w-5 shrink-0 ${isCrossedOut ? 'text-gray-400 dark:text-gray-500' : 'text-cyan-600 dark:text-cyan-500'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                />
            </svg>
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">{text}</span>
        </li>
    );
};

const Services = () => {
    const [showRedeemPopUp, setShowRedeemPopUp] = useState(false);

    const { dispatch } = useContext(CartContext);
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();

    const [visibleContent, setVisibleContent] = useState(
        productsData.map(() => true)
    );
    const [activeTab, setActiveTab] = useState("Services");

    const toggleContent = (index) => {
        setVisibleContent((prevState) =>
            prevState.map((isVisible, i) => (i === index ? !isVisible : isVisible))
        );
    };

    const handleCartClick = () => {
        navigate("/Cart");
    };

    return (
        <div className="relative">
            {/* Cart Button */}
            {/* <div className="fixed bg-white top-[115px] md:top-[118px] right-3 md:right-4 z-50 rounded-full p-0.5">
                <div
                    className="bg-white dark:bg-gray-800 shadow-inner rounded-full p-2 flex items-center justify-center cursor-pointer border-4 border-cyan-600"
                    onClick={handleCartClick}
                >
                    <img src="/images/cart.svg" alt="Cart" className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="absolute right-[-5px] bottom-[32px] w-5 h-5 bg-orange-400 rounded-full flex items-center justify-center text-sm text-white">
                        {cart.length}
                    </span>
                </div>
            </div> */}


            <div className="fixed bottom-4 md:top-[114px] right-4 md:right-4 z-50 rounded-full p-0.5">
                <div
                    className="bg-white dark:bg-gray-800 shadow-inner rounded-full p-0.5 flex items-center justify-center cursor-pointer border-4 border-green-500"
                    onClick={handleCartClick}
                >
                    <img src="/images/whatsapp.svg" alt="Cart" className="w-10 h-10 " />
                    {/* <span className="absolute right-[-5px] bottom-[32px] w-5 h-5 bg-orange-400 rounded-full flex items-center justify-center text-sm text-white">
                        {cart.length}
                    </span> */}
                </div>
            </div>

            <div className="justify-center mb-8 text-xl text-black dark:text-gray-400">
                <div
                    className="py-5 px-4 w-auto bg-white flex items-center justify-between cursor-pointer mt-5 border-y-2 border-gray-200 relative"
                    style={{
                        backgroundImage: "url('images/ornament header.svg')",
                        backgroundPosition: "right 5px",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "175px",
                    }}
                >
                    <div className="flex items-center gap-2 md:gap-3">
                        <img
                            src="images/katalog_active.svg"
                            alt="Katalog Icon"
                            className="w-7 h-7 md:w-10 md:h-10"
                        />
                        <h5 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-300 text-transparent bg-clip-text">
                            Katalog
                        </h5>
                    </div>
                    <div className="z-10 font-medium">
                        <Search />
                    </div>
                </div>


                <div className="flex flex-col md:flex-row sm:space-x-4 mt-4 px-4">
                    <div className="relative flex space-x-4 lg:mb-0">
                        {/* Services Tab */}
                        <div
                            className={`${activeTab === "Services"
                                ? "bg-cyan-600 text-white"
                                : "bg-white text-cyan-600"
                                } shadow-md rounded-lg py-2 px-4 md:px-6 flex items-center justify-center cursor-pointer hover:bg-cyan-100 hover:text-cyan-600`}
                            onClick={() => setActiveTab("Services")}
                        >
                            <div className="font-bold text-xs md:text-sm">Services</div>
                        </div>

                        {/* Products Tab */}
                        <div
                            className={`${activeTab === "Products"
                                ? "bg-cyan-600 text-white"
                                : "bg-white text-cyan-600"
                                } shadow-md rounded-lg py-2 px-4 md:px-6 flex items-center justify-center cursor-pointer hover:bg-cyan-100 hover:text-cyan-600`}
                            onClick={() => setActiveTab("Products")}
                        >
                            <div className="font-bold text-xs md:text-sm">Products</div>
                        </div>

                        {/* Redeem Code Tab */}
                        <div
                            className="bg-white text-cyan-600 shadow-md rounded-lg py-2 px-4 md:px-6 flex items-center justify-center cursor-pointer hover:bg-cyan-100 hover:text-cyan-600"
                            onClick={() => setShowRedeemPopUp(true)}
                        >
                            <div className="font-bold text-xs md:text-sm">Redeem Code</div>
                        </div>
                    </div>

                    {/* Redeem Code Pop-Up */}
                    <Modal
                        show={showRedeemPopUp}
                        onClose={() => setShowRedeemPopUp(false)}
                        size="md"
                        popup
                    >
                        <Modal.Header><div className="px-4 py-2">Redeem Code</div></Modal.Header>
                        <Modal.Body>


                            {/* Input Section */}
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter the code to Redeem"
                                    className="w-full px-4 py-2 text-sm text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end mt-4">
                                <Button onClick={() => setShowRedeemPopUp(false)}>Submit</Button>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
                {/* Conditional Rendering for Services and Products */}
                {activeTab === "Services" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center mt-4 m-4">
                        {servicesData.map((service, index) => (
                            <ServiceCard
                                key={index}
                                name={service.name}
                                price={service.price}
                                features={service.features}
                                service={service}
                                dispatch={dispatch}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="justify-center mb-8 text-xl font-medium text-black dark:text-gray-400">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-center mt-4 m-4">
                            {productsData.map((product, index) => (
                                <div
                                    key={index}
                                    className="bg-white dark:bg-gray-700 rounded-lg shadow-lg flex flex-col h-[320px] w-full relative"
                                >
                                    <div className="p-4 space-y-2 flex flex-col">
                                        <div className="rounded-lg relative">
                                            {/* Tampilkan gambar jika visibleContent[index] false, dan deskripsi jika true */}
                                            {visibleContent[index] ? (
                                                <>
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-auto max-h-48 object-cover"
                                                    />
                                                    <div className="pl-1 pb-2 font-bold text-black text-xl">
                                                        {product.name} <br />
                                                        <span className="font-bold text-gray-600 text-base">
                                                            Rp. {product.price}
                                                        </span>
                                                    </div>
                                                    {/* <button
                                                        className="inline-flex w-full justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900"
                                                        onClick={() => dispatch({ type: "Add", product: product })}
                                                    >
                                                        Add to Cart +
                                                    </button> */}
                                                </>
                                            ) : (
                                                <div className="text-gray-500 text-sm dark:text-gray-400">
                                                    <div className="font-bold text-lg mb-2">Description</div>
                                                    {product.description}
                                                </div>
                                            )}
                                            <img
                                                src="/images/info.svg"
                                                alt="Info"
                                                className="w-4 h-4 absolute top-[-2px] right-[-2px] cursor-pointer"
                                                onClick={() => toggleContent(index)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Services;
