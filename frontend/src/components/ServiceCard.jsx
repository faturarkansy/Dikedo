import { Card } from "flowbite-react";

const ServiceCard = ({ name, price, features }) => {
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
        <h5 className="mb-4 text-lg font-medium text-gray-500 dark:text-gray-400">
          {name}
        </h5>
        <div className="flex items-baseline text-gray-900 dark:text-white">
          <span className="text-xl font-semibold">Rp</span>
          <span className="text-3xl font-extrabold tracking-tight">
            {price}
          </span>
          <span className="ml-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            /month
          </span>
        </div>
        <ul className="my-7 space-y-5 text-sm">
          {features.map((feature, index) => (
            // <FeatureItem key={index} feature={feature} />
            <li
              key={index}
              className={`flex space-x-3 ${
                feature.isCrossedOut ? "line-through decoration-gray-500" : ""
              }`}
            >
              <svg
                className={`h-5 w-5 shrink-0 ${
                  feature.isCrossedOut
                    ? "text-gray-400 dark:text-gray-500"
                    : "text-cyan-600 dark:text-cyan-500"
                }`}
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
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default ServiceCard;
