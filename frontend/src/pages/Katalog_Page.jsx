import { useEffect, useState } from "react";
import { Modal, Button } from "flowbite-react";
import axios from "axios";
import Search from "../components/Search";
import ServiceCard from "../components/ServiceCard";
import ProductCard from "../components/ProductCard";
import { API_URL } from "../utils/constants";

const Katalog = () => {
  const [showRedeemPopUp, setShowRedeemPopUp] = useState(false);
  const [activeTab, setActiveTab] = useState("Services");
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [visibleContent, setVisibleContent] = useState();

  const [q, setQ] = useState("");

  useEffect(() => {
    axios
      .get(API_URL + "products")
      .then((res) => {
        // console.log("Products Data:", res.data); // Debugging
        setProducts(res.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(API_URL + "services")
      .then((res) => {
        // console.log("Services Data:", res.data); // Debugging
        setServices(res.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);

  useEffect(() => {
    setVisibleContent(new Array(products.length).fill(false));
  }, [products]);

  const toggleContent = (index) => {
    setVisibleContent((prevState) =>
      prevState.map((isVisible, i) => (i === index ? !isVisible : isVisible))
    );
  };

  function search(items) {
    console.log(items);
    return items.filter((data) => {
      if (q === "") {
        // console.log("tidak ada yang difilter!");
        return true;
      } else if (data.name) {
        // console.log("filter dijalankan!");
        return data.name.toString().toLowerCase().indexOf(q.toLowerCase()) > -1;
      }
      return false;
    });
  }

  return (
    <div className="relative">
      <div className="fixed bottom-4 md:top-[114px] right-4 md:right-4 z-50 rounded-full p-0.5">
        <a href="https://wa.me/6289632002447" target="_blank">
          <img src="/images/whatsapp.svg" alt="Cart" className="w-10 h-10 " />
        </a>
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
            <Search q={q} setQ={setQ} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row sm:space-x-4 mt-4 px-4">
          <div className="relative flex space-x-4 lg:mb-0">
            {/* Services Tab */}
            <div
              className={`${
                activeTab === "Services"
                  ? "bg-cyan-600 text-white"
                  : "bg-white text-cyan-600"
              } shadow-md rounded-lg py-2 px-4 md:px-6 flex items-center justify-center cursor-pointer hover:bg-cyan-100 hover:text-cyan-600`}
              onClick={() => setActiveTab("Services")}
            >
              <div className="font-bold text-xs md:text-sm">Services</div>
            </div>
            {/* Products Tab */}
            <div
              className={`${
                activeTab === "Products"
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
            <Modal.Header>
              <div className="px-4 py-2">Redeem Code</div>
            </Modal.Header>
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
                <Button onClick={() => setShowRedeemPopUp(false)}>
                  Submit
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
        {/* Conditional Rendering for Services Card and Products Card */}
        {activeTab === "Services" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center mt-4 m-4">
            {search(services).map((service, index) => (
              <ServiceCard
                key={index}
                name={service.name}
                price={service.price}
                features={service.features}
              />
            ))}
          </div>
        ) : (
          <div className="justify-center mb-8 text-xl font-medium text-black dark:text-gray-400">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-center mt-4 m-4">
              {search(products).map((product, index) => (
                <ProductCard
                  key={index}
                  indexCard={index}
                  product={product}
                  visibleContent={visibleContent}
                  toggleContent={toggleContent}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Katalog;
