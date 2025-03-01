import { Link } from "react-router-dom";
import React, { useState } from "react";

const SideBar = () => {
  const [hoveredItem, setHoveredItem] = useState("");
  const [isUserHovered, setIsUserHovered] = useState(false);

  const menuItems = [
    {
      name: "Live Map",
      route: "/live-map",
      icon: "/images/livemap_active.svg",
      inactiveIcon: "/images/livemap_unactive.svg",
    },
    {
      name: "Vehicles",
      route: "/kendaraan",
      icon: "/images/kendaraan_active.svg",
      inactiveIcon: "/images/kendaraan_unactive.svg",
    },
    {
      name: "Bill History",
      route: "/histori-tagihan",
      icon: "/images/tagihan_active.svg",
      inactiveIcon: "/images/tagihan_unactive.svg",
    },
    {
      name: "Katalog",
      route: "/katalog",
      icon: "/images/katalog_active.svg",
      inactiveIcon: "/images/katalog_unactive.svg",
    },
    {
      name: "Event",
      route: "/event",
      icon: "/images/event_active.svg",
      inactiveIcon: "/images/event_unactive.svg",
    },
    {
      name: "Trip",
      route: "/trip",
      icon: "/images/trip_active.svg",
      inactiveIcon: "/images/trip_unactive.svg",
    },
    // { name: 'Settings', route: '/Settings', icon: '/images/settings_active.svg', inactiveIcon: '/images/settings_unactive.svg' }
  ];

  const handleHover = (itemName) => setHoveredItem(itemName);
  const handleMouseLeave = () => setHoveredItem("");

  return (
    <div className="relative z-20">
      <div className="fixed top-0 left-0 w-16 h-screen flex flex-col items-center bg-gradient-to-t from-cyan-200 to-white py-5 shadow-md">
        <Link
          to="/live-map"
          className="sidebar head flex flex-col items-center justify-center pt-4 pb-5 mx-3 relative border-t-2 border-orange-400 mb-1"
        >
          <img src="/images/logo.svg" alt="Logo" className="w-10 h-12" />
        </Link>
        <div className="flex-1">
          <div className="menu">
            <ul className="">
              {menuItems.map((item) => (
                <li
                  key={item.name}
                  className="relative list-none"
                  onMouseEnter={() => handleHover(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={item.route}
                    className="flex items-center justify-center text-black text-sm font-medium rounded-lg mb-4"
                  >
                    <img
                      src={
                        hoveredItem === item.name
                          ? item.icon
                          : item.inactiveIcon
                      }
                      alt={`${item.name} Icon`}
                      className="w-10 h-10"
                    />
                    {hoveredItem === item.name && (
                      <span className="absolute left-[70px] top-1/2 transform -translate-y-1/2 px-3 py-1 rounded-lg text-white bg-black text-sm whitespace-nowrap shadow-md pb-1.5">
                        {item.name}
                        <span className="absolute left-[-5px] top-[9px] w-3 h-3 bg-black transform rotate-45"></span>
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className="sidebar head flex items-center pt-5 pb-5 mx-3  relative border-b-2 border-orange-400"
          onMouseEnter={() => setIsUserHovered(true)}
          onMouseLeave={() => setIsUserHovered(false)}
        >
          <Link to="/Settings">
            <div className="user-img w-full h-full rounded-full overflow-hidden cursor-pointer ">
              <img
                src="/images/user.png"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
          {isUserHovered && (
            <div className="absolute left-20 top-1/2 transform -translate-y-1/2 px-3 py-2 pb-3 rounded-lg bg-black text-white text-sm shadow-md">
              <span className="font-bold">Fatur Arkan Syawalva</span>
              <br />
              <span className="font-medium">fatur@gmail.com</span>
              <span className="absolute left-[-5px] top-[35px] w-3 h-3 bg-black transform rotate-45"></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
