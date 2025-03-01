import L from "leaflet";
import trukImage from "/images/truk.svg";
import mobilImage from "/images/mobil.svg";
import motorImage from "/images/motor.svg";

const createIcon = (iconUrl) => {
  return new L.Icon({
    iconUrl,
    iconSize: [80, 80],
    iconAnchor: [30, 60],
    popupAnchor: [0, -60],
  });
};

export const Icons = {
  truk: createIcon(trukImage),
  mobil: createIcon(mobilImage),
  motor: createIcon(motorImage),
};
